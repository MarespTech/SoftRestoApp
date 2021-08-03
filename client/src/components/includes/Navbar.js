import React, { useState, Fragment, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { Link, useHistory } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Badge, 
         MenuItem, Menu, Avatar, Divider } from "@material-ui/core";
import { lightBlue, green } from '@material-ui/core/colors';

import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

import MobileSidebar from './MobileSidebar';
import CustomMenuItem from './CustomMenuItem';

import AlertsContext from '../../context/alerts/alertsContext';
import UserContext from '../../context/user/userContext';
import AuthContext from '../../context/auth/authContext';

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
    buttonMenu: {
      marginRight: theme.spacing(2),
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    logo: {
        color: "white",
        textDecoration: "none"
    },
    links: {
        color: "black",
        textDecoration: "none"
    },
    iconLinks: {
        color: "white",
        textDecoration: "none",
        marginRight: 2
    },
    viewMore: {
        textAlign: "center",
        padding: "10px 8px 0",
        "& a": {
            textDecoration: "none",
            color: theme.palette.primary.main
        }
    },
    noAlerts: {
        textAlign: "center",
        padding: "8px 10px"
    },
    green: {
        color: theme.palette.getContrastText(green[600]),
        backgroundColor: green[600],
    },
  }));

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();

    const alertsContext = useContext(AlertsContext);
    const userContext = useContext(UserContext);
    const authContext = useContext(AuthContext);

    const { notifications_navbar, messages_navbar, getNotificationsForNavbar, markMessageAsSeen } = alertsContext;
    const { selectUser } = userContext;
    const { user, logout } = authContext;


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isMessagesOpen, setIsMessagesOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState();

    useEffect(() => {
        getNotificationsForNavbar();
    }, []);
    
    const editProfile = () => {
        selectUser(user.user_id);
        history.push("/edit-user");
    }

    return (
        <Fragment>
            <AppBar position="absolute" className={classes.customNavbar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        className={classes.buttonMenu}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.title}>
                        <Link to="/" className={classes.logo}>SoftResto</Link>
                    </Typography>
                    
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton 
                            aria-label="show 4 new mails" 
                            color="inherit" 
                            edge="end"
                            aria-controls='primary-messages-menu'
                            aria-haspopup="true"
                            onClick={e => {setIsMessagesOpen(e.currentTarget); setAnchorEl(e.currentTarget);}}
                            className={classes.iconLinks}
                        >
                            { messages_navbar 
                                ?
                                <Badge badgeContent={messages_navbar.length} color="secondary">
                                    <MailIcon />
                                </Badge>
                                :
                                <MailIcon />
                            }
                        </IconButton>
                        <IconButton 
                            aria-label="show 17 new notifications" 
                            color="inherit"
                            edge="end"
                            aria-controls='primary-notifications-menu'
                            aria-haspopup="true"
                            onClick={e => {setIsNotificationsOpen(e.currentTarget); setAnchorEl(e.currentTarget);}}
                            className={classes.iconLinks}
                        >
                            {
                                notifications_navbar.length > 0
                                ?
                                <Badge badgeContent={notifications_navbar.length} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                                :
                                <NotificationsIcon />
                            }
                        </IconButton>
                        
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
                
                {/* Messages menu */}
                <Menu
                    isMenuOpen={isMessagesOpen}
                    id='primary-messages-menu'
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    keepMounted
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={isMessagesOpen}
                    onClose={() => setIsMessagesOpen(false)}
                >
                    {
                        messages_navbar.length > 0
                        ?
                            messages_navbar.map( item => (
                                <CustomMenuItem
                                    key={`mes${item.message_id}`}
                                    type="message"
                                    message={`New message: "${item.message_title}"`}
                                    from={item.message_from}
                                    id={item.message_id}
                                    date={item.message_date}
                                    markMessageAsSeen={markMessageAsSeen}
                                />    
                            ))
                        : 
                            <>
                                <div className={classes.noAlerts}>
                                    <span>There's no messages</span>
                                </div>
                                <Divider/>
                            </>
                    }
                    <div className={classes.viewMore}>
                        <Link to="/messages">View all messages</Link>
                    </div>
                </Menu>             
                
                {/* Notifications menu */}
                <Menu
                    isMenuOpen={isNotificationsOpen}
                    id='primary-notifications-menu'
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    keepMounted
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    className={classes.menuNotifications}
                    open={isNotificationsOpen}
                    onClose={() => setIsNotificationsOpen(false)}
                >
                        {
                            notifications_navbar.length > 0 
                            ?
                                notifications_navbar.map( item => (
                                    <CustomMenuItem
                                        key={`ing${item.ingredient_id}`}
                                        type="notification"
                                        message={`${item.ingredient_name} ${item.message}`}
                                    />    
                                ))
                            : 
                                <div className={classes.noAlerts}>
                                    <span>There's no notifications</span>
                                </div>
                        }
                </Menu>

                {/* Account menu */}
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
                    <MenuItem onClick={editProfile}>Profile</MenuItem>
                    <MenuItem onClick={logout}>Log Out</MenuItem>
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