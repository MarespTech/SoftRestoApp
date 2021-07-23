import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, amber, yellow } from '@material-ui/core/colors';
import { Container, Paper, Grid, Button, 
         IconButton, TextField, TableCell, 
         TableRow, Tooltip, Avatar, Select, 
         MenuItem, InputLabel, FormHelperText, 
         FormControl, Modal  } from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

import MealContext from '../context/meal/mealContext';
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

    // Form and inputs
    form: {
        '& .MuiTextField-root': {
          width: '100%',
        },
    },
    button: {
        float: "right",
        margin: "15px 0",
        backgroundColor: blue[600],
        "&:hover": {
            backgroundColor: blue[700]
        }
    },
    buttonEdit: {
        float: "right",
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
        fontSize: "20px"
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
    formControl: {
        width: "100%"
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
    rateIcon: {
        color: yellow[700],
        fontSize: 22,
        fontWeight: "bold",
        display: "inline"
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

const Meal = () => {

    const classes = useStyles();
    const mealContext = useContext(MealContext);
    const categoryContext = useContext(CategoryContext);

    const { meal_list, meal_selected,  message, getMeals, selectMeal, unselectMeal, addMeal, editMeal, deleteMeal, cleanError } = mealContext;
    const { category_list, getCategories } = categoryContext

    const [ meal, saveMeal ] = useState({
        meal_name: "",
        meal_cost: 0,
        meal_description: "",
        meal_category: 0,
        meal_image: "/uploads/no-image.jpg",
        meal_image_media: null,
        category_name: null
    });
    const [ editMode, saveEditMode ] = useState(false);
    const [ modal, setModal] = React.useState({
        isOpen: false,
        image: null,
        alt: null
    });

    useEffect(() => {
        getMeals();
        getCategories();
    }, []);

    useEffect(() => {
        if(message) {
            Swal.fire(message.title, message.message, message.type);
            if(message.type === "success") {
                saveMeal({ 
                    meal_name: "",
                    meal_cost: 0,
                    meal_description: "",
                    meal_image: "/uploads/no-image.jpg",
                    meal_image_media: null 
                });
                saveEditMode(false);
            }
            cleanError();   
        }
        
        if(meal_selected) {
            saveMeal({
                ...meal_selected,
                meal_image_media: null
            });
        } else {
            saveMeal({ 
                meal_name: "",
                meal_cost: 0,
                meal_description: "",
                meal_image: "/uploads/no-image.jpg",
                meal_image_media: null 
            });
        }
        
    }, [message, meal_selected]);

    

    const { meal_name, meal_cost, meal_description, meal_category, meal_image } = meal;

    const columns = [
        {
            name: "meal_name",
            label: "Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "meal_description",
            label: "Description",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "meal_cost",
            label: "Cost",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "category_name",
            label: "Category",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "meal_recipe",
            label: "Recipe",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "meal_rating",
            label: "Rating",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "meal_votes",
            label: "# Votes",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "meal_image",
            label: "Image",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "meal_id",
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
                    <TableCell>${ data[2] }</TableCell>
                    <TableCell>{ data[3] }</TableCell>
                    <TableCell>
                        { 
                            data[4] === 0 
                                ? <Tooltip title="Recipe not found" placement="top"><CancelIcon/></Tooltip>
                                : <Tooltip title="See Recipe" placement="top"><VisibilityIcon/></Tooltip>
                        }
                    </TableCell>
                    <TableCell>{ convertStars(data[5]) }</TableCell>
                    <TableCell>{data[6]} votes</TableCell>
                    <TableCell>
                        <Avatar className={classes.avatar} alt={data[0]} src={data[7]} onClick={() => { handleOpenModal(data[7], data[0]) }}/>
                    </TableCell>
                    <TableCell>
                        <Tooltip title="Edit" placement="top">
                            <EditIcon className={classes.buttonIcon} onClick={() => onEdit(data[8])}/>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                            <DeleteIcon className={classes.buttonIcon} onClick={() => {onDelete(data[8], data[0])}}/>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            )
        }
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

    const getCategoryName = id => {
        let category = category_list.filter( category => category.category_id === id)[0];

        return category ? category.category_name : "No Category"
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

        saveMeal({
            ...meal,
            [e.target.name]: e.target.value,
            category_name: getCategoryName(meal_category)
        });
    }

    const handleChangeImage = e => {
        saveMeal({
            ...meal,
            meal_image: URL.createObjectURL(e.target.files[0]),
            meal_image_media: e.target.files[0]
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(meal_name.trim() === "") {
            return Swal.fire("Error", "Name is required", "error");
        }
        if(meal_description.trim() === "") {
            return Swal.fire("Error", "Description is required", "error");
        }
        if(isNaN(meal_cost) || meal_cost === 0) {
            return Swal.fire("Error", "Cost is required and have to be a number", "error");
        }
        if(meal_category === 0) {
            return Swal.fire("Error", "Category is required", "error");
        }

        if(!editMode) addMeal(meal);
        else editMeal(meal);
    }

    const onEdit = id => {
        selectMeal(id);
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
                deleteMeal(id);
            }
          });
    }

    const cancelEdition = () => {
        unselectMeal();
        saveMeal({ 
            meal_name: "",
            meal_cost: 0,
            meal_description: "",
            meal_image: "/uploads/no-image.jpg",
            meal_image_media: null 
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
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Title>
                                    { !editMode ? "Add" : "Edit" } meal 
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
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Name"
                                                id="meal_name"
                                                name="meal_name"
                                                helperText="Required"
                                                value={meal_name}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="meal_category_label">Category</InputLabel>
                                                <Select
                                                labelId="meal_category_label"
                                                id="meal_category"
                                                name="meal_category"
                                                value={meal_category}
                                                onChange={handleChange}
                                                >
                                                <MenuItem value={0} disabled>
                                                    <em>Select Category</em>
                                                </MenuItem>
                                                {
                                                    category_list.map( category => (
                                                        <MenuItem value={category.category_id}>{category.category_name}</MenuItem>
                                                    ))
                                                }
                                                </Select>
                                                <FormHelperText>Required</FormHelperText>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                label="Cost"
                                                id="meal_cost"
                                                name="meal_cost"
                                                helperText="Required"
                                                value={meal_cost}
                                                onChange={handleChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Description"
                                                id="meal_description"
                                                name="meal_description"
                                                helperText="Required"
                                                multiline
                                                value={meal_description}
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

                                            <Avatar className={classes.image} alt={meal_name} src={meal_image}/>
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

                        <Grid item xs={12}>
                            <MUIDataTable
                                title={<Title>Meals</Title>}
                                data={meal_list}
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
 
export default Meal;