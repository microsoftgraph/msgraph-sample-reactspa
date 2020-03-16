<!-- markdownlint-disable MD002 MD041 -->

In this exercise you will incorporate the Microsoft Graph into the application. For this application, you will use the [microsoft-graph-client](https://github.com/microsoftgraph/msgraph-sdk-javascript) library to make calls to Microsoft Graph.

## Get calendar events from Outlook

1. Open `./src/GraphService.ts` and add the following function.

    :::code language="typescript" source="../demo/graph-tutorial/src/GraphService.ts" id="getEventsSnippet":::

    Consider what this code is doing.

    - The URL that will be called is `/me/events`.
    - The `select` method limits the fields returned for each events to just those the view will actually use.
    - The `orderby` method sorts the results by the date and time they were created, with the most recent item being first.

1. Create a React component to display the results of the call. Create a new file in the `./src` directory named `Calendar.tsx` and add the following code.

    ```TSX
    import React from 'react';
    import { Table } from 'reactstrap';
    import moment from 'moment';
    import { UserAgentApplication } from 'msal';
    import { Event } from 'microsoft-graph';
    import { config } from './Config';
    import { getEvents } from './GraphService';

    interface CalendarProps {
      showError: any;
    }

    interface CalendarState {
      events: Event[];
    }

    // Helper function to format Graph date/time
    function formatDateTime(dateTime: string | undefined) {
      if (dateTime !== undefined) {
        return moment.utc(dateTime).local().format('M/D/YY h:mm A');
      }
    }

    export default class Calendar extends React.Component<CalendarProps, CalendarState> {
      constructor(props: any) {
        super(props);

        this.state = {
          events: []
        };
      }

      async componentDidMount() {
        try {
          // Get the user's access token
          const msal = window.msal as UserAgentApplication;

          var accessToken = await msal.acquireTokenSilent({
            scopes: config.scopes
          });
          // Get the user's events
          var events = await getEvents(accessToken.accessToken);
          // Update the array of events in state
          this.setState({events: events.value});
        }
        catch(err) {
          this.props.showError('ERROR', JSON.stringify(err));
        }
      }

      render() {
        return (
          <pre><code>{JSON.stringify(this.state.events, null, 2)}</code></pre>
        );
      }
    }
    ```

    For now this just renders the array of events in JSON on the page.

1. Add this new component to the app. Open `./src/App.tsx` and add the following `import` statement to the top of the file.

    ```typescript
    import Calendar from './Calendar';
    ```

1. Add the following component just after the existing `<Route>`.

    ```TSX
    <Route exact path="/calendar"
      render={(props) =>
        <Calendar {...props}
          showError={this.setErrorMessage.bind(this)} />
      } />
    ```

1. Save your changes and restart the app. Sign in and click the **Calendar** link in the nav bar. If everything works, you should see a JSON dump of events on the user's calendar.

## Display the results

Now you can update the `Calendar` component to display the events in a more user-friendly manner.

1. Replace the existing `render` function in `./src/Calendar.js` with the following function.

    :::code language="typescript" source="../demo/graph-tutorial/src/Calendar.tsx" id="renderSnippet":::

    This loops through the collection of events and adds a table row for each one.

1. Save the changes and restart the app. Click on the **Calendar** link and the app should now render a table of events.

    ![A screenshot of the table of events](./images/add-msgraph-01.png)
