import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import Loading from '../../../components/Loading'
import config from '../../../config'
import waitForMined from '../../../utils/waitForMined'
import {addCertificate} from '../../../api/certificate'

export default class AddCertificateDialog extends Component {
    state = {
        open: false,
        isLoading: false,
        name: "",
        errorMessage: ""
    }

    constructor(props){
        super(props)
        
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.save = this.save.bind(this)
    }

    open(){
        this.setState({open: true})
    }

    close(){
        this.setState({open: false})
    }

    resetState(){
        this.setState({
            name: "",
        })
    }

    save(){
        this.setState({isLoading: true})
        addCertificate(this.props.address, this.state.name, "fsdfdfssd")
        .then(hash=>{
            this.setState({isLoading: false})
            this.close()
        })
        .catch(error=>this.setState({isLoading: false, errorMessage: error.message || error.toString()}))
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
                    <DialogTitle id="dialog-title">Add new certificate</DialogTitle>
                    <DialogContent>
                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="input-name">Name</InputLabel>
                            <Input id="input-name" value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})}/>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.close} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.save} color="primary" autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <Loading show={this.state.isLoading} />

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
