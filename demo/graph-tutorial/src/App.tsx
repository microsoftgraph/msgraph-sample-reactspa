// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { UserAgentApplication } from 'msal';
import NavBar from './NavBar';
import ErrorMessage from './ErrorMessage';
import Welcome from './Welcome';
import { config } from './Config';
import { getUserDetails } from './GraphService';
import 'bootstrap/dist/css/bootstrap.css';

interface AppState {
  error: any;
  isAuthenticated: boolean;
  user: any;
}

class App extends Component<any, AppState> {
  private userAgentApplication: UserAgentApplication;

  // <constructorSnippet>
  constructor(props: any) {
    super(props);

    this.userAgentApplication = new UserAgentApplication({
      auth: {
          clientId: config.appId,
          redirectUri: config.redirectUri
      },
      cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: true
      }
    });

    var account = this.userAgentApplication.getAccount();

    this.state = {
      isAuthenticated: (account !== null),
      user: {},
      error: null
    };

    if (account) {
      // Enhance user object with data from Graph
      this.getUserProfile();
    }
  }
  // </constructorSnippet>

  render() {
    let error = null;
    if (this.state.error) {
      error = <ErrorMessage message={this.state.error.message} debug={this.state.error.debug} />;
    }

    // <renderSnippet>
    return (
      <Router>
        <div>
          <NavBar
            isAuthenticated={this.state.isAuthenticated}
            authButtonMethod={this.state.isAuthenticated ? this.logout.bind(this) : this.login.bind(this)}
            user={this.state.user}/>
          <Container>
            {error}
            <Route exact path="/"
              render={(props) =>
                <Welcome {...props}
                  isAuthenticated={this.state.isAuthenticated}
                  user={this.state.user}
                  authButtonMethod={this.login.bind(this)} />
              } />
          </Container>
        </div>
      </Router>
    );
    // </renderSnippet>
  }

  setErrorMessage(message: string, debug: string) {
    this.setState({
      error: {message: message, debug: debug}
    });
  }

  // <loginSnippet>
  async login() {
    try {
      await this.userAgentApplication.loginPopup(
          {
            scopes: config.scopes,
            prompt: "select_account"
        });
      await this.getUserProfile();
    }
    catch(err) {
      var error = {};

      if (typeof(err) === 'string') {
        var errParts = err.split('|');
        error = errParts.length > 1 ?
          { message: errParts[1], debug: errParts[0] } :
          { message: err };
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }

      this.setState({
        isAuthenticated: false,
        user: {},
        error: error
      });
    }
  }
  // </loginSnippet>

  // <logoutSnippet>
  logout() {
    this.userAgentApplication.logout();
  }
  // </logoutSnippet>

  async getUserProfile() {
    try {
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token

      var accessToken = await this.userAgentApplication.acquireTokenSilent({
          scopes: config.scopes
        });

      if (accessToken) {
        // Get the user's profile from Graph
        var user = await getUserDetails(accessToken.accessToken);
        this.setState({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName
          },
          error: null
        });
      }
    }
    catch(err) {
      var error = {};
      if (typeof(err) === 'string') {
        var errParts = err.split('|');
        error = errParts.length > 1 ?
          { message: errParts[1], debug: errParts[0] } :
          { message: err };
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }

      this.setState({
        isAuthenticated: false,
        user: {},
        error: error
      });
    }
  }
}

export default App;
