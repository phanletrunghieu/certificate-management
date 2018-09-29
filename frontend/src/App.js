import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import browserHistory from "./utils/browserHistory";
import HomeScreen from "./screen/Home"
import StaffScreen from "./screen/Staff"
import NormalUserScreen from "./screen/NormalUser"
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/staff" component={StaffScreen} />
          <Route path="/normal-user" component={NormalUserScreen} />
        </div>
      </Router>
    );
  }
}

export default App;
