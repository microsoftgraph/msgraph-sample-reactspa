// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <CalendarDayRowSnippet>
import React from 'react';
import moment, { Moment } from 'moment';
import { Event } from 'microsoft-graph';

interface CalendarDayRowProps {
  date: Moment | undefined;
  timeFormat: string;
  events: Event[];
}

interface FormatMap {
  [key: string] : string;
}

// moment.js format strings are slightly
// different than the ones returned by Graph
const formatMap: FormatMap = {
  "h:mm tt": "h:mm A",
  "hh:mm tt": "hh:mm A"
};

// Helper function to format Graph date/time in the user's
// preferred format
function formatDateTime(dateTime: string | undefined, format: string) {
  if (dateTime !== undefined) {
    return moment(dateTime).format(formatMap[format] || format);
  }
}

export default class CalendarDayRow extends React.Component<CalendarDayRowProps> {
  render() {
    var today = moment();
    var rowClass = today.day() === this.props.date?.day() ? 'table-warning' : '';
    var timeFormat = this.props.timeFormat;

    var dateCell = (
      <td className='calendar-view-date-cell' rowSpan={this.props.events.length <= 0 ? 1 : this.props.events.length}>
        <div className='calendar-view-date float-left text-right'>{this.props.date?.format('DD')}</div>
        <div className='calendar-view-day'>{this.props.date?.format('dddd')}</div>
        <div className='calendar-view-month text-muted'>{this.props.date?.format('MMMM, YYYY')}</div>
      </td>
    );

    if (this.props.events.length <= 0)
    {
      // Render an empty row for the day
      return (
        <tr className={rowClass}>
          {dateCell}
          <td></td>
          <td></td>
        </tr>
      );
    }

    return (
      <React.Fragment>
        {this.props.events.map(
          function(event: Event, index: Number) {
            return (
              <tr className={rowClass} key={event.id}>
                { index === 0 && dateCell }
                <td className="calendar-view-timespan">
                  <div>{formatDateTime(event.start?.dateTime, timeFormat)} - {formatDateTime(event.end?.dateTime, timeFormat)}</div>
                </td>
                <td>
                  <div className="calendar-view-subject">{event.subject}</div>
                  <div className="calendar-view-organizer">{event.organizer?.emailAddress?.name}</div>
                </td>
              </tr>
            )
          }
        )}
      </React.Fragment>
    )
  }
}
// </CalendarDayRowSnippet>
