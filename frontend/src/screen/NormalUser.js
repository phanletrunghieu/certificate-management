import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Certificate from '../components/Certificate';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import ShareIcon from '@material-ui/icons/Share';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import browserHistory from "../utils/browserHistory";
import SearchIcon from '@material-ui/icons/Search';

const styles =({
  input: {
    position: 'absolute',
    right: 100,
    top: 18,
    color: 'inherit',
  },
  inputS: {
    top: 18,
    color: 'inherit',
    size: 30,
  },
  rightpage:{
    display:"inline-block",
    backgroundColor: "#FAFAFA",
    height: "calc(100vh - 64px)",
    width: "calc(75vw - 25px)",
    verticalAlign: "top",
  },
  page:{
    paddingTop: 64,
  },
  leftpage:{
    position: 'relative',
    display:"inline-block",
    backgroundColor: "grey",
    height: "calc(100vh - 64px)",
    width: "25vw",
    verticalAlign: "top",
    padding: 5,
  },
  labels:{
    display:"inline-block",
    //color: "black",
  },

  button: {
    position: 'absolute',
    top : 13,
    right: 40,
  },
  componentss: {
    //position: 'relative',
    display:"inline-block",
    margin: "10px",
  },

});





export default class UserNormal extends Component {

  onClickDetail() {
    browserHistory.push("/certificate/detail")
  }
  render() {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <div style={styles.labels} > Address Owner </div> 
            <Input
              placeholder="Enter address to share"
              // disableUnderline
              style={styles.input}
              inputProps={{
                'aria-label': 'Description',
              }}
            />
            <Button color="inherit" style={styles.button}>
              <ShareIcon/>
            </Button>

          </Toolbar>
        </AppBar>  
        <div style={styles.page}>
          <div style={styles.leftpage} >
            <Input
              placeholder="Search....."
              //disableUnderline
              style={styles.inputS}
              inputProps={{
                'aria-label': 'Description',
              }}
            />

                   
                  <Button color="inherit" variant="contained" style={styles.button} >
                    <SearchIcon/>
                  </Button>
         
            </div>
 
 
 
            <div style={styles.rightpage} >
         
               <Certificate onClick={this.onClickDetail} style={styles.componentss} image="http://cafefcdn.com/thumb_w/650/2017/that-vaou-1494304227253.png" text="bằng lái xe"/>
           
               <Certificate onClick={this.onClickDetail} style={styles.componentss} image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdj4ohtcHPi1KSATYtnpvXHNHC5asfYeZfNKQrSQNEhwSmXdn" text="cmnd"/>
                       
            </div>
        </div>    
      </div>
    )
  }
}
