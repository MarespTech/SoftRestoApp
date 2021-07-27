import React, { useState, Fragment, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Badge, 
         MenuItem, Menu, Avatar } from "@material-ui/core";
import { lightBlue, green } from '@material-ui/core/colors';

import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

import MobileSidebar from './MobileSidebar';

import AlertsContext from '../../context/alerts/alertsContext';

const useStyles = makeStyles((theme) => ({
    customNavbar: {
        color: "#FFF",
        backgroundColor: lightBlue[600],
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
        paddingRight: 24, 
    },
    title: {
        flexGrow: 1,
        fontFamily: "'Lobster', cursive",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    links: {
        color: "black",
        textDecoration: "none"
    },
    iconLinks: {
        color: "white",
        textDecoration: "none"
    },
    green: {
        color: theme.palette.getContrastText(green[600]),
        backgroundColor: green[600],
    },
  }));

const Navbar = () => {
    const classes = useStyles();
    const alertsContext = useContext(AlertsContext);

    const { notifications_navbar, messages_navbar, getNotificationsForNavbar } =alertsContext;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState();

    useEffect(() => {
        getNotificationsForNavbar();
    }, []);
    
    const logOut = () => {
        console.log("Log Out");
    }

    return (
        <Fragment>
            <AppBar position="absolute" className={classes.customNavbar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
                        SoftResto
                    </Typography>
                    
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Link to="/mails" className={classes.iconLinks}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                { messages_navbar 
                                    ?
                                    <Badge badgeContent={messages_navbar.length } color="secondary">
                                        <MailIcon />
                                    </Badge>
                                    :
                                    <MailIcon />
                                }
                            </IconButton>
                        </Link>
                        <Link to="/notifications" className={classes.iconLinks}>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                {
                                    notifications_navbar && notifications_navbar.ingredientsiLowStock && notifications_navbar.ingredientsNoStock && notifications_navbar.ingredientsLowReorderPoint
                                    ?
                                    <Badge badgeContent={notifications_navbar.ingredientsiLowStock.length + notifications_navbar.ingredientsNoStock.length + notifications_navbar.ingredientsLowReorderPoint.length} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                    :
                                    <NotificationsIcon />
                                }
                            </IconButton>
                        </Link>
                        
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls='primary-search-account-menu'
                            aria-haspopup="true"
                            onClick={e => {setIsMenuOpen(e.currentTarget); setAnchorEl(e.currentTarget);}}
                            color="inherit"
                        >
                            <Avatar className={classes.green}>U</Avatar>
                        </IconButton>
                        
                    </div>
                </Toolbar>

                <Menu
                    isMenuOpen={isMenuOpen}
                    id='primary-search-account-menu'
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    keepMounted
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                >
                    <MenuItem>
                        <Link to="/my-profile" className={classes.links}>Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={logOut}>Log Out</MenuItem>
                </Menu>
                <MobileSidebar 
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    username="User"
                />
            </AppBar>
            
                
            

        </Fragment>
    );
}
 
export default Navbar;