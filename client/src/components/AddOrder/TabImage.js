import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Grid, Box, Tooltip, TextField,
         ImageList, ImageListItem, 
         ImageListItemBar, IconButton  } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: "100%",
      height: 450,
      padding: "20px",

      '& li': {
        [theme.breakpoints.down('xs')]: {
            width: "100%!important"
        }
    }
    },
    icon: {
        marginTop: 7,
        color: 'rgba(255, 255, 255, 0.54)',
        transition: "all .1s ease-in-out",

        '&:hover': {
            color: blue[700]
        }
    },
    image: {
        width: "100%",
        height: "100%"
    },
    flexDiv: {
        display: "flex"
    },
    input: {
        width: 50,
    
        '& input': {
            backgroundColor: "white",
            padding: "5px 8px"
        },

        '& label': {
            color: "white",
            fontWeight: "bold"
        }
    },
}));

const TabImage = (props) => {
    const classes = useStyles();
    const { children, value, index, data, addMeal, ...other } = props;

    const [ order, saveOrder ] = useState({
        quantity: 0,
        meal: null
    });
    
    return ( 

        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
            
                <Box p={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {
                                data 
                                ?
                                    (
                                        
                                        <div className={classes.root}>
                                            <ImageList rowHeight={180} className={classes.imageList}>
                                                {data.map((item) => (
                                                <ImageListItem key={item.meal_image}>
                                                    <img className={classes.image} src={item.meal_image} alt={item.meal_name} />
                                                    <ImageListItemBar
                                                        title={item.meal_name}
                                                        subtitle={<span>${item.meal_cost}</span>}
                                                        actionIcon={
                                                            <div className={classes.flexDiv}>
                                                                <TextField
                                                                    className={classes.input}
                                                                    type="number"
                                                                    name="quantity"
                                                                    label="Quantity"
                                                                    id={`quantity${item.meal_id}`}
                                                                    defaultValue={0}
                                                                    onChange={e => {
                                                                        saveOrder({
                                                                            quantity: e.target.value,
                                                                            meal: item
                                                                        });
                                                                    }}
                                                                />
                                                                <Tooltip title="Add to order" placement="top" arrow> 
                                                                    <IconButton 
                                                                        aria-label={`info about ${item.meal_name}`} 
                                                                        className={classes.icon}
                                                                        onClick={() => {
                                                                            addMeal({
                                                                                quantity: parseInt(document.getElementById(`quantity${item.meal_id}`).value),
                                                                                meal: item
                                                                            });

                                                                            document.getElementById(`quantity${item.meal_id}`).value = 0;
                                                                        }}
                                                                    >
                                                                        <AddCircleIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </div>
                                                        }
                                                    />
                                                </ImageListItem>
                                                ))}
                                            </ImageList>
                                        </div>

                                    )
                                :
                                    null
                            } 
                        </Grid>                        
                    </Grid>
                </Box>
            )}
        </div>
    );
}
 
export default TabImage;