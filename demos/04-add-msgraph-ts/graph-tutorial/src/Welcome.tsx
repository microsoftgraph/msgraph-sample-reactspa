import React from 'react';
import {
  Button,
  Jumbotron } from 'reactstrap';

function WelcomeContent(props : any) {
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

interface WelcomeProps
{
  isAuthenticated : boolean;
  authButtonMethod?: (item : any) => void; 
  user : any;
}

export default class Welcome extends React.Component<WelcomeProps, {}> {
  render() {
    return (
      <Jumbotron>
        <h1>React Graph Tutorial</h1>
        <p className="lead">This sample app shows how to use the Microsoft Graph API to access Outlook and OneDrive data from React</p>
        <WelcomeContent
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          authButtonMethod={this.props.authButtonMethod} />
      </Jumbotron>
    );
  }
}