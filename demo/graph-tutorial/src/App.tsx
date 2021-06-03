// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ProvideAppContext from './AppContext';
import ErrorMessage from './ErrorMessage';
import NavBar from './NavBar';
import Welcome from './Welcome';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  return(
    <ProvideAppContext>
      <Router>
        <div>
          <NavBar />
          <Container>
            <ErrorMessage />
            <Route exact path="/"
              render={(props) =>
                <Welcome {...props} />
              } />
          </Container>
        </div>
      </Router>
    </ProvideAppContext>
  );
}
