import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { yellow } from '@material-ui/core/colors';
import { Container, Paper, Grid, Typography, Link, Avatar } from '@material-ui/core';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

import Navbar from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import Title from './includes/Title';
import DashboardChart from './dashboard/DashboardChart';
// import DashboardChart2 from './dashboard/DashboardChart2';
import DashboardHistorial from './dashboard/DashboardHistorial';

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

const data = [
    {time: '09:00', amount: 30},
    {time: '10:00', amount: 300},
    {time: '11:00', amount: 600},
    {time: '12:00', amount: 500},
    {time: '13:00', amount: 150},
    {time: '14:00', amount: 200},
    {time: '15:00', amount: 240},
    {time: '16:00', amount: 200},
    {time: '17:00', amount: 50},
    {time: '18:00', amount: 190},
    {time: '19:00', amount: 400},
    {time: '20:00', amount: 120},
    {time: '21:00', amount: undefined},
  ];

const Dashboard = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightGraph = clsx(classes.paper, classes.graphHeigh);

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
                                    Green Chilaquiles
                                </Typography>
                                <Typography color="textSecondary" className={classes.depositContext}>
                                    on {getCurrentDate()}
                                </Typography>
                                <div className={classes.large}>
                                    <div className={classes.moreData}>
                                        <Typography component="p" variant="p">
                                            Times requested: 45 Times
                                        </Typography>
                                        <Typography component="p" variant="p">
                                            Total percentage: 45%
                                        </Typography>

                                    </div>
                                    <Avatar alt="Chilaquiles c/pollo" src="/uploads/meals/775-chilaquiles.jpg" className={classes.avatarLarge} />
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={fixedHeightPaper}>
                                <Title>Most rating meal</Title>
                                <Typography component="p" variant="h4">
                                    Double Cheeseburger
                                </Typography>
                                <div className={classes.large}>
                                    <div className={classes.moreData}>
                                        <Typography component="p" variant="p">
                                            Times requested: 23 Times
                                        </Typography>
                                        <Typography component="p" variant="p">
                                            Rate: 
                                            <StarIcon className={classes.rateIcon}/>
                                            <StarIcon className={classes.rateIcon}/>
                                            <StarIcon className={classes.rateIcon}/>
                                            <StarIcon className={classes.rateIcon}/>
                                            <StarHalfIcon className={classes.rateIcon}/>
                                            <small> (20 Rates)</small>
                                        </Typography>
                                    </div>
                                    <Avatar alt="Double Cheeseburger" src="/uploads/meals/2113412-cheeseburguer.jpg" className={classes.avatarLarge} />
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={3} lg={3}>
                            <Paper className={fixedHeightGraph}>
                                <Title>Today's Resume</Title>
                                <div className={classes.flexColumn}>
                                    <div>
                                        <Typography component="p" variant="h6">
                                            Sales: $3,024.00
                                        </Typography>
                                        <Typography component="p" variant="h6">
                                            Orders: 28
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography color="textSecondary" className={classes.depositContext}>
                                            on {getCurrentDate()}
                                        </Typography>
                                        <div>
                                            <Link color="primary" href="/sells-reports" >View historial</Link>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={9} lg={9}>
                            <Paper className={fixedHeightGraph}>
                                <DashboardChart 
                                    data={data}
                                />
                            </Paper>
                        </Grid>
                                                
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <DashboardHistorial/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
        );
}

export default Dashboard;