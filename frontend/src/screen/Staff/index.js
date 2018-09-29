import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Switch, Route } from 'react-router';
import browserHistory from '../../utils/browserHistory';
import ListUsers from "./ListUsers"
import ListActions from "./ListActions"
import SearchUsers from "./Certificate/Search"
import Appbar from '../../components/Appbar';


export default class StaffScreen extends Component {
  render() {
    const styles = {
      container: {
        paddingTop: 64
      },
      root: {
        flexGrow: 1,
      },
      grow: {
        flexGrow: 1,
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
    };

    let isHome = browserHistory.location.pathname === "/staff/" || browserHistory.location.pathname === "/staff"
    

    return (
      <div style={styles.container}>
        <Appbar isHome={isHome}/>
        <Switch>
          <Route exact path="/staff" component={ListActions} />
          <Route exact path="/staff/accounts" component={ListUsers} />
          <Route exact path="/staff/certificates" component={SearchUsers} />
        </Switch>
      </div>
    )
  }
}
