import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import MealContext from './mealContext';
import MealReducer from './mealReducer';

import {
    MEAL_ADD,
    MEAL_EDIT,
    MEAL_DELETE,
    MEAL_GET,
    MEAL_SELECT,
    MEAL_UNSELECTED,
    ERROR_CREATE,
    ERROR_CLEAN
} from "../../types";

const MealState = props => {
    const initialState = {
        meal_list: [],
        meal_selected: null,
        message: null
    }

    const [ state, dispatch ] = useReducer(MealReducer, initialState);

    const getMeals = async () => {
        try {
            const result = await axiosClient.get("/api/meals");
            dispatch({
                type: MEAL_GET,
                payload: result.data.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ERROR_CREATE,
                payload: {
                    message: error.response.data.message,
                    type: "error",
                    title: "Error"
                }
            });
        }
    }

    const selectMeal = id => {
        dispatch({
            type: MEAL_SELECT,
            payload: id
        });
    }

    const unselectMeal = () => {
        dispatch({
            type: MEAL_UNSELECTED
        });
    }

    const addMeal = async meal => {
        try {
            if(meal.meal_image_media) {
                const image = new FormData();
                image.append("file", meal.meal_image_media);

                const resultImage = await axiosClient.post("/api/upload/meals", image, {
                    headers: {"Content-Type": "multipart/form-data"}
                });

                meal.meal_image = resultImage.data.data.url
            }

            const result = await axiosClient.post("/api/meals", meal);
            console.log(meal);
            dispatch({
                type: MEAL_ADD,
                payload: {
                    meal: {
                        ...result.data.data,
                        meal_rating: 0, 
                        meal_votes: 0,
                        meal_recipe: 0,
                        category_name: meal.category_name
                    },
                    message: {
                        type: "success",
                        title: "Success",
                        message: result.data.message
                    }
                }
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ERROR_CREATE,
                payload: {
                    message: error.response.data.message,
                    type: "error",
                    title: "Error"
                }
            });
        }
    }

    const editMeal = async meal => {
        const  { meal_id } = meal;

        try {
            if(meal.meal_image_media) {
                const image = new FormData();
                image.append("file", meal.meal_image_media);

                const resultImage = await axiosClient.post("/api/upload/meals", image, {
                    headers: {"Content-Type": "multipart/form-data"}
                });

                meal.meal_image = resultImage.data.data.url
            }

            const result = await axiosClient.put(`/api/meals/${meal_id}`, meal);
            dispatch({
                type: MEAL_EDIT,
                payload: {
                    meal: meal,
                    message: {
                        type: "success",
                        title: "Success",
                        message: result.data.message
                    }
                }
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ERROR_CREATE,
                payload: {
                    message: error.response.data.message,
                    type: "error",
                    title: "Error"
                }
            });
        }
    }

    const deleteMeal = async id => {
        try {
            const result = await axiosClient.delete(`/api/meals/${id}`);

            dispatch({
                type: MEAL_DELETE,
                payload: {
                    id,
                    message: {
                        type: "success",
                        title: "Success",
                        message: result.data.message
                    }
                }
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ERROR_CREATE,
                payload: {
                    message: error.response.data.message,
                    type: "error",
                    title: "Error"
                }
            });
        }
    }

    const cleanError = () => {
        dispatch({
            type: ERROR_CLEAN,
        });
    }

    return (
        <MealContext.Provider
            value={{
                meal_list: state.meal_list,
                meal_selected: state.meal_selected,
                message: state.message,
                getMeals,
                selectMeal,
                unselectMeal,
                addMeal,
                editMeal,
                deleteMeal,
                cleanError
            }}
        >
            {props.children}
        </MealContext.Provider>
    )
}

export default MealState;


