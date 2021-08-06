import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import AuthContext from '../context/auth/authContext';

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
        backgroundImage: "url(login-background.jpg)",
        backgroundSize: "cover"
    },
    paper: {
        padding: theme.spacing(2),
        width: "90%",
        height: "450px",
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        margin: "50px auto 0",
        borderRadius: 15,

        [theme.breakpoints.up('md')]: {
            height: "500px",
            width: "60%"
        }
    },
    title: {
        fontSize: 56,
        textAlign: "center",
        margin: "20px auto 0",
        fontFamily: "'Lobster', cursive",
        [theme.breakpoints.up('md')]: {
            fontSize: 64,
        }
    },
    formBox: {
        width: "100%",
        height: "75%",
        backgroundColor: "rgba(255,255,255, 0.7)",
        margin: "0 auto",
        padding: "10px",
        borderRadius: 10,
        [theme.breakpoints.up('sm')]: {
            width: "65%",
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
        marginTop: theme.spacing(4),
        backgroundColor: blue[500],
        color: "white",
        fontWeight: "bold",

        '&:hover': {
            backgroundColor: blue[600]
        }
    },
    register: {
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 10,

        [theme.breakpoints.up("md")]: {
            marginTop: 20
        },

        "& a": {
            textDecoration: "none",
            color: blue[700]
        }
    },
    forgotPassword: {
        textAlign: "right",
        fontWeight: "bold",
        marginTop: 3,

        "& a": {
            textDecoration: "none",
            color: blue[700]
        }
    }
}));

const Login = props => {

    const classes = useStyles();
    const authContext = useContext(AuthContext);

    const { authenticate, message, authenticateUser, login, cleanError } = authContext;

    const [ user, saveUser ] = useState({
        user_username: '',
        user_password: ''
    });

    useEffect( () => {
        if(authenticate) props.history.push('/dashboard');

        if(message) {
            Swal.fire(message.title, message.message, message.type);
            cleanError();
        }

        const token = localStorage.getItem('token');
        if(token) authenticateUser();
            
    }, [message, authenticate, props.history]);

    const { user_username, user_password } = user;

    const handleChange = e => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(user_username.trim() === "") return Swal.fire("The username is empty", "Username is required", "warning");
        if(user_password.trim() === "") return Swal.fire("The password is empty", "Password is required", "warning");

        login(user);
    }

    return ( 
        <div className={clsx(classes.bgYellowGrad, classes.bg)}>
            <CssBaseline />
            <Paper className={clsx(classes.paper, classes.bgImage)}>
                <h2 className={classes.title}>Welcome</h2>
                <form 
                    onSubmit={handleSubmit}
                    className={classes.formBox} 
                    noValidate 
                    autoComplete="off"
                >
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <TextField 
                                onChange={handleChange}
                                className={classes.input} 
                                name="user_username" 
                                label="Username" 
                                variant="outlined"    
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                onChange={handleChange}
                                type="password" 
                                className={classes.input} 
                                name="user_password" 
                                label="Password" 
                                variant="outlined"
                            />
                            <div className={classes.forgotPassword}>
                                <Link to="/">Forgot your password?</Link>
                                {/* <Link to="/forgotPassword">Forgot your password?</Link> */}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                        <Button 
                            type="submit"
                            variant="contained" 
                            size="large" 
                            className={classes.button}
                        >
                            Log in
                        </Button>
                        </Grid>
                    </Grid>
                    
                <div className={classes.register}>
                    <span>You don't have account? <Link to="/register">Create now!</Link></span>
                </div>
                </form>
            </Paper>
        </div>    
    );
}
 
export default Login;