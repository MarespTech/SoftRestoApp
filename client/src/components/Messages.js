import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Grid, Paper, Divider, Tooltip } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { blueGrey, grey } from '@material-ui/core/colors';

import DeleteIcon from '@material-ui/icons/Delete';

import Navbar from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import Title from './includes/Title';

import AlertsContext from '../context/alerts/alertsContext';

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
    },

    menuItem: {
        padding: "15px 10px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: grey[200],
        }
    },
    bodyDiv: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    seenButton: {
        fontSize: 14,
        marginLeft: 20,
        cursor: "pointer",
        color: blueGrey[500],
        transition: "all 0.5s ease-in-out",
        "&:hover": {
            color: blueGrey[900],
            fontSize: 16
        }
    },
    messageFrom: {
        textAlign: "right",
        fontSize: 12
    },
    messageTitle: {
        fontWeight: "bold",
        marginBottom: 10
    },
    messageBody: {
        paddingTop: 5
    },

    fullMessageBody: {
        padding: theme.spacing(4)
    }



}));

const Messages = () => {
    const classes = useStyles();
    const alertsContext = useContext(AlertsContext);

    const { messages, message_selected, message, getMessages, selectMessage, markMessageAsSeen, deleteMessage, cleanError  } = alertsContext;

    useEffect(() => {
        getMessages();
    }, []);

    useEffect(() => {
        if(message) {
            Swal.fire(message.title, message.message, message.type);
            cleanError();   
        }
    }, [message]);

    const formatDate = date => {
        const newDate = new Date(date);

        return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
    }

    const deleteMessageConfirm = id => {
        Swal.fire({
            title: `Are you sure you want to delete this message?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteMessage(id);
            }
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
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={4} md={3} className={classes.rightLine}>            
                                    <div className={classes.messagesDiv}>
                                        <Title>Messages</Title>
                                        {
                                            messages.map( item => (
                                                <div>
                                                    <div 
                                                        className={clsx(classes.menuItem, { justifyContent: "space-between" })}
                                                        onClick={() => { markMessageAsSeen(item.message_id); selectMessage(item.message_id)}}
                                                    >
                                                        <div>
                                                            <div className={classes.bodyDiv}>
                                                                <div>
                                                                    <span className={classes.messageTitle}>{ item.message_title }</span>
                                                                </div>
                                                                { 
                                                                    item.message_seen === 0 
                                                                    ?
                                                                        <div 
                                                                            onClick={e => { e.stopPropagation(); markMessageAsSeen(item.message_id)}}
                                                                        >
                                                                            <Tooltip title="Mark as Seen" placement="top" arrow>
                                                                                <FiberManualRecordIcon className={classes.seenButton}/>
                                                                            </Tooltip>
                                                                        </div>
                                                                    :
                                                                        null
                                                                }
                                                            </div>
                                                            <div className={ clsx(classes.messageFrom, classes.bodyDiv)}>
                                                                <span>{ formatDate(item.message_date) }</span>
                                                                <span>From: {item.message_from}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Divider/>
                                                </div>
                                            ))
                                        }
                                    </div>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                    <div className={classes.fullMessageBody}>
                                        {
                                            message_selected 
                                            ?
                                                <>
                                                    <div className={classes.bodyDiv}>
                                                        <Title>{ message_selected.message_title }</Title>
                                                        <Tooltip title="Delete message" placement="top" arrow>
                                                            <DeleteIcon className={classes.buttonIcon} onClick={() => deleteMessageConfirm(message_selected.message_id)}/>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        Sent by <b>{message_selected.message_from}</b> - {formatDate(message_selected.message_date)}
                                                    </div>
                                                    <p className={classes.messageBody}>
                                                        {message_selected.message_body}
                                                        {/* {formatDate(message_selected.message_seen_date)} */}
                                                    </p>
                                                </>
                                            :
                                                null
                                        }
                                    </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </main>
        </div>
    );
}

export default Messages;