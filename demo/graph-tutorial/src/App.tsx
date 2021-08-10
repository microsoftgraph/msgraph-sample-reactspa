// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { MsalProvider } from '@azure/msal-react'
import { IPublicClientApplication } from '@azure/msal-browser';

import ProvideAppContext from './AppContext';
import ErrorMessage from './ErrorMessage';
import NavBar from './NavBar';
import Welcome from './Welcome';
import Calendar from './Calendar';
import NewEvent from './NewEvent';
import 'bootstrap/dist/css/bootstrap.css';

// <AppPropsSnippet>
type AppProps= {
  pca: IPublicClientApplication
};
// </AppPropsSnippet>

export default function App({ pca }: AppProps) {
  // <ReturnSnippet>
  return(
    <MsalProvider instance={ pca }>
      <ProvideAppContext>
        <Router>
          <NavBar />
          <Container>
            <ErrorMessage />
            <Route exact path="/"
              render={(props) =>
                <Welcome {...props} />
              } />
            <Route exact path="/calendar"
              render={(props) =>
                <Calendar {...props} />
              } />
            <Route exact path="/newevent"
              render={(props) =>
                <NewEvent {...props} />
              } />
          </Container>
        </Router>
      </ProvideAppContext>
    </MsalProvider>
  );
  // </ReturnSnippet>
}
