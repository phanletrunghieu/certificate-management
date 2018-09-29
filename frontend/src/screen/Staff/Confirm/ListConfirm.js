import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

export default class ListConfirm extends Component {
    render() {
        let styles = {
            container: {
                width: "50%",
                minWidth: 300,
                margin: "auto",
                minHeight: "calc(100vh - 128px)",
                backgroundColor: "rgba(255, 255, 255, 0.35)"
            },
            listItem: {
                height: 50
            }
        }
        return (
            <Paper style={styles.container}>
                <List>
                    <ListItem
                        dense
                        button
                        style={styles.listItem}
                    >
                        <ListItemText primary={`Line item`} />
                        <ListItemSecondaryAction>
                            <IconButton>
                                <CheckIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem
                        dense
                        button
                        style={styles.listItem}
                    >
                        <ListItemText primary={`Line item`} />
                        <ListItemSecondaryAction>
                            <IconButton>
                                <CloseIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Paper>
        )
    }
}
