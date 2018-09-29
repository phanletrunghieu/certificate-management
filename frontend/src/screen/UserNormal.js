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



import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme =>({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    position: 'absolute',
    right: 100,
    color: 'inherit',
  },
  rightpage:{
    display:"inline-block",
    backgroundColor: "#FAFAFA",
    height: "100vh",
    width: "calc(75vw - 15px)",
    verticalAlign: "top",
  },
  page:{
    paddingTop: 64,
  },
  leftpage:{
    display:"inline-block",
    backgroundColor: "grey",
    height: "100vh",
    width: "25vw",
    verticalAlign: "top",
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



  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default class UserNormal extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="fixed">
               <Toolbar>
                <div style={styles.labels} > Address Owner </div> 
                 <Input
                        placeholder="Enter address to share"
                        
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

            <div style={styles.search}>
            <div style={styles.searchIcon}>
              <SearchIcon />
            </div>
            <Input
              placeholder="Search…"
              disableUnderline
              classes={{
                 root: classes.inputRoot,
                 input: classes.inputInput,
               }}
            />
          </div>
         
            </div>
 
 
 
            <div style={styles.rightpage} >
         
               <Certificate style={styles.componentss} image="https://i.ebayimg.com/images/g/tWIAAOSwwvZZTnic/s-l300.jpg" text="aaaaaa"/>
           
               <Certificate style={styles.componentss} image="https://2.bp.blogspot.com/-VlXvI3AdCzI/Wb1gyVQdkPI/AAAAAAAAAGg/iR0XJTcBmychpmLhPttKWDzT0t3VCSmeQCLcBGAs/s1600/13619936_1383307711685494_1279421461059075076_n.jpg" text="hiếu ml"/>
                       
            </div>
        </div>    
      </div>
    )
  }
}
