import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar
            isAuthenticated={false}
            authButtonMethod={null}
            user={null}/>
        </div>
      </Router>
    );
  }
}

export default App;
