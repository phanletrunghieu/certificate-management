import React, { Component } from 'react'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SearchIcon from '@material-ui/icons/Search';
import browserHistory from '../../../utils/browserHistory';

export default class SearchUser extends Component {
    state = {
        address: "",
        errorMessage: ""
    }

    constructor(props){
        super(props)

        this.search = this.search.bind(this)
    }

    search(){
        if(this.state.address === ""){
            return this.setState({errorMessage: "Please fill the address!"})
        }

        browserHistory.push("/staff/certificates/"+this.state.address)
    }
    
    render() {
        let styles = {
            container: {
                width: "40%",
                minWidth: 300,
                margin: "auto",
                height: "calc(100vh - 64px)",
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
            },
            input: {
                color: "#fff"
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
                        value={this.state.address}
                        onChange={e=>this.setState({address: e.target.value})}
                        onKeyPress={e=>{
                            if (e.key == 'Enter') {
                                this.search()
                            }
                        }}
                        style={styles.input}
                        classes={{
                            underline: {
                                '&:before': {
                                    borderBottomColor: "white",
                                },
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        onClick={this.search}
                    >
                        Show
                    </Button>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={this.state.errorMessage !== ""}
                    onClose={()=>this.setState({errorMessage: ""})}
                    message={this.state.errorMessage}
                />
            </div>
        )
    }
}
