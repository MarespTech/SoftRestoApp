import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, useHistory } from "react-router-dom"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, Paper, Button, TextField, Avatar, IconButton } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { blue } from '@material-ui/core/colors';

import AuthContext from '../context/auth/authContext';
import UserContext from '../context/user/userContext';

const useStyles = makeStyles( theme => ({
    bg: {
        height: "100vh",
        padding: "15px 20px",
        margin: 0
    },
    bgRedGrad: {
        backgroundImage: "linear-gradient(180deg, #ee8282 10%, #be2222 100%)!important",
    },
    bgBlueGrad: {
        backgroundImage: "linear-gradient(180deg, #4e73df 10%, #224abe 100%)!important",
    },
    bgYellowGrad: {
        backgroundImage: "linear-gradient(180deg, #ffff99 10%, #ff9933 100%)!important",
    },
    bgImage: {
        backgroundImage: "url(register-bg.jpg)",
        backgroundSize: "cover"
    },
    paper: {
        padding: theme.spacing(2),
        width: "90%",
        height: "630px",
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        margin: "20px auto 0",
        borderRadius: 15,

        [theme.breakpoints.up('md')]: {
            width: "80%"
        }
    },
    title: {
        fontSize: 56,
        color: "white",
        textAlign: "center",
        margin: "5px auto 0",
        fontFamily: "'Lobster', cursive",
        [theme.breakpoints.up('md')]: {
            fontSize: 64,
        }
    },
    formBox: {
        width: "100%",
        height: "90%",
        backgroundColor: "rgba(255,255,255, 0.7)",
        margin: "0 auto",
        padding: "10px",
        borderRadius: 10,
        [theme.breakpoints.up('md')]: {
            width: "65%",
            height: "85%",
            padding: "45px 60px 15px",
        }
    },
    input: {
        width: "100%",
        margin: "5px auto 8px",

        '& label': {
            fontWeight: "bold",
            color: "black"
        },

        '& fieldset': {
            border: "2px solid black",
            borderRadius: "10px"
        }
    },
    button: {
        width: "100%",
        backgroundColor: blue[500],
        color: "white",
        fontWeight: "bold",

        '&:hover': {
            backgroundColor: blue[600]
        }
    },
    image: {
        width: "70%",
        height: "70%",
        maxWidth: "260px",
        maxHeight: "260px",
        margin: "auto 0",
        float: "right"
    },

    avatar: {
        width: 100,
        height: 100,
        cursor: "pointer"
    },
    inputMedia: {
        display: "none"
    },
    labelImage: {
        fontSize: 16,
        marginLeft: theme.spacing(1)
    },

    goLogin: {
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 10,

        [theme.breakpoints.up("md")]: {
            marginTop: 20
        },

        "& a": {
            textDecoration: "none",
            color: blue[700]
        }
    },
}));

const Register = props => {

    const classes = useStyles();
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);

    const { authenticate, authenticateUser } = authContext;
    const { message, addUser, cleanError } = userContext;

    const [ user, saveUser ] = useState({
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

    const { user_username, user_email, user_password, user_password_2, user_first_name, user_last_name, user_image } = user;

    useEffect( () => {
        if(authenticate) props.history.push('/dashboard');

        const token = localStorage.getItem('token');
        if(token) authenticateUser();

        if(message) {
            let type = message.type;
            Swal.fire(message.title, message.message, message.type)
                .then( () => {
                    cleanError()
                    if(type === "success") history.push("/");
            });
        }
            
    }, [authenticate, props.history, message]);


    const handleChange = e => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeImage = e => {
        saveUser({
            ...user,
            user_image: URL.createObjectURL(e.target.files[0]),
            user_image_media: e.target.files[0]
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        console.log(user_username);
        if(user_username.trim() === '') return Swal.fire("Error", "The username is required", "error");
        if(user_email.trim() === '') return Swal.fire("Error", "The email is required", "error");
        if(user_first_name.trim() === '' || user_last_name.trim() === '') return Swal.fire("Error", "Your name is required", "error");
        if(user_password.trim() === '') return Swal.fire("Error", "The password is required", "error");
        if(user_password_2.trim() === '') return Swal.fire("Error", "You have to repeat your password", "error");
        if(user_password !== user_password_2) return Swal.fire("Error", "Passwords don't match", "error");

        addUser(user);
    }

    return ( 
        <div className={clsx(classes.bgYellowGrad, classes.bg)}>
            <CssBaseline />
            <Paper className={clsx(classes.paper, classes.bgImage)}>
                <h2 className={classes.title}>Register</h2>
                <form 
                    onSubmit={handleSubmit}
                    className={classes.formBox} 
                    noValidate 
                    autoComplete="off"
                >
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={4}>
                            <TextField
                                label="Username"
                                id="user_username"
                                name="user_username"
                                helperText="Required"
                                value={user_username}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                label="First Name"
                                id="user_first_name"
                                name="user_first_name"
                                helperText="Required"
                                value={user_first_name}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                label="Last Name"
                                id="user_last_name"
                                name="user_last_name"
                                helperText="Required"
                                value={user_last_name}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField
                                label="Email"
                                id="user_email"
                                name="user_email"
                                helperText="Required"
                                value={user_email}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={6} md={4}>
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

                        <Grid item xs={6} md={4}>
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

                        <Grid item xs={6} md={6}>
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
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Avatar 
                                className={classes.image} 
                                alt={user_username} 
                                src={user_image}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <Button 
                            type="submit"
                            variant="contained" 
                            size="large" 
                            className={classes.button}
                        >
                            Register
                        </Button>
                        </Grid>
                    </Grid>
                    
                    <div className={classes.goLogin}>
                        <span>You already have an account? <Link to="/">Go to login</Link></span>
                    </div>
                </form>
            </Paper>
        </div>    
    );
}
 
export default Register;