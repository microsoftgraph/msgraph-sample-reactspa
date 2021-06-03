// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <WelcomeSnippet>
import {
  Button,
  Container
} from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { useAppContext } from './AppContext';

function WelcomeContent() {
  const app = useAppContext();

  // If authenticated, greet the user
  if (app.user) {
    return (
      <div>
        <h4>Welcome {app.user.displayName}!</h4>
        <p>Use the navigation bar at the top of the page to get started.</p>
      </div>
    );
  }

  // Not authenticated, present a sign in button
  return <Button color="primary" onClick={app.signIn!}>Click here to sign in</Button>;
}

export default function Welcome(props: RouteComponentProps) {
  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <Container fluid>
        <h1>React Graph Tutorial</h1>
        <p className="lead">
          This sample app shows how to use the Microsoft Graph API to access a user's data from React
        </p>
        <WelcomeContent />
      </Container>
    </div>
  );
}
// </WelcomeSnippet>
