import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import  { useHistory  } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {  yellow } from '@material-ui/core/colors';
import { Container, Grid, TableCell, 
         TableRow, Tooltip, Avatar, Modal  } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import UserContext from '../../context/user/userContext';

import Navbar from '../includes/Navbar';
import Sidebar from '../includes/Sidebar';
import Title from '../includes/Title';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        "& main": {
            height: "100%"
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },

    // Cards
    
    buttonIcon: {
        cursor: "pointer",
        color: "#b5b5b5",
        margin: "auto 3px",
        fontSize: "20px"
    },
    
    avatar: {
        width: 100,
        height: 100,
        cursor: "pointer"
    },
    rateIcon: {
        color: yellow[700],
        fontSize: 22,
        fontWeight: "bold",
        display: "inline"
    },
    imageModal: {
        width: 300,
        height: 300,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        border: "none",
        borderRadius: 15,

        "& img": {
            width: "100%",
            height: "100%",
            
        }
    }

}));

const UserList = () => {

    const classes = useStyles();
    const history = useHistory();
    const userContext = useContext(UserContext);

    const { user_list, message, getUsers, selectUser, unselectUser, deleteUser, cleanError } = userContext;

    const [ modal, setModal] = useState({
        isOpen: false,
        image: null,
        alt: null
    });

    useEffect(() => {
        unselectUser();
        getUsers();
    }, []);

    useEffect(() => {
        if(message) {
            Swal.fire(message.title, message.message, message.type);
            cleanError();   
        }    
    }, [message]);



    const columns = [
        {
            name: "user_username",
            label: "Username",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "user_first_name",
            label: "First Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "user_last_name",
            label: "Last Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "user_email",
            label: "Email",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "user_image",
            label: "Photo",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "user_isadmin",
            label: "Type",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "user_id",
            label: "Options",
            options: {
                filter: false,
                sort: false
            }
        }
    ];

    const options = {
        responsive: "standard",
        filterType: 'checkbox',
        fixedHeader: true,
        selectableRows: "single",
        selectableRowsOnClick: true,
        selectableRowsHeader: true,
        customRowRender: (data, dataIndex, rowIndex) => {
            return (
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>{ data[0] }</TableCell>
                    <TableCell>{ data[1] }</TableCell>
                    <TableCell>{ data[2] }</TableCell>
                    <TableCell>{ data[3] }</TableCell>
                    <TableCell>
                        <Avatar className={classes.avatar} alt={data[0]} src={data[4]} onClick={() => { handleOpenModal(data[4], data[0]) }}/>
                    </TableCell>
                    <TableCell>{ data[5] === 1 ? "Admin" : "User" }</TableCell>
                    <TableCell>
                        <Tooltip title="Edit" placement="top">
                            <EditIcon className={classes.buttonIcon} onClick={() => onEdit(data[6])}/>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                            <DeleteIcon className={classes.buttonIcon} onClick={() => {onDelete(data[6], data[0])}}/>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            )
        }
    }

    const onEdit = id => {
        unselectUser();
        selectUser(id);
        history.push("/edit-user");
    }

    const onDelete = (id, name) => {
        Swal.fire({
            title: `Are you sure you want to delete ${name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id);
            }
          });
    }

    const handleOpenModal = (image, alt) => {
        setModal({
            isOpen: true,
            image,
            alt
        });
    };
    
      const handleCloseModal = () => {
        setModal({
            isOpen: false,
            image: null
        });
    };


    return ( 
        <div className={classes.root}>
            <CssBaseline />
            <Navbar/> 
            <Sidebar
                username="User"
            />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Modal
                        open={modal.isOpen}
                        onClose={handleCloseModal}
                    >
                        <div className={classes.imageModal}>
                            <img alt={modal.alt} src={modal.image}/>
                        </div>
                    </Modal>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <MUIDataTable
                                title={<Title>Users</Title>}
                                data={user_list}
                                columns={columns}
                                options={options}
                            />
                        </Grid>
                        
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
 
export default UserList;