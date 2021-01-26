// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Table } from 'reactstrap';
import moment, { Moment } from 'moment-timezone';
import { findOneIana } from "windows-iana";
import { Event } from 'microsoft-graph';
import { config } from './Config';
import { getUserWeekCalendar } from './GraphService';
import withAuthProvider, { AuthComponentProps } from './AuthProvider';
import CalendarDayRow from './CalendarDayRow';
import './Calendar.css';

interface CalendarState {
  eventsLoaded: boolean;
  events: Event[];
  startOfWeek: Moment | undefined;
}

class Calendar extends React.Component<AuthComponentProps, CalendarState> {
  constructor(props: any) {
    super(props);

    this.state = {
      eventsLoaded: false,
      events: [],
      startOfWeek: undefined
    };
  }

  async componentDidUpdate() {
    if (this.props.user && !this.state.eventsLoaded)
    {
      try {
        // Get the user's access token
        var accessToken = await this.props.getAccessToken(config.scopes);

        // Convert user's Windows time zone ("Pacific Standard Time")
        // to IANA format ("America/Los_Angeles")
        // Moment needs IANA format
        var ianaTimeZone = findOneIana(this.props.user.timeZone);

        // Get midnight on the start of the current week in the user's timezone,
        // but in UTC. For example, for Pacific Standard Time, the time value would be
        // 07:00:00Z
        var startOfWeek = moment.tz(ianaTimeZone!.valueOf()).startOf('week').utc();

        // Get the user's events
        var events = await getUserWeekCalendar(accessToken, this.props.user.timeZone, startOfWeek);

        // Update the array of events in state
        this.setState({
          eventsLoaded: true,
          events: events,
          startOfWeek: startOfWeek
        });
      }
      catch (err) {
        this.props.setError('ERROR', JSON.stringify(err));
      }
    }
  }

  // <renderSnippet>
  render() {
    var sunday = moment(this.state.startOfWeek);
    var monday = moment(sunday).add(1, 'day');
    var tuesday = moment(monday).add(1, 'day');
    var wednesday = moment(tuesday).add(1, 'day');
    var thursday = moment(wednesday).add(1, 'day');
    var friday = moment(thursday).add(1, 'day');
    var saturday = moment(friday).add(1, 'day');

    return (
      <div>
        <div className="mb-3">
          <h1 className="mb-3">{sunday.format('MMMM D, YYYY')} - {saturday.format('MMMM D, YYYY')}</h1>
          <RouterNavLink to="/newevent" className="btn btn-light btn-sm" exact>New event</RouterNavLink>
        </div>
        <div className="calendar-week">
          <div className="table-responsive">
            <Table size="sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Event</th>
                </tr>
              </thead>
              <tbody>
                <CalendarDayRow
                  date={sunday}
                  timeFormat={this.props.user.timeFormat}
                  events={this.state.events.filter(event => moment(event.start?.dateTime).day() === sunday.day()) } />
                <CalendarDayRow
                  date={monday}
                  timeFormat={this.props.user.timeFormat}
                  events={this.state.events.filter(event => moment(event.start?.dateTime).day() === monday.day()) } />
                <CalendarDayRow
                  date={tuesday}
                  timeFormat={this.props.user.timeFormat}
                  events={this.state.events.filter(event => moment(event.start?.dateTime).day() === tuesday.day()) } />
                <CalendarDayRow
                  date={wednesday}
                  timeFormat={this.props.user.timeFormat}
                  events={this.state.events.filter(event => moment(event.start?.dateTime).day() === wednesday.day()) } />
                <CalendarDayRow
                  date={thursday}
                  timeFormat={this.props.user.timeFormat}
                  events={this.state.events.filter(event => moment(event.start?.dateTime).day() === thursday.day()) } />
                <CalendarDayRow
                  date={friday}
                  timeFormat={this.props.user.timeFormat}
                  events={this.state.events.filter(event => moment(event.start?.dateTime).day() === friday.day()) } />
                <CalendarDayRow
                  date={saturday}
                  timeFormat={this.props.user.timeFormat}
                  events={this.state.events.filter(event => moment(event.start?.dateTime).day() === saturday.day()) } />
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
  // </renderSnippet>
}

export default withAuthProvider(Calendar);
