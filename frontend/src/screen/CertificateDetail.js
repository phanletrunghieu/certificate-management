import React, {Component} from 'react';
import { Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const styles =({
    input: {
      position: 'absolute',
      right: 100,
      top: 18,
      color: 'inherit',
    },
    page:{
      paddingTop: 80,
      height: "100vh",
      background: "#F0F1FF"
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
    images: {
        margin: "auto",
        display: "block",
    },
    texts: {
      position: 'relative',
      left: 40,
      fontSize: 30,
    },
  });


export default class CertificateDetailScreen extends Component{
    render(){
        return(
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
                <div style={styles.page} >
                    <div > 
                        <img style={styles.images} src="http://cafefcdn.com/thumb_w/650/2017/that-vaou-1494304227253.png"/> 
                    </div>
                    <div style={styles.texts}>
                        Information: Bui Bao Hung
                    </div>
                    <div style={styles.texts}>
                        Granted By: Nguyen XXX
                    </div>
                    <div style={styles.texts}> 
                        Expire: 19-09-2019
                    </div>
                    <div></div>
                </div>    
            </div>
        );
    }

}