import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { Divider, Tooltip } from "@material-ui/core";
import { blueGrey } from '@material-ui/core/colors';

import WarningIcon from '@material-ui/icons/Warning';
import MessageIcon from '@material-ui/icons/Message';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    menuItem: {
        padding: "5px 10px",
        display: "flex",
        alignItems: "center",
    },
    message: {
        marginLeft: 15
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
        "&:hover": {
            color: blueGrey[900]
        }
    },
    messageFrom: {
        textAlign: "right",
        fontSize: 12
    }
}));

const CustomMenuItem = ({ type, message, from, id, date, markMessageAsSeen }) => {
    const classes = useStyles();

    const formatDate = date => {
        const newDate = new Date(date);

        return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
    }

    return ( 
        <>
            { type === 'notification' 
                ?
                    <div>
                        <div className={classes.menuItem}>
                            <WarningIcon/>
                            <span className={classes.message}>{ message }</span>
                        </div>
                        <Divider/>
                    </div>
                : 
                    <div>
                        <div className={clsx(classes.menuItem, { justifyContent: "space-evenly" })}>
                            <MessageIcon/>
                            <div className={classes.message}>
                                <div className={classes.bodyDiv}>
                                    <div>
                                        <span >{ message }</span>
                                    </div>
                                    <div onClick={() => markMessageAsSeen(id)}>
                                        <Tooltip title="Mark as Seen" placement="top" arrow>
                                            <FiberManualRecordIcon className={classes.seenButton}/>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className={ clsx(classes.messageFrom, classes.bodyDiv)}>
                                    <span>{ formatDate(date) }</span>
                                    <span>From: {from}</span>
                                </div>
                            </div>
                        </div>
                        <Divider/>
                    </div>
            }
        </>
     );
}
 
export default CustomMenuItem;