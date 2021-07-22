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

// Generate Order Data
function createData(id, date, order, paymentMethod, amount) {
    return { id, date, order, paymentMethod, amount };
  }
  
  const rows = [
    createData(0, '21 July, 2021 15:00', ["2x Green Chilaquiles", "1x Coffee", "1x Orange Juice"], 'Credit Card', 200),
    createData(1, '21 July, 2021 14:30', ["1x Green Chilaquiles", "1x Scrumble Eggs", "2x Coffee"], 'Money', 215),
    createData(2, '21 July, 2021 13:42', ["2x Green Chilaquiles w/Chicken", "1x Grand Slam", "2x Orange Juice", "1x Chocomilk"], 'Money', 253),
    createData(3, '21 July, 2021 13:15', ["1x Grand Slam", "2x Omelette w/Cheese", "1x Pancakes", "3x Coffee", "1x Oreo Milkshake"], 'Credit Card', 654.39),
    createData(4, '21 July, 2021 13:00', ["1x Chilaquiles w/Chicken", "1x Orange Juice"], 'Money', 110),
  ];


const DashboardHistorial = () => {
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
                    {rows.map( row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>
                                <ul>
                                    {row.order.map( meal => (
                                        <li>{meal}</li>
                                    ))}
                                </ul>
                            </TableCell>
                            <TableCell>{row.paymentMethod}</TableCell>
                            <TableCell>${row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="/see-historial">
                    See more orders
                </Link>
            </div>
        </Fragment> 
    )
}
 
export default DashboardHistorial;