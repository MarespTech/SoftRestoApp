import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, amber } from '@material-ui/core/colors';
import { Container, Paper, Grid, Button, TextField, TableCell, TableRow, Tooltip } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import CategoryContext from '../context/category/categoryContext';

import Navbar from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import Title from './includes/Title';

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
    form: {
        '& .MuiTextField-root': {
          width: '100%',
        },
    },
    button: {
        width: "100%",
        margin: "8px 0",
        backgroundColor: blue[600],
        "&:hover": {
            backgroundColor: blue[700]
        }
    },
    buttonEdit: {
        width: "100%",
        margin: "8px 0",
        backgroundColor: amber[600],
        "&:hover": {
            backgroundColor: amber[700]
        }
    },
    buttonIcon: {
        cursor: "pointer",
        color: "#b5b5b5",
        margin: "auto 3px",
        fontSize: "20px"
    }

}));

const Categories = () => {
    const classes = useStyles();
    const categoryContext = useContext(CategoryContext);

    const { category_list, message, getCategories, addCategory, editCategory, deleteCategory, cleanError } = categoryContext

    const [ category, saveCategory ] = useState({ category_name: "" });
    const [ editMode, saveEditMode ] = useState(false);

    useEffect(() => {
        if(message) {
            Swal.fire(message.title, message.message, message.type);
            if(message.type === "success") {
                saveCategory({ category_name: "" });
                saveEditMode(false);
            }
            cleanError();
        }

        getCategories();
    }, [message]);

    const { category_name } = category;

    const columns = [
        {
            name: "category_name",
            label: "Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "category_id",
            label: "Options",
            options: {
                filter: false,
                sort: false
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
                    <TableCell>
                        <Tooltip title="Edit" placement="top">
                            <EditIcon className={classes.buttonIcon} onClick={() => onEdit({category_name: data[0], category_id: data[1]})}/>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                            <DeleteIcon className={classes.buttonIcon} onClick={() => {onDelete(data[1], data[0])}}/>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            )
        }
    }

    const handleChange = e => {
        e.preventDefault();

        saveCategory({
            ...category,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(category_name.trim() === "") {
            return Swal.fire("Error", "Name is required", "error");
        }

        if(!editMode) addCategory(category);
        else editCategory(category);
    }

    const onEdit = category => {
        saveCategory(category);
        saveEditMode(true);
    }

    const onDelete = (id, name) => {
        Swal.fire({
            title: `Are you sure you want to delete "${name}"?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteCategory(id);
            }
          });
    }

    const cancelEdition = () => {
        saveCategory({ category_name: "" });
        saveEditMode(false);
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
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                            <Paper className={classes.paper}>
                                <Title>
                                    { !editMode ? "Add" : "Edit" } Category 
                                    { !editMode 
                                                ? null 
                                                : <Tooltip title="Cancel Edition" placement="top">
                                                    <span className={classes.buttonIcon} onClick={cancelEdition}>
                                                        <HighlightOffIcon/>
                                                    </span>
                                                  </Tooltip>
                                    }
                                </Title>
                                <form 
                                    className={classes.form}  
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                >
                                    <TextField
                                        label="Name"
                                        id="category_name"
                                        name="category_name"
                                        helperText="Required"
                                        value={category_name}
                                        onChange={handleChange}
                                    />
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        size="large"
                                        className={ !editMode ? classes.button : classes.buttonEdit }
                                        startIcon={ !editMode ? <SaveIcon/> : <EditIcon/> }
                                    >
                                        { !editMode ? "Add" : "Edit" }
                                    </Button>
                                </form>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={12} md={9} lg={9}>
                            <MUIDataTable
                                title={<Title>Categories</Title>}
                                data={category_list}
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

export default Categories;