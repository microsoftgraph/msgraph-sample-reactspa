// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './NavBar';
import ErrorMessage from './ErrorMessage';
import Welcome from './Welcome';
import 'bootstrap/dist/css/bootstrap.css';

interface AppState {
  error: any;
  isAuthenticated: boolean;
  user: any;
}

class App extends Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: {},
      error: null
    };
  }

  render() {
    let error = null;
    if (this.state.error) {
      error = <ErrorMessage message={this.state.error.message} debug={this.state.error.debug} />;
    }

    return (
      <Router>
        <div>
          <NavBar
            isAuthenticated={this.state.isAuthenticated}
            authButtonMethod={null}
            user={this.state.user}/>
          <Container>
            {error}
            <Route exact path="/"
              render={(props) =>
                <Welcome {...props}
                  isAuthenticated={this.state.isAuthenticated}
                  user={this.state.user}
                  authButtonMethod={null} />
              } />
          </Container>
        </div>
      </Router>
    );
  }

  setErrorMessage(message: string, debug: string) {
    this.setState({
      error: {message: message, debug: debug}
    });
  }
}

export default App;
