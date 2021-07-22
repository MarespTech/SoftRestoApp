import React, { useReducer } from 'react'
import axiosClient from '../../config/axios';
import IngredientContext from './ingredientContext';
import IngredientReducer from './ingredientReducer';

import {
    CATEGORY_ADD,
    CATEGORY_EDIT,
    CATEGORY_DELETE,
    CATEGORY_GET,
    CATEGORY_SELECT,
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
            const result = await axiosClient.get("/api/categories");
            dispatch({
                type: CATEGORY_GET,
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
            type: CATEGORY_SELECT,
            payload: id
        })
    }

    const addIngredient = async (category) => {
        try {
            const result = await axiosClient.post("/api/categories", category);
            dispatch({
                type: CATEGORY_ADD,
                payload: {
                    category: result.data.data,
                    message: {
                        message: result.data.message,
                        type: "success",
                        title: "Success"
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

    const editIngredient = async (category) => {
        try {
            const result = await axiosClient.put(`/api/categories/${category.category_id}`, category);
            dispatch({
                type: CATEGORY_EDIT,
                payload: {
                    category,
                    message: {
                        message: result.data.message,
                        type: "success",
                        title: "Success"
                    }
                }
            });
        } catch (error) {
            console.log(error);
            console.log(error.response);
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

    const deleteIngredient = async (id) => {
        try {
            const result = await axiosClient.delete(`/api/categories/${id}`);
            dispatch({
                type: CATEGORY_DELETE,
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
            console.log(error.response);
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
        <IngredientContext.Provider
            value={{
                ingredient_list: state.ingredient_list,
                ingredient_selected: state.ingredient_selected,
                message: state.message,
                getIngredients,
                addIngredient,
                editIngredient,
                deleteIngredient,
                selectIngredient,
                cleanError
            }}
        >
            {props.children}
        </IngredientContext.Provider>
    );
}
 
export default IngredientState;
