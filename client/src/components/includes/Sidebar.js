import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Typography, Drawer, Box, List, ListItem, Divider } from "@material-ui/core";

import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AppsIcon from '@material-ui/icons/Apps';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LocalDiningIcon from '@material-ui/icons/LocalDining';

import AssessmentIcon from '@material-ui/icons/Assessment';
import ListIcon from '@material-ui/icons/List';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';

import AuthContext from '../../context/auth/authContext';


const useStyles = makeStyles((theme) => ({    
    titleSidebar: {
        textAlign: "center",
        fontWeight: "bold"
    },
    links: {
        color: "black",
        textDecoration: "none"
    },  
    iconAlign: {
        marginLeft: 160
    },
    listItem: {
        marginTop: 10
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 250,
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
      
  }));

const Sidebar = () => {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    return ( 

        <Drawer
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            open={true}
        >
            <Box 
                display="flex" 
                p={3}
                pt={11} 
                pb={1}
                justifyContent="space-between" 
                fontWeight={500}
            >
                <Typography>
                    <Box className={classes.titleSidebar}>
                        Hello { user ? `${user.user_first_name} ${user.user_last_name}` : "User" }
                    </Box>
                </Typography>
            </Box>

            <List className={classes.customSidebar}>
                <Link to="/" className={classes.links}>
                    <ListItem button className={classes.ListItem}>
                        <HomeIcon/>
                            <Box p={1} type="paragraph" color="inherit">Home</Box>
                    </ListItem>
                </Link>
                <Link to="/add-order" className={classes.links}>
                    <ListItem button className={classes.ListItem}>
                        <ListAltIcon/>
                            <Box p={1} type="paragraph" color="inherit">New Order</Box>
                    </ListItem>
                </Link>
                <Link to="/categories" className={classes.links}>
                    <ListItem button className={classes.ListItem}>
                        <AppsIcon/>
                            <Box p={1} type="paragraph" color="inherit">Categories</Box>
                    </ListItem>
                </Link>
                <Link to="/ingredients" className={classes.links}>
                    <ListItem button className={classes.ListItem}>
                        <KitchenIcon/>
                            <Box p={1} type="paragraph" color="inherit">Ingredients</Box>
                    </ListItem>
                </Link>
                <Link to="/meals" className={classes.links}>
                    <ListItem button className={classes.ListItem}>
                        <LocalDiningIcon/>
                            <Box p={1} type="paragraph" color="inherit">Meals</Box>
                    </ListItem>
                </Link>

                <Divider/>
                <Link to="/sells-report" className={classes.links}>
                    <ListItem button className={classes.ListItem}>
                        <AssessmentIcon/>
                        <Box p={1} type="paragraph" color="inherit">Sells Charts</Box>
                    </ListItem>
                </Link>
                <Link to="/sells-historial" className={classes.links}>
                    <ListItem button className={classes.ListItem}>
                        <ListIcon/>
                        <Box p={1} type="paragraph" color="inherit">Sells Historial</Box>
                    </ListItem>
                </Link>

                <Divider/>
                
                <a href="add-user" className={classes.links}>
                    <ListItem button className={classes.ListItem}>
                        <PersonAddIcon/>
                        <Box p={1} type="paragraph" color="inherit">Add User</Box>
                    </ListItem>
                </a>
                <Link to="/user-list" className={classes.links}>
                    <ListItem button className={classes.ListItem}>
                        <GroupIcon/>
                        <Box p={1} type="paragraph" color="inherit">User List</Box>
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    );
}
 
export default Sidebar;