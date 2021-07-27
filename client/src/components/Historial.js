import React, { useEffect, useContext } from 'react';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { yellow } from '@material-ui/core/colors';
import { Container, Grid, TableCell, TableRow } from '@material-ui/core';


import Navbar from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import Title from './includes/Title';

import OrderContext from '../context/order/orderContext';

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
}));

const Historial = () => {
    const classes = useStyles();
    const orderContext = useContext(OrderContext);

    const { ordersHistorial, getHistorialOrders } = orderContext;

    useEffect(() => {
        getHistorialOrders();
    }, []);

    const columns = [
        {
            name: "order_historial_id",
            label: "Order Number",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "order_historial_date",
            label: "Date",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "order_historial_time",
            label: "Time",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "meals",
            label: "Order",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "order_historial_payment",
            label: "Payment Method",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "order_historial_amount",
            label: "Total Amount",
            options: {
                filter: true,
                sort: true
            }
        }
    ];

    const options = {
        responsive: "standard",
        filterType: 'multiselect',
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
                    <TableCell>
                        <ul>
                            {data[3].map( meal => (
                                <li>{meal}</li>
                            ))}
                        </ul>
                    </TableCell>
                    <TableCell>{ data[4] }</TableCell>
                    <TableCell>{ data[5] }</TableCell>
                </TableRow>
            )
        }
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
                            <MUIDataTable
                                title={<Title>Historial</Title>}
                                data={ordersHistorial}
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

export default Historial;