import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import browserHistory from '../utils/browserHistory';

export default class Appbar extends Component {
    render() {
        let styles = {
            container: {
                position: "fixed",
                height: 64,
                top: 0
            }
        }
        return (
            <div style={styles.container}>
                <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                {
                    this.props.isHome ?
                    // <MenuIcon />
                    null
                    :
                    <ArrowBackIcon onClick={()=>{
                        browserHistory.length === 0 ? browserHistory.push("/staff") : browserHistory.goBack()
                    }} />
                }
                </IconButton>
            </div>
        )
    }
}
