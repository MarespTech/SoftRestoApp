import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue } from '@material-ui/core/colors';
import { Container, Paper, Grid, Button, Tabs, Tab, Tooltip, FormControl, InputLabel, Select, MenuItem  } from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import MealContext from '../context/meal/mealContext';
import CategoryContext from '../context/category/categoryContext';
import OrderContext from '../context/order/orderContext';

import Navbar from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import Title from './includes/Title';
import TabImage from './AddOrder/TabImage';

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
    title: {
        marginTop: 10
    },

    button: {
        float: "right",
        margin: "15px 0",
        fontWeight: "bold",
        color: "white",
        backgroundColor: blue[600],
        "&:hover": {
            backgroundColor: blue[700]
        }
    },
    buttonIcon: {
        cursor: "pointer",
        color: "#b5b5b5",
        margin: "auto 3px",
        fontSize: "22px",
    },
    
    image: {
        width: "100%",
        height: "100%",
        maxWidth: "260px",
        maxHeight: "260px",
        margin: "auto 0"
    },
    flexDiv: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 16
    },
    rightAlign: {
        textAlign: "right",
        marginRight: 20
    },
    formControl: {
        width: "100%"
    }
}));

const AddOrder = () => {

    const classes = useStyles();
    const mealContext = useContext(MealContext);
    const categoryContext = useContext(CategoryContext);
    const orderContext = useContext(OrderContext);

    const { meal_list, getMeals } = mealContext;
    const { category_list, getCategories } = categoryContext;
    const { addOrder, message, cleanError } = orderContext;

    const [ value, setValue ] = useState(0);
    const [ order, saveOrder ] = useState([]);
    const [ payment, savePayment ] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getMeals();
        getCategories();
    }, []);

    useEffect(() => {
        if(message) {
            Swal.fire(message.title, message.message, message.type);
            if(message.type === "success") {
                savePayment(0);
                saveOrder([]);
            }
            cleanError();   
        }    
    }, [message]);

    
    const formOrder = () => {
        return (
            <div>
                <h3 className={classes.rightAlign}>Total: ${getTotal()}</h3>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="payment_method">Payment Method</InputLabel>
                                <Select
                                    labelId="payment_method"
                                    id="meal_category"
                                    name="meal_category"
                                    value={payment}
                                    onChange={e => {
                                        savePayment(e.target.value)
                                    }}
                                >
                                    <MenuItem value={0} disabled>
                                        <em>Select Payment</em>
                                    </MenuItem>
                                    <MenuItem value="Money">
                                        <em>Money</em>
                                    </MenuItem>
                                    <MenuItem value="Debit Card">
                                        <em>Credit Card</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="submit" variant="contained" className={classes.button}>
                                Add Order
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
    
    const getTabs = () => {
        const tabs = [];
        let i = 0;

        category_list.forEach( category => {
            tabs.push(
                <TabImage 
                    value={value} 
                    index={i} 
                    key={category.category_id} 
                    data={ meal_list.filter( meal => meal.meal_category === category.category_id ) }
                    addMeal={addMeal}
                />
            );
            i++;
        });

        return tabs;
    }

    const addMeal = item => {
        if(item.quantity === 0) return Swal.fire("Error", "You have to enter quantity", "error");
        const newOrder = [];
        let repeatItem = 0;
        order.forEach( itemCurrentOrder => {
            if(itemCurrentOrder.meal.meal_id === item.meal.meal_id ) {
                newOrder.push({
                            quantity: itemCurrentOrder.quantity + item.quantity,
                            meal: itemCurrentOrder.meal
                });
                repeatItem = 1;
            } else {
                newOrder.push(itemCurrentOrder);
            }    
        });

        if(repeatItem === 0) {
            newOrder.push(item);
        }
        saveOrder(newOrder);
    }

    const cancelMeal = id => {
        saveOrder(order.filter( item => item.meal.meal_id !== id))
    }

    const getTotal = () => {
        let total = 0;

        order.forEach( item => {
            total += item.quantity * item.meal.meal_cost;
        });

        return total;
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(order.lenght === 0) return Swal.fire("There's no items", "At least one item is required", "warning");
        if(payment === 0) return Swal.fire("", "The payment method is required", "error");

        addOrder(order, payment);
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
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={10} lg={8}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="scrollable"
                                    centered
                                >
                                    { category_list.map( category => (
                                        <Tab label={category.category_name}/>
                                    )) }
                                </Tabs>
                                { getTabs().map( tab => tab) }
                            </Grid>

                            <Grid item xs={12} md={2} lg={4}>
                                <div className={classes.title}>
                                    <Title>Order</Title>
                                    <ul>
                                        {
                                            order.map( item => (
                                                <li className={classes.flexDiv} key={item.meal_id}>
                                                    <span>{item.quantity}x {item.meal.meal_name} - ${item.quantity*item.meal.meal_cost}</span>
                                                    <Tooltip title="Cancel meal" placement="top" onClick={() => cancelMeal(item.meal.meal_id)} arrow>
                                                        <CloseIcon className={classes.buttonIcon}/>
                                                    </Tooltip>
                                                </li>
                                            ))
                                        }
                                        {
                                            order.length > 0 
                                            ?
                                               formOrder()
                                            :
                                                null
                                        }
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </main>
        </div>
    );
}
 
export default AddOrder;