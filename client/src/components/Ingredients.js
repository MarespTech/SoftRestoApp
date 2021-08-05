import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, amber } from '@material-ui/core/colors';
import { Container, Paper, Grid, Button, IconButton, TextField, TableCell, TableRow, Tooltip, Avatar, Modal } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import IngredientContext from '../context/ingredient/ingredientContext';

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
        margin: "15px 0",
        backgroundColor: blue[600],
        "&:hover": {
            backgroundColor: blue[700]
        }
    },
    buttonEdit: {
        width: "100%",
        margin: "15px 0",
        backgroundColor: amber[600],
        "&:hover": {
            backgroundColor: amber[700]
        }
    },
    buttonIcon: {
        cursor: "pointer",
        color: "#b5b5b5",
        margin: "auto 3px",
        fontSize: "26px"
    },
    inputDiv: {
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        }
    },
    inputMedia: {
        display: "none"
    },
    labelImage: {
        fontSize: 16,
        marginLeft: theme.spacing(1)
    },
    image: {
        width: "100%",
        height: "100%",
        maxWidth: "260px",
        maxHeight: "260px",
        margin: "auto 0"
    },

    avatar: {
        width: 100,
        height: 100,
        cursor: "pointer"
    },
    imageModal: {
        width: 300,
        height: 300,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        border: "none",
        borderRadius: 15,

        "& img": {
            width: "100%",
            height: "100%",
        }
    }

}));

const Ingredients = () => {
    const classes = useStyles();
    const ingredientContext = useContext(IngredientContext);

    const { ingredient_list, ingredient_selected,  message, getIngredients, selectIngredient, unselectIngredient, addIngredient, editIngredient, deleteIngredient, cleanError } = ingredientContext

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
    const [ modal, setModal] = React.useState({
        isOpen: false,
        image: null,
        alt: null
    });

    useEffect(() => {
        getIngredients();
    }, []);

    useEffect(() => {
        if(message) {
            Swal.fire(message.title, message.message, message.type);
            if(message.type === "success") {
                saveIngredient({ 
                    ingredient_name: "",
                    ingredient_measure: "",
                    ingredient_stock: 0,
                    ingredient_min_stock: 0,
                    ingredient_max_stock: 1000,
                    ingredient_point_reorder: 0,
                    ingredient_image: "/uploads/no-image.jpg",
                    ingredient_image_media: null
                });
                saveEditMode(false);
            }
            cleanError();   
        }
        
        if(ingredient_selected) {
            saveIngredient({
                ...ingredient_selected,
                ingredient_image_media: null
            });
        } else {
            saveIngredient({ 
                ingredient_name: "",
                ingredient_measure: "",
                ingredient_stock: 0,
                ingredient_min_stock: 0,
                ingredient_max_stock: 1000,
                ingredient_point_reorder: 0,
                ingredient_image: "/uploads/no-image.jpg",
                ingredient_image_media: null
            });
        }
        
    }, [message, ingredient_selected]);

    

    const { ingredient_name, ingredient_measure, ingredient_stock, ingredient_min_stock, ingredient_max_stock, ingredient_point_reorder, ingredient_image } = ingredient;

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
            name: "ingredient_measure",
            label: "Measure Unit",
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
            name: "ingredient_image",
            label: "Image",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "ingredient_id",
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
                    <TableCell>{ data[1] }</TableCell>
                    <TableCell>{ data[2] }</TableCell>
                    <TableCell>{ data[3] }</TableCell>
                    <TableCell>{ data[4] }</TableCell>
                    <TableCell>{ data[5] }</TableCell>
                    <TableCell>
                        <Avatar className={classes.avatar} alt={data[0]} src={data[6]} onClick={() => { handleOpenModal(data[6], data[0]) }}/>
                    </TableCell>
                    <TableCell>
                        <Tooltip title="Edit" placement="top">
                            <EditIcon className={classes.buttonIcon} onClick={() => onEdit(data[7])}/>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                            <DeleteIcon className={classes.buttonIcon} onClick={() => {onDelete(data[7], data[0])}}/>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            )
        }
    }

    const handleOpenModal = (image, alt) => {
        setModal({
            isOpen: true,
            image,
            alt
        });
    };
    
      const handleCloseModal = () => {
        setModal({
            isOpen: false,
            image: null
        });
    };

    const handleChange = e => {
        e.preventDefault();

        saveIngredient({
            ...ingredient,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeImage = e => {
        saveIngredient({
            ...ingredient,
            ingredient_image: URL.createObjectURL(e.target.files[0]),
            ingredient_image_media: e.target.files[0]
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(ingredient_name.trim() === "") {
            return Swal.fire("Error", "Name is required", "error");
        }
        if(ingredient_measure.trim() === "") {
            return Swal.fire("Error", "Measure Unit is required", "error");
        }

        if(!editMode) addIngredient(ingredient);
        else editIngredient(ingredient);
    }

    const onEdit = id => {
        selectIngredient(id);
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
                deleteIngredient(id);
            }
          });
    }

    const cancelEdition = () => {
        unselectIngredient();
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
                    <Modal
                        open={modal.isOpen}
                        onClose={handleCloseModal}
                    >
                        <div className={classes.imageModal}>
                            <img alt={modal.alt} src={modal.image}/>
                        </div>
                    </Modal>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
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
                                    encType="multipart/form-data"
                                    className={classes.form}  
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                >
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} lg={6}>
                                            <TextField
                                                label="Name"
                                                id="ingredient_name"
                                                name="ingredient_name"
                                                helperText="Required"
                                                value={ingredient_name}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} lg={6}>
                                            <TextField
                                                label="Measure"
                                                id="ingredient_measure"
                                                name="ingredient_measure"
                                                helperText="Required"
                                                value={ingredient_measure}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6} lg={6}>
                                            <TextField
                                                label="Stock"
                                                id="ingredient_stock"
                                                name="ingredient_stock"
                                                value={ingredient_stock}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12} sm={6} lg={6}>
                                            <TextField
                                                label="Reorder Point"
                                                id="ingredient_point_reorder"
                                                name="ingredient_point_reorder"
                                                value={ingredient_point_reorder}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12} sm={6} lg={6}>
                                            <TextField
                                                label="Min. Stock"
                                                id="ingredient_min_stock"
                                                name="ingredient_min_stock"
                                                value={ingredient_min_stock}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12} sm={6} lg={6}>
                                            <TextField
                                                label="Max. Stock"
                                                id="ingredient_max_stock"
                                                name="ingredient_max_stock"
                                                value={ingredient_max_stock}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <input 
                                                accept="image/*" 
                                                className={classes.inputMedia} 
                                                id="icon-button-file" 
                                                type="file" 
                                                onChange={handleChangeImage}
                                            />
                                            <label htmlFor="icon-button-file">
                                                <IconButton color="primary" aria-label="upload picture" component="span" >
                                                    <PhotoCamera />
                                                    <span className={classes.labelImage}>Image</span>
                                                </IconButton>
                                            </label>
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <Avatar className={classes.image} alt={ingredient_name} src={ingredient_image}/>
                                        </Grid>

                                    </Grid>
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
                                title={<Title>Ingredients</Title>}
                                data={ingredient_list}
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