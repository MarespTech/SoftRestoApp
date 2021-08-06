import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import  { useHistory  } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid, Paper, Button, Avatar, 
         TextField, IconButton, FormGroup,
         FormControlLabel, Switch   } from '@material-ui/core';
import { blue, amber } from '@material-ui/core/colors';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import Navbar from '../includes/Navbar';
import Sidebar from '../includes/Sidebar';
import Title from '../includes/Title';

import UserContext from '../../context/user/userContext';

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
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
    },
    buttonIcon: {
        cursor: "pointer",
        color: "#b5b5b5",
        margin: "auto 3px",
        fontSize: "26px"
    },
    
    image: {
        width: "100%",
        height: "100%",
        maxWidth: "260px",
        maxHeight: "260px",
        margin: "auto 0"
    },

    avatar: {
        width: 100,
        height: 100,
        cursor: "pointer"
    },

    // Form and inputs
    form: {
        '& .MuiTextField-root': {
        width: '100%',
        },
    },
    button: {
        float: "right",
        margin: "15px 0",
        backgroundColor: blue[600],
        "&:hover": {
            backgroundColor: blue[700]
        }
    },
    buttonEdit: {
        float: "right",
        margin: "15px 0",
        backgroundColor: amber[600],
        "&:hover": {
            backgroundColor: amber[700]
        }
    },
    inputDiv: {
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        }
    },
    inputMedia: {
        display: "none"
    },
    labelImage: {
        fontSize: 16,
        marginLeft: theme.spacing(1)
    },
    formControl: {
        width: "100%"
    },


}));

const UserForm = () => {
    const classes = useStyles();
    const history = useHistory();
    const userContext = useContext(UserContext);

    const { user_select, message, addUser, editUser, unselectUser, cleanError } = userContext;

    const [ editMode, saveEditMode ] = useState(false);

    const [ checked, setChecked ] = useState(false);
    const [ User, saveUser ] = useState({
        user_username: '',
        user_email: '',
        user_password: '',
        user_password_2: '',
        user_first_name: '',
        user_last_name: '',
        user_isadmin: 0,
        user_image: '/uploads/users/no-user-image.gif',
        user_image_media: null,
    });

    const { user_username, user_email, user_password, user_password_2, user_first_name, user_last_name, user_image } = User;

    useEffect(() => {

        if(user_select && window.location.pathname !== "/add-user") {
            saveEditMode(true);
            saveUser(user_select);

            if(user_select.user_isadmin === 1) setChecked(true);
        } else {
            unselectUser();
            saveUser({
                user_username: '',
                user_email: '',
                user_password: '',
                user_password_2: '',
                user_first_name: '',
                user_last_name: '',
                user_isadmin: 0,
                user_image: '/uploads/users/no-user-image.gif',
                user_image_media: null,
            })
        }

    }, []);

    useEffect(() => {
        if(message) {
            Swal.fire(message.title, message.message, message.type)
            .then(() => {
                cleanError();   
                history.push("/user-list");
            });
        }
    }, [message]);

    const handleSubmit = e => {
        e.preventDefault();

        if(user_username.trim() === '') return Swal.fire("Error", "The username is required", "error");
        if(user_email.trim() === '') return Swal.fire("Error", "The email is required", "error");
        if(user_first_name.trim() === '' || user_last_name.trim() === '') return Swal.fire("Error", "Your name is required", "error");
        if(user_password.trim() === '') return Swal.fire("Error", "The password is required", "error");
        if(user_password_2.trim() === '') return Swal.fire("Error", "You have to repeat your password", "error");
        if(user_password !== user_password_2) return Swal.fire("Error", "Passwords don't match", "error");

        if(!editMode) addUser(User);
        else editUser(User);
    }

    const handleChange = e => {
        saveUser({
            ...User,
            [e.target.name]: e.target.value
        });
    }

    const handleChecked = () => {
        setChecked((prev) => !prev);
        saveUser({
            ...User,
            user_isadmin: !checked ? 1 : 0
        });
    }

    const handleChangeImage = e => {
        saveUser({
            ...User,
            user_image: URL.createObjectURL(e.target.files[0]),
            user_image_media: e.target.files[0]
        });
    }


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
                    <Grid container spacing={2}>

                    <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Title>
                                    { !editMode ? "Add" : "Edit" } user
                                </Title>
                                <form 
                                    encType="multipart/form-data"
                                    className={classes.form}  
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                >
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Username"
                                                id="user_username"
                                                name="user_username"
                                                helperText="Required"
                                                value={user_username}
                                                onChange={handleChange}
                                                readOnly={user_select ? true : false}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                label="First Name"
                                                id="user_first_name"
                                                name="user_first_name"
                                                helperText="Required"
                                                value={user_first_name}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Last Name"
                                                id="user_last_name"
                                                name="user_last_name"
                                                helperText="Required"
                                                value={user_last_name}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Email"
                                                id="user_email"
                                                name="user_email"
                                                helperText="Required"
                                                value={user_email}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Password"
                                                type="password"
                                                id="user_password"
                                                name="user_password"
                                                helperText="Required"
                                                value={user_password}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Repeat Password"
                                                type="password"
                                                id="user_password_2"
                                                name="user_password_2"
                                                helperText="Required"
                                                value={user_password_2}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12} md={4}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Switch checked={checked} onChange={handleChecked} color="primary"/>}
                                                    label="Admin"
                                                />
                                            </FormGroup>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <input 
                                                accept="image/*" 
                                                className={classes.inputMedia} 
                                                id="icon-button-file" 
                                                type="file" 
                                                onChange={handleChangeImage}
                                            />
                                            <label htmlFor="icon-button-file">
                                                <IconButton color="primary" aria-label="upload picture" component="span" >
                                                    <PhotoCamera />
                                                    <span className={classes.labelImage}>Image</span>
                                                </IconButton>
                                            </label>

                                            <Avatar 
                                                className={classes.image} 
                                                alt={user_username} 
                                                src={user_image}
                                            />
                                        </Grid>

                                        

                                    </Grid>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        size="large"
                                        className={ !editMode ? classes.button : classes.buttonEdit }
                                        startIcon={ !editMode ? <SaveIcon/> : <EditIcon/> }
                                    >
                                        { !editMode ? "Add" : "Edit" }
                                    </Button>
                                </form>
                            </Paper>
                        </Grid>



                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default UserForm;