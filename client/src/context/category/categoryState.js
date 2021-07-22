import React, { useReducer } from 'react'
import axiosClient from '../../config/axios';
import CategoryContext from './categoryContext';
import CategoryReducer from './categoryReducer';

import {
    CATEGORY_ADD,
    CATEGORY_EDIT,
    CATEGORY_DELETE,
    CATEGORY_GET,
    CATEGORY_SELECT,
    ERROR_CREATE,
    ERROR_CLEAN
} from "../../types";

const CategoryState = props => {
    const initialState = {
        category_list: [],
        category_selected: null,
        message: null,
    }

    const [ state, dispatch ] = useReducer(CategoryReducer, initialState);

    const getCategories = async () => {
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

    const selectCategory = id => {
        dispatch({
            type: CATEGORY_SELECT,
            payload: id
        })
    }

    const addCategory = async (category) => {
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

    const editCategory = async (category) => {
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

    const deleteCategory = async (id) => {
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

    const cleanError = () => {
        dispatch({
            type: ERROR_CLEAN,
        });
    }
    
    return (  
        <CategoryContext.Provider
            value={{
                category_list: state.category_list,
                category_selected: state.category_selected,
                message: state.message,
                getCategories,
                addCategory,
                editCategory,
                deleteCategory,
                selectCategory,
                cleanError
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
}
 
export default CategoryState;
