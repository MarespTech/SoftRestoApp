import React, { useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Paper, Grid, Tabs, Tab  } from '@material-ui/core';

import Navbar from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import TabPanel from './SellsCharts/TabPanel';

import OrderContext from '../context/order/orderContext';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
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
    graphHeigh: {
        height: '100%',
    },

    

}));

const SellsCharts = () => {
    const classes = useStyles();
    const fixedHeightGraph = clsx(classes.paper, classes.graphHeigh);
    const orderContext = useContext(OrderContext);

    const { charts, getCharts } = orderContext;

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        getCharts();
    }, []);


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
                    <Grid container spacing={1}>

                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={fixedHeightGraph}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                >
                                    <Tab label="Today" />
                                    <Tab label="Week" />
                                    <Tab label="Month" />
                                    <Tab label="Year" />
                                </Tabs>
                                <TabPanel value={value} index={0} data={charts.chartDataToday} pieData={charts.chartCatToday}>
                                    Today
                                </TabPanel>
                                <TabPanel value={value} index={1} data={charts.chartDataWeek} pieData={charts.chartCatWeek}>
                                    Week
                                </TabPanel>
                                <TabPanel value={value} index={2} data={charts.chartDataMonth} pieData={charts.chartCatMonth}>
                                    Month
                                </TabPanel>
                                <TabPanel value={value} index={3} data={charts.chartDataYear} pieData={charts.chartCatYear}>
                                    Year
                                </TabPanel>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
        );
}

export default SellsCharts;