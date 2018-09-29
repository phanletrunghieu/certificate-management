import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import AddUserDialog from './AddUserDialog'

export default class ListUsers extends Component {
    state = {
        users: [
            {
                name: "Hieu Dep Trai",
                address: "0x030243249230493894398908093909",
                date_created: new Date().toString()
            },
            {
                name: "Hieu Dep Trai",
                address: "0x030243249230493894398908093909",
                date_created: new Date().toString()
            },
            {
                name: "Hieu Dep Trai",
                address: "0x030243249230493894398908093909",
                date_created: new Date().toString()
            },
            {
                name: "Hieu Dep Trai",
                address: "0x030243249230493894398908093909",
                date_created: new Date().toString()
            },
        ]
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
                            <TableCell>Date created</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" style={styles.tableCell}>{user.name}</TableCell>
                                <TableCell style={styles.tableCell}>{user.address}</TableCell>
                                <TableCell style={styles.tableCell}>{user.date_created}</TableCell>
                                <TableCell style={styles.tableCell}>
                                    <IconButton>
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

                <AddUserDialog ref={r=>this._dialogAdd = r} />
            </Paper>
        )
    }
}
