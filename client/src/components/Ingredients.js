import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, amber } from '@material-ui/core/colors';
import { Container, Paper, Grid, Button, TextField, TableCell, TableRow, Tooltip, Avatar } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import IngredientContext from '../context/ingredient/ingredientContext';

import Navbar from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import Title from './includes/Title';

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

const ingredientList = [
    {
        ingredient_name: "Zanahoria",
        ingredient_stock: 20,
        ingredient_min_stock: 5,
        ingredient_max_stock: 50,
        ingredient_point_reorder: 10,
        ingredient_image: "/uploads/no-image.jpg",
        ingredient_image_media: null
    },
    {
        ingredient_name: "Manzana",
        ingredient_stock: 50,
        ingredient_min_stock: 10,
        ingredient_max_stock: 100,
        ingredient_point_reorder: 15,
        ingredient_image: "/uploads/no-image.jpg",
        ingredient_image_media: null
    }
]

const Ingredients = () => {
    const classes = useStyles();
    const ingredientContext = useContext(IngredientContext);

    const { ingredient_list, message, getIngredients, addIngredient, editIngredient, deleteIngredient, cleanError } = ingredientContext

    const [ ingredient, saveIngredient ] = useState({
        ingredient_name: "",
        ingredient_stock: 0,
        ingredient_min_stock: 0,
        ingredient_max_stock: 1000,
        ingredient_point_reorder: 0,
        ingredient_image: "/uploads/no-image.jpg",
        ingredient_image_media: null 
    });
    const [ editMode, saveEditMode ] = useState(false);

    useEffect(() => {
        if(message) {
            
            }
            cleanError();
    }, [message]);

    const { ingredient_name, ingredient_stock, ingredient_min_stock, ingredient_max_stock, ingredient_point_reorder, ingredient_image_src } = ingredient;

    const columns = [
        {
            name: "ingredient_name",
            label: "Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "ingredient_stock",
            label: "Stock",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "ingredient_min_stock",
            label: "Min Stock",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "ingredient_max_stock",
            label: "Max Stock",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "ingredient_point_reorder",
            label: "Reorder Point",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "ingredient_image_src",
            label: "Image",
            options: {
                filter: false,
                sort: false
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
        filterType: 'checkbox',
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
                    <TableCell>{ data[3] }</TableCell>
                    <TableCell>{ data[4] }</TableCell>
                    <TableCell>
                        <Avatar alt={data[0]} src={data[5]} />
                    </TableCell>
                    <TableCell>
                        <Tooltip title="Edit" placement="top">
                            <EditIcon className={classes.buttonIcon} onClick={() => onEdit(data[6])}/>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                            <DeleteIcon className={classes.buttonIcon} onClick={() => {onDelete(data[6], data[0])}}/>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            )
        }
    }

    const handleChange = e => {
        e.preventDefault();

        saveIngredient({
            ...ingredient,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(ingredient_name.trim() === "") {
            return Swal.fire("Error", "Name is required", "error");
        }

        // if(!editMode) addCategory(category);
        // else editCategory(category);
    }

    const onEdit = id => {
        // saveCategory(category);
        saveEditMode(true);
    }

    const onDelete = (id, name) => {
        Swal.fire({
            title: `Are you sure you want to delete ${name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                // deleteCategory(id);
            }
          });
    }

    const cancelEdition = () => {
        saveIngredient({ 
            ingredient_name: "",
            ingredient_stock: 0,
            ingredient_min_stock: 0,
            ingredient_max_stock: 1000,
            ingredient_point_reorder: 0,
            ingredient_image: "/uploads/no-image.jpg",
            ingredient_image_media: null 
        });
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
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Paper className={classes.paper}>
                                <Title>
                                    { !editMode ? "Add" : "Edit" } Ingredient 
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
                                        id="ingredient_name"
                                        name="ingredient_name"
                                        helperText="Required"
                                        value={ingredient_name}
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

                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <MUIDataTable
                                title={<Title>Ingredients</Title>}
                                data={ingredientList}
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

export default Ingredients;