import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import Icon from '@material-ui/core/Icon';



const styles = {
  card: {
    maxWidth: 333,
    position: 'relative',
  },
  media: {
    height: 140,
    width: 333,
   // width: "100%"
  },
  text: {
    color: "black",
    fontSize: "25px",
    textAlign: "center"
  },
  button: {
    position: 'absolute',
    top : 0,
    right: 0,
    zIndex: 15,
  },
};

export default class Certificate extends Component {
  render() {
    return (
      // variant="fab" nền button
   <Card style={{...styles.card, ...this.props.style}}>
      <Button  color="black" style={styles.button}>
        <ShareIcon/>
      </Button>

     <CardActionArea> 
       <img style={styles.media} src={this.props.image}/> 
        <div style={styles.text}>
          {this.props.text}
        </div>
     </CardActionArea>
    </Card>
      
    )
  }
}
