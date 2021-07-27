import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import Title from '../includes/Title';

const useStyles = makeStyles( theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    customTableHead: {
        fontWeight: "bold"
    }
}));

const DashboardHistorial = ({ordersHistorial}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Title>Recent Orders</Title>
            <Table  size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.customTableHead}>Date</TableCell>
                        <TableCell className={classes.customTableHead}>Order</TableCell>
                        <TableCell className={classes.customTableHead}>Payment Method</TableCell>
                        <TableCell className={classes.customTableHead}>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ordersHistorial.map( row => (
                            <TableRow key={row.order_historial_id}>
                                <TableCell>{row.order_historial_date} {row.order_historial_time}</TableCell>
                                <TableCell>
                                    <ul>
                                        {row.meals.map( meal => (
                                            <li>{meal}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>{row.order_historial_payment}</TableCell>
                                <TableCell>${row.order_historial_amount}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="/sells-historial">
                    See more orders
                </Link>
            </div>
        </Fragment> 
    )
}
 
export default DashboardHistorial;