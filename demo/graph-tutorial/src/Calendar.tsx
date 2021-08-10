// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useEffect, useState } from 'react';
import { NavLink as RouterNavLink, RouteComponentProps } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { findIana } from 'windows-iana';
import { Event } from 'microsoft-graph';
import { AuthenticatedTemplate } from '@azure/msal-react';

import { getUserWeekCalendar } from './GraphService';
import { useAppContext } from './AppContext';
import CalendarDayRow from './CalendarDayRow';
import './Calendar.css';
import { add, format, getDay, parseISO } from 'date-fns';
import { endOfWeek, startOfWeek } from 'date-fns/esm';

export default function Calendar(props: RouteComponentProps) {
  const app = useAppContext();

  const [events, setEvents] = useState<Event[]>();

  useEffect(() => {
    const loadEvents = async() => {
      if (app.user && !events) {
        try {
          const ianaTimeZones = findIana(app.user?.timeZone!);
          const events = await getUserWeekCalendar(app.authProvider!, ianaTimeZones[0].valueOf());
          setEvents(events);
        } catch (err: any) {
          app.displayError!(err.message);
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
        <RouterNavLink to="/newevent" className="btn btn-light btn-sm" exact>New event</RouterNavLink>
      </div>
      <div className="calendar-week">
        <div className="table-responsive">
          { events && <Table size="sm">
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
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 0) } />
              <CalendarDayRow
                date={add(weekStart, { days: 1 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 1) } />
              <CalendarDayRow
                date={add(weekStart, { days: 2 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 2) } />
              <CalendarDayRow
                date={add(weekStart, { days: 3 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 3) } />
              <CalendarDayRow
                date={add(weekStart, { days: 4 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 4) } />
              <CalendarDayRow
                date={add(weekStart, { days: 5 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 5) } />
              <CalendarDayRow
                date={add(weekStart, { days: 6 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 6) } />
            </tbody>
          </Table> }
        </div>
      </div>
    </AuthenticatedTemplate>
  );
  // </ReturnSnippet>
}
