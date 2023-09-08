// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useEffect, useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { findIana } from 'windows-iana';
import { Event } from '@microsoft/microsoft-graph-types';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { add, endOfWeek, format, getDay, parseISO, startOfWeek } from 'date-fns';

import { getUserWeekCalendar } from './GraphService';
import { useAppContext } from './AppContext';
import CalendarDayRow from './CalendarDayRow';
import './Calendar.css';

export default function Calendar() {
  const app = useAppContext();

  const [events, setEvents] = useState<Event[]>();

  useEffect(() => {
    const loadEvents = async () => {
      if (app.user && !events) {
        try {
          const ianaTimeZones = findIana(app.user?.timeZone!);
          const events = await getUserWeekCalendar(app.authProvider!, ianaTimeZones[0].valueOf());
          setEvents(events);
        } catch (err) {
          const error = err as Error;
          app.displayError!(error.message);
        }
      }
    };

    loadEvents();
  });

  // <ReturnSnippet>
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(weekStart);

  return (
    <AuthenticatedTemplate>
      <div className="mb-3">
        <h1 className="mb-3">{format(weekStart, 'MMMM d, yyyy')} - {format(weekEnd, 'MMMM d, yyyy')}</h1>
        <RouterNavLink to="/newevent" className="btn btn-light btn-sm">New event</RouterNavLink>
      </div>
      <div className="calendar-week">
        <div className="table-responsive">
          {events && <Table size="sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              <CalendarDayRow
                date={weekStart}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 0)} />
              <CalendarDayRow
                date={add(weekStart, { days: 1 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 1)} />
              <CalendarDayRow
                date={add(weekStart, { days: 2 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 2)} />
              <CalendarDayRow
                date={add(weekStart, { days: 3 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 3)} />
              <CalendarDayRow
                date={add(weekStart, { days: 4 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 4)} />
              <CalendarDayRow
                date={add(weekStart, { days: 5 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 5)} />
              <CalendarDayRow
                date={add(weekStart, { days: 6 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 6)} />
            </tbody>
          </Table>}
        </div>
      </div>
    </AuthenticatedTemplate>
  );
  // </ReturnSnippet>
}
