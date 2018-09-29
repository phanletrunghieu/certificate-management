import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {IsMetaMaskEnabled, GetWeb3Instance} from "../utils/web3"
import browserHistory from "../utils/browserHistory";

export default class HomeScreen extends Component {
  state = {
    openLoginDialog: false,
  }

  constructor(props){
    super(props)

    this.login = this.login.bind(this)
  }

  login(){
    this.setState({openLoginDialog: true})
  }

  onClickStaff(){
    browserHistory.push("/staff")
  }

  onClickNormalUser(){
    browserHistory.push("/normal-user")
  }

  render() {
    let styles = {
      title: {
        color: "#fff",
        fontWeight: "lighter",
        textTransform: "uppercase",
        margin: 0
      },
      subtitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "lighter",
        margin: "30px 0 50px"
      },
      btn: {
        textTransform: "none",
      },
      btnLogin: {
        padding: "14px 30px"
      },
      btnOptionLogin: {
        width: 200,
        height: 200,
        fontSize: 25,
        margin: 5
      },
      loginTitle: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 15
      },
      sec1: {
        height: "100vh",
        width: "100%",
        padding: "0 10%",
        boxSizing: "border-box",
        display: "table",
      },
      subcontainer: {
        display: "table-cell",
        verticalAlign: "middle",
      }
    }

    if(!IsMetaMaskEnabled()){
      return (
        <div>Please enable metamask</div>
      )
    }

    return (
        <div>
          <div className="main-bg" style={styles.sec1}>
            <div style={styles.subcontainer}>
              <h1 style={styles.title}>Certificate management</h1>
              <div style={styles.subtitle}>Certificate manage system</div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.login}
                style={{...styles.btn, ...styles.btnLogin}}
              >
                Get started!
              </Button>
            </div>
          </div>

          <Dialog
            open={this.state.openLoginDialog}
            onClose={()=>this.setState({openLoginDialog: false})}
          >
            <DialogContent>
              <div style={styles.loginTitle}>Choose your role</div>
              <Button
                onClick={this.onClickNormalUser}
                style={{...styles.btnOptionLogin, ...styles.btn}}
              >
                Normal user
              </Button>
              <Button
                onClick={this.onClickStaff}
                style={{...styles.btnOptionLogin, ...styles.btn}}
              >
                School staff
              </Button>
            </DialogContent>
          </Dialog>
        </div>
    )
  }
}
