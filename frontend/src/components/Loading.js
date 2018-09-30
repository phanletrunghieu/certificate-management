import React, { Component } from 'react';
import CircularProgress     from '@material-ui/core/CircularProgress';

export default class Loading extends Component {
    render() {
        var styles={
            loadingContainer: {
                position       : 'fixed',
                left           : 0,
                top            : 0,
                width          : "100%",
                height         : "100%",
                backgroundColor: '#0000009e',
                zIndex         : 2000,
            },
            circularProgress: {
                position: 'absolute',
                left    : 'calc(50% - 30px)',
                top     : 'calc(50% - 30px)',
                color   : "white"
            },
            message: {
                color    : "white",
                position : 'absolute',
                left     : '50%',
                top      : 'calc(50% + 50px)',
                transform: 'translate(-50%, -50%)',
            }
        }
    
        return(
            this.props.show ? (
                <div style = {styles.loadingContainer}>
                    <CircularProgress
                        size      = {60}
                        thickness = {5}
                        style     = {styles.circularProgress}
                    />
                    <div style = {styles.message}>{this.props.message || "Loading"}</div>
                </div>
            ) : null
        );
    }
}