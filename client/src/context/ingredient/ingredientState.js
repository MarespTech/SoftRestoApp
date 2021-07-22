import React, { useReducer } from 'react'
import axiosClient from '../../config/axios';
import IngredientContext from './ingredientContext';
import IngredientReducer from './ingredientReducer';

import {
    INGREDIENT_ADD,
    INGREDIENT_EDIT,
    INGREDIENT_DELETE,
    INGREDIENT_GET,
    INGREDIENT_SELECT,
    INGREDIENT_UNSELECTED,
    ERROR_CREATE,
    ERROR_CLEAN
} from "../../types";

const IngredientState = props => {
    const initialState = {
        ingredient_list: [],
        ingredient_selected: null,
        message: null,
    }

    const [ state, dispatch ] = useReducer(IngredientReducer, initialState);

    const getIngredients = async () => {
        try {
            const result = await axiosClient.get("/api/ingredients");
            dispatch({
                type: INGREDIENT_GET,
                payload: result.data.data
            })
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

    const selectIngredient = id => {
        dispatch({
            type: INGREDIENT_SELECT,
            payload: id
        });
    }

    const unselectIngredient = () => {
        dispatch({
            type: INGREDIENT_UNSELECTED,
        });
    }

    const addIngredient = async ingredient => {
        try {
            if(ingredient.ingredient_image_media) {
                const image = new FormData();
                image.append("file", ingredient.ingredient_image_media);

                const resultImage = await axiosClient.post("/api/upload/ingredients", image, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                ingredient.ingredient_image = resultImage.data.data.url
            }

            const result = await axiosClient.post("api/ingredients", ingredient);
            dispatch({
                type: INGREDIENT_ADD,
                payload: {
                    ingredient: result.data.data,
                    message: {
                        type: 'success',
                        title: 'Success',
                        message: result.data.message
                    }
                }
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: ERROR_CREATE,
                payload: {
                    message: {
                        message: error.response.data.message,
                        title: "Error",
                        type: "error"
                    }
                }
            });
        }
    }

    const editIngredient = async ingredient => {
        const { ingredient_id } = ingredient;

        try {
            if(ingredient.ingredient_image_media) {
                const image = new FormData();
                image.append("file", ingredient.ingredient_image_media);

                const resultImage = await axiosClient.post("/api/upload/ingredients", image, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                ingredient.ingredient_image = resultImage.data.data.url
            }

            const result = await axiosClient.put(`api/ingredients/${ingredient_id}`, ingredient);
            dispatch({
                type: INGREDIENT_EDIT,
                payload: {
                    ingredient: ingredient,
                    message: {
                        type: 'success',
                        title: 'Success',
                        message: result.data.message
                    }
                }
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ERROR_CREATE,
                payload: {
                    message: {
                        message: error.response.data.message,
                        title: "Error",
                        type: "error"
                    }
                }
            });
        }
    }

    const deleteIngredient = async id => {
        try {
            const result = await axiosClient.delete(`/api/ingredients/${id}`);
            dispatch({
                type: INGREDIENT_DELETE,
                payload: {
                    id,
                    message: {
                        message: result.data.message,
                        type: "success",
                        title: "Success"
                    }
                }
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: ERROR_CREATE,
                payload: {
                    message: {
                        message: error.response.data.message,
                        title: "Error",
                        type: "error"
                    }
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
        <IngredientContext.Provider
            value={{
                ingredient_list: state.ingredient_list,
                ingredient_selected: state.ingredient_selected,
                message: state.message,
                getIngredients,
                selectIngredient,
                unselectIngredient,
                addIngredient,
                editIngredient,
                deleteIngredient,
                cleanError
            }}
        >
            {props.children}
        </IngredientContext.Provider>
    );
}
 
export default IngredientState;
