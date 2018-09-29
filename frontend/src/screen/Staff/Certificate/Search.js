import React, { Component } from 'react'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

export default class SearchUser extends Component {
    render() {
        let styles = {
            container: {
                width: "80%",
                margin: "auto",
                height: "100vh",
                display: "table"
            },
            middle: {
                display: "table-cell",
                verticalAlign: "middle"
            },
            button: {
                textTransform: "none",
                display: "block",
                margin: "20px auto 0",
            }
        }
        return (
            <div style={styles.container}>
                <div style={styles.middle}>
                    <Input
                        id="input-with-icon-adornment"
                        fullWidth
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                    <Button variant="contained" color="primary" style={styles.button}>
                        Show
                    </Button>
                </div>
            </div>
        )
    }
}
