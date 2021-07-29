import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid } from '@material-ui/core';

import Navbar from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import Title from './includes/Title';

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

const Template = () => {
    const classes = useStyles();

    useEffect(() => {
        
    }, []);

    // useEffect(() => {
    //     if(message) {
    //         Swal.fire(message.title, message.message, message.type);
    //         cleanError();   
    //     }
    // }, [message]);


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

                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default Template;