import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles( theme => ({
    title: {
        fontWeight: "bold",
        color: lightBlue[700]
    }
}));

const Title = (props) => {
    const classes = useStyles();

    return ( 
        <Typography component="h2" variant="h6" color="primary" className={classes.title} gutterBottom>
            {props.children}
        </Typography>
    );
}
 
export default Title;