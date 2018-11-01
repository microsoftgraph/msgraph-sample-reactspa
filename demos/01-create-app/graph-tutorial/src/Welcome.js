import React from 'react';
import {
  Button,
  Jumbotron } from 'reactstrap';

function WelcomeContent(props) {
  // If authenticated, greet the user
  if (props.isAuthenticated) {
    return (
      <div>
        <h4>Welcome {props.user.displayName}!</h4>
        <p>Use the navigation bar at the top of the page to get started.</p>
      </div>
    );
  }

  // Not authenticated, present a sign in button
  return <Button color="primary" onClick={props.authButtonMethod}>Click here to sign in</Button>;
}

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.isAuthenticated = props.isAuthenticated;
    this.authButtonMethod = props.authButtonMethod;
    this.user = props.user;
  }

  render() {
    return (
      <Jumbotron>
        <h1>React Graph Tutorial</h1>
        <p className="lead">This sample app shows how to use the Microsoft Graph API to access Outlook and OneDrive data from React</p>
        <WelcomeContent
          isAuthenticated={this.isAuthenticated}
          user={this.user}
          authButtonMethod={this.authButtonMethod} />
      </Jumbotron>
    );
  }
}