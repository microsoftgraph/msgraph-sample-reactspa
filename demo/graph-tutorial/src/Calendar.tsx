import React from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import { Event } from 'microsoft-graph';
import { config } from './Config';
import { getEvents } from './GraphService';
import withAuthProvider, { AuthComponentProps } from './AuthProvider';

interface CalendarState {
  events: Event[];
}

// Helper function to format Graph date/time
function formatDateTime(dateTime: string | undefined) {
  if (dateTime !== undefined) {
    return moment.utc(dateTime).local().format('M/D/YY h:mm A');
  }
}

class Calendar extends React.Component<AuthComponentProps, CalendarState> {
  constructor(props: any) {
    super(props);

    this.state = {
      events: []
    };
  }

  async componentDidMount() {
    try {
      // Get the user's access token
      var accessToken = await this.props.getAccessToken(config.scopes);
      // Get the user's events
      var events = await getEvents(accessToken);
      // Update the array of events in state
      this.setState({events: events.value});
    }
    catch(err) {
      this.props.setError('ERROR', JSON.stringify(err));
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
