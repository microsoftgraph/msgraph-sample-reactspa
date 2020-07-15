// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { Table } from 'reactstrap';
import moment from 'moment-timezone';
import { findOneIana } from "windows-iana";
import { Event } from 'microsoft-graph';
import { config } from './Config';
import { getUserWeekCalendar } from './GraphService';
import withAuthProvider, { AuthComponentProps } from './AuthProvider';

interface CalendarState {
  eventsLoaded: boolean;
  events: Event[];
}

export interface CalendarProps extends AuthComponentProps {
  timeZone: any;
  timeFormat: any;
}

// Helper function to format Graph date/time
function formatDateTime(dateTime: string | undefined) {
  if (dateTime !== undefined) {
    return moment(dateTime).format('M/D/YY h:mm A');
  }
}

class Calendar extends React.Component<AuthComponentProps, CalendarState> {
  constructor(props: any) {
    super(props);
    console.log('Constructor: ' + JSON.stringify(props.user));
    this.state = {
      eventsLoaded: false,
      events: []
    };
  }

  async componentDidUpdate()
  {
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
        console.log(`Start of week: ${startOfWeek}`);
        // Get the user's events
        var events = await getUserWeekCalendar(accessToken, this.props.user.timeZone, startOfWeek);
        // Update the array of events in state
        this.setState({ eventsLoaded: true, events: events.value });
      }
      catch (err) {
        this.props.setError('ERROR', JSON.stringify(err));
      }
    }
  }

  // <renderSnippet>
  render() {
    return (
      <div>
        <h1>Calendar</h1>
        <Table>
          <thead>
            <tr>
              <th scope="col">Organizer</th>
              <th scope="col">Subject</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
            </tr>
          </thead>
          <tbody>
            {this.state.events.map(
              function(event: Event){
                return(
                  <tr key={event.id}>
                    <td>{event.organizer?.emailAddress?.name}</td>
                    <td>{event.subject}</td>
                    <td>{formatDateTime(event.start?.dateTime)}</td>
                    <td>{formatDateTime(event.end?.dateTime)}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  }
  // </renderSnippet>
}

export default withAuthProvider(Calendar);
