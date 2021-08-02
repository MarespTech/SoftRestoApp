import React, { useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { yellow } from '@material-ui/core/colors';
import { Container, Paper, Grid, Typography, Avatar } from '@material-ui/core';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

import Navbar from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import Title from './includes/Title';
import DashboardChart from './dashboard/DashboardChart';
import DashboardHistorial from './dashboard/DashboardHistorial';

import OrderContext from '../context/order/orderContext';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
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
    fixedHeight: {
        height: 250,
        [theme.breakpoints.down('md')]: {
            height: 300
        },
        [theme.breakpoints.down('sm')]: {
            height: 250
        }
    },
    graphHeigh: {
        height: 300,
    },

    // Image
    large: {
        width: "100%",
        height: "100%",
        margin: "auto",
        display: "flex",
        justifyContent: "space-between"
    },
    avatarLarge: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    moreData: {
        marginTop: theme.spacing(3),
        fontWeight: "bold",
        fontSize: 18,
    },
    seeMore: {
        marginTop: theme.spacing(3),
        "& a": {
            textDecoration: "none",
            color: theme.palette.primary.main
        }
    },
    flexColumn: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    rateIcon: {
        color: yellow[700]
    }

}));

const Dashboard = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightGraph = clsx(classes.paper, classes.graphHeigh);
    const orderContext = useContext(OrderContext);

    const { mealMostRequested, mealMostRating, todayOrders, ordersHistorial, chartDashboard, getDashboardData } = orderContext;

    useEffect(() => {
        getDashboardData();
    }, []);

    const getCurrentDate = () => {
        const today = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return ` ${today.getDate()} ${months[today.getMonth()]}, ${today.getFullYear()}`;
    }

    const convertStars = stars => {
        const starsHtml = [];
        let missStars = 5 - stars;
        for(let i = 1; i < stars; i++) {
            starsHtml.push(<StarIcon className={classes.rateIcon}/>);
        }

        if(stars%1 > 0) {
            starsHtml.push(<StarHalfIcon className={classes.rateIcon}/>);
        }

        for(let i = 1; i < missStars; i++) {
            starsHtml.push(<StarBorderIcon className={classes.rateIcon}/>);
        }

        if(missStars === 5) {
            starsHtml.push(<StarBorderIcon className={classes.rateIcon}/>);
        }

        return starsHtml;
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

                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaper}>
                                <Title>Most requested meal of the week</Title>
                                <Typography component="p" variant="h4">
                                    { mealMostRequested ? mealMostRequested.name : "No info" }
                                </Typography>
                                <Typography color="textSecondary" className={classes.depositContext}>
                                    on {getCurrentDate()}
                                </Typography>
                                <div className={classes.large}>
                                    <div className={classes.moreData}>
                                        <Typography component="p" variant="p">
                                            Times requested: {mealMostRequested ? mealMostRequested.times_requested : 0} Times
                                        </Typography>
                                        <Typography component="p" variant="p">
                                            Total percentage: { mealMostRequested ? mealMostRequested.times_requested_percent.toFixed(2) : 0 }%
                                        </Typography>

                                    </div>
                                    <Avatar 
                                        alt={ mealMostRequested ? mealMostRequested.name : "No info" } 
                                        src={ mealMostRequested ? mealMostRequested.image : "/uploads/no-image.jpg" } 
                                        className={classes.avatarLarge} 
                                    />
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaper}>
                                <Title>Most rating meal</Title>
                                <Typography component="p" variant="h4">
                                    { mealMostRating ? mealMostRating.name : "No info" }
                                </Typography>
                                <div className={classes.large}>
                                    <div className={classes.moreData}>
                                        <Typography component="p" variant="p">
                                            Times requested: { mealMostRating ? mealMostRating.times_requested : "No info" } Times
                                        </Typography>
                                        <Typography component="p" variant="p">
                                            Rate: 
                                            { mealMostRating ? convertStars(mealMostRating.rating) : convertStars(0) }
                                            <small> ({ mealMostRating ? mealMostRating.votes : 0 } Rates)</small>
                                        </Typography>
                                    </div>
                                    <Avatar 
                                        alt={ mealMostRating ? mealMostRating.name : "No info" }
                                        src={ mealMostRating ? mealMostRating.image : "/uploads/no-image.jpg" }
                                        className={classes.avatarLarge} 
                                    />
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={3} lg={3}>
                            <Paper className={fixedHeightGraph}>
                                <Title>Today's Resume</Title>
                                <div className={classes.flexColumn}>
                                    <div>
                                        <Typography component="p" variant="h6">
                                            Sales: ${ todayOrders.totalSales ? todayOrders.totalSales : 0}
                                        </Typography>
                                        <Typography component="p" variant="h6">
                                            Orders: { todayOrders.totalOrders ? todayOrders.totalOrders : 0 }
                                        </Typography>
                                        <Typography component="p" variant="h6">
                                            Meals: { todayOrders.total_meals ? todayOrders.total_meals : 0 }
                                        </Typography>
                                    </div>
                                    <div className={classes.seeMore}>
                                        <Typography color="textSecondary" className={classes.depositContext}>
                                            on {getCurrentDate()}
                                        </Typography>
                                        <div>
                                            <Link to="/sells-reports" >View historial</Link>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={9} lg={9}>
                            <Paper className={fixedHeightGraph}>
                                <DashboardChart 
                                    data={chartDashboard}
                                />
                            </Paper>
                        </Grid>
                                                
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <DashboardHistorial
                                    ordersHistorial={ordersHistorial}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
        );
}

export default Dashboard;