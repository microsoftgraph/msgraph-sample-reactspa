// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Moment } from "moment";

// <graphServiceSnippet1>
var graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken: string) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done: any) => {
      done(null, accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client
    .api('/me')
    .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();

  return user;
}
// </graphServiceSnippet1>

// <getUserWeekCalendarSnippet>
export async function getUserWeekCalendar(accessToken: string, timeZone: string, startDate: Moment) {
  const client = getAuthenticatedClient(accessToken);

  // Generate startDateTime and endDateTime query params
  // to display a 7-day window
  var startDateTime = startDate.format();
  var endDateTime = startDate.add(7, 'day').format();

  const events = await client
    .api('/me/calendarview')
    .header("Prefer", `outlook.timezone="${timeZone}"`)
    .query({ startDateTime: startDateTime, endDateTime: endDateTime })
    .select('subject,organizer,start,end')
    .orderby('start/dateTime')
    .top(50)
    .get();

  return events;
}
// </getUserWeekCalendarSnippet>
