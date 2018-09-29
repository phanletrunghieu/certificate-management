import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import browserHistory from "./utils/browserHistory";
import HomeScreen from "./screen/Home"
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Route exact path="/" component={HomeScreen} />
        </div>
      </Router>
    );
  }
}

export default App;
