import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loading from '../../components/Loading'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';

import AddUserDialog from './AddUserDialog'
import {getListSuperUserCreated, deleteUser} from '../../api/user'

export default class ListUsers extends Component {
    state = {
        users: [],
        errorMessage: ""
    }

    constructor(props){
        super(props)

        this.loadData = this.loadData.bind(this)
        this.delete = this.delete.bind(this)
    }

    componentWillMount(){
        this.loadData()
    }

    loadData(){
        this.setState({isLoading: true})
        getListSuperUserCreated()
        .then(users=>{
            console.log(users);

            this.setState({
                isLoading: false,
                users: users
            })
        })
        .catch(error=>this.setState({isLoading: false, errorMessage: error.message || error.toString()}))
    }

    delete(user){
        if(window.confirm("You want to delete?")){
            this.setState({isLoading: true})
            deleteUser(user.address)
            .then(()=>{
                this.setState({isLoading: false})
            })
            .catch(error=>this.setState({isLoading: false, errorMessage: error.message || error.toString()}))
        }
    }

    render() {
        let styles = {
            container: {
                width: "80%",
                minWidth: 1000,
                margin: "30px auto 0",
                backgroundColor: "rgba(255, 255, 255, 0.35)",
            },
            fab: {
                position: "absolute",
                bottom: 20,
                right: 20
            },
            tableCell: {
                borderBottom: "1px rgba(255, 255, 255, 0.4) solid",
                fontSize: 15
            }
        }

        return (
            <Paper style={styles.container}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Create certificate permission</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" style={styles.tableCell}>{user.name}</TableCell>
                                <TableCell style={styles.tableCell}>{user.address}</TableCell>
                                <TableCell style={styles.tableCell}>{user.position}</TableCell>
                                <TableCell style={styles.tableCell}>
                                <Checkbox
                                    color="primary"
                                    checked={user.uploadPermission}
                                    // onChange={this.handleChange('checkedA')}
                                />
                                </TableCell>
                                <TableCell style={styles.tableCell}>
                                    <IconButton onClick={e=>this.delete(user)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                <Button
                    variant="fab"
                    color="primary"
                    aria-label="Add"
                    style={styles.fab}
                    onClick={()=>this._dialogAdd.open()}
                >
                    <AddIcon />
                </Button>

                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={this.state.errorMessage !== ""}
                    onClose={()=>this.setState({errorMessage: ""})}
                    message={this.state.errorMessage}
                />
                <AddUserDialog ref={r=>this._dialogAdd = r} />
                <Loading show={this.state.isLoading} />
            </Paper>
        )
    }
}
