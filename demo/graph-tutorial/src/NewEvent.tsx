// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <NewEventSnippet>
import React from 'react';
import { NavLink as RouterNavLink, Redirect } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import { Attendee, Event } from 'microsoft-graph';
import { config } from './Config';
import withAuthProvider, { AuthComponentProps } from './AuthProvider';
import { createEvent } from './GraphService';

interface NewEventState {
  subject: string;
  attendees: string;
  start: string;
  end: string;
  body: string;
  disableCreate: boolean;
  redirect: boolean;
}

class NewEvent extends React.Component<AuthComponentProps, NewEventState> {

  constructor(props: any) {
    super(props);

    this.state = {
      subject: '',
      attendees: '',
      start: '',
      end: '',
      body: '',
      disableCreate: true,
      redirect: false
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.isFormDisabled = this.isFormDisabled.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  // Called whenever an input is changed
  handleUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    // Set the state value that maps to the input
    var newState: any = {
      [event.target.name]: event.target.value
    };

    this.setState(newState);
  }

  // Determines if form is ready to submit
  // Requires a subject, start, and end
  isFormDisabled(): boolean {
    return this.state.subject.length === 0 ||
           this.state.start.length === 0 ||
           this.state.end.length === 0;
  }

  // Creates the event when user clicks Create
  async createEvent() {
    // Get the value of attendees and split into an array
    var attendeeEmails = this.state.attendees.split(';');
    var attendees: Attendee[] = [];

    // Create an Attendee object for each email address
    attendeeEmails.forEach((email) => {
      if (email.length > 0) {
        attendees.push({
          emailAddress: {
            address: email
          }
        });
      }
    });

    // Create the Event object
    var newEvent: Event = {
      subject: this.state.subject,
      // Only add if there are attendees
      attendees: attendees.length > 0 ? attendees : undefined,
      // Specify the user's time zone so
      // the start and end are set correctly
      start: {
        dateTime: this.state.start,
        timeZone: this.props.user.timeZone
      },
      end: {
        dateTime: this.state.end,
        timeZone: this.props.user.timeZone
      },
      // Only add if a body was given
      body: this.state.body.length > 0 ? {
        contentType: "text",
        content: this.state.body
      } : undefined
    }

    try {
      // Get the user's access token
      var accessToken = await this.props.getAccessToken(config.scopes);

      // Create the event
      await createEvent(accessToken, newEvent);

      // Redirect to the calendar view
      this.setState({ redirect: true });
    }
    catch (err) {
      this.props.setError('ERROR', JSON.stringify(err));
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/calendar" />
    }

    return (
      <Form>
        <FormGroup>
          <Label for="subject">Subject</Label>
          <Input type="text"
            name="subject"
            id="subject"
            value={this.state.subject}
            onChange={this.handleUpdate} />
        </FormGroup>
        <FormGroup>
          <Label for="attendees">Attendees</Label>
          <Input type="text"
            name="attendees"
            id="attendees"
            placeholder="Enter a list of email addresses, seperated by a semi-colon"
            value={this.state.attendees}
            onChange={this.handleUpdate} />
        </FormGroup>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="start">Start</Label>
              <Input type="datetime-local"
                name="start"
                id="start"
                value={this.state.start}
                onChange={this.handleUpdate} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="end">End</Label>
              <Input type="datetime-local"
                name="end"
                id="end"
                value={this.state.end}
                onChange={this.handleUpdate} />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="body">Body</Label>
          <Input type="textarea"
            name="body"
            id="body"
            value={this.state.body}
            onChange={this.handleUpdate} />
        </FormGroup>
        <Button color="primary"
          className="mr-2"
          disabled={this.isFormDisabled()}
          onClick={this.createEvent}>Create</Button>
        <RouterNavLink to="/calendar" className="btn btn-secondary" exact>Cancel</RouterNavLink>
      </Form>
    )
  }
}

export default withAuthProvider(NewEvent);
// </NewEventSnippet>
