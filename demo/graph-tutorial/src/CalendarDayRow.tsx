// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <CalendarDayRowSnippet>
import React from 'react';
import { Event } from 'microsoft-graph';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

type CalendarDayRowProps = {
  date: Date,
  timeFormat: string,
  events: Event[]
};

interface FormatMap {
  [key: string] : string;
}

// date-fns format strings are slightly
// different than the ones returned by Graph
const formatMap: FormatMap = {
  "h:mm tt": "h:mm a",
  "hh:mm tt": "hh:mm a"
};

// Helper function to format Graph date/time in the user's
// preferred format
function formatDateTime(dateTime: string | undefined, timeFormat: string) {
  if (dateTime !== undefined) {
    const parsedDate = parseISO(dateTime);
    return format(parsedDate, formatMap[timeFormat] || timeFormat);
  }
}

function DateCell(props: CalendarDayRowProps) {
  return (
    <td className='calendar-view-date-cell' rowSpan={props.events.length <= 0 ? 1 : props.events.length}>
      <div className='calendar-view-date float-left text-right'>{format(props.date, 'dd')}</div>
      <div className='calendar-view-day'>{format(props.date, 'EEEE')}</div>
      <div className='calendar-view-month text-muted'>{format(props.date, 'MMMM, yyyy')}</div>
    </td>
  );
}

export default function CalendarDayRow(props: CalendarDayRowProps) {
  const today = new Date();
  const rowClass = today.getDay() === props.date.getDay() ? 'table-warning' : '';

  if (props.events.length <= 0) {
    return (
      <tr className={rowClass}>
        <DateCell {...props} />
        <td></td>
        <td></td>
      </tr>
    );
  }

  return (
    <React.Fragment>
      {props.events.map(
        function(event: Event, index: Number) {
          return (
            <tr className={rowClass} key={event.id}>
              { index === 0 && <DateCell {...props}/> }
              <td className="calendar-view-timespan">
                <div>{formatDateTime(event.start?.dateTime, props.timeFormat)} - {formatDateTime(event.end?.dateTime, props.timeFormat)}</div>
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
  );
}
// </CalendarDayRowSnippet>
