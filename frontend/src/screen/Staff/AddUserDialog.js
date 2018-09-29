import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export default class AddUserDialog extends Component {
    state = {
        open: false,
    }

    constructor(props){
        super(props)
        
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    open(){
        this.setState({open: true})
    }

    close(){
        this.setState({open: false})
    }

    render() {
        let styles = {
            formControl: {
                margin: 10,
            },
        }

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={()=>this.setState({open: false})}
                    aria-labelledby="dialog-title"
                >
                    <DialogTitle id="dialog-title">Add new staff</DialogTitle>
                    <DialogContent>
                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="input-name">Name</InputLabel>
                            <Input id="input-name"/>
                        </FormControl>
                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="input-address">Address</InputLabel>
                            <Input id="input-address"/>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.close} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.close} color="primary" autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
