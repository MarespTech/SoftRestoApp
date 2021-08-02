import React, { useReducer } from 'react';
import axiosClient from "../../config/axios";
import UserContext from './userContext';
import UserReducer from './userReducer';
import {
    USER_ADD,
    USER_EDIT,
    USER_DELETE,
    USER_GET,
    USER_SELECT,
    USER_UNSELECTED,
    ERROR_CREATE,
    ERROR_CLEAN
} from "../../types";

const UserState = props => {
    const initialState = {
        user_list: [],
        user_select: null,
        message: null
    }

    const [ state, dispatch ] = useReducer(UserReducer, initialState);

    const getUsers = async () => {
        try {
            const result = await axiosClient.get("/api/users");
            dispatch({
                type: USER_GET,
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

    const selectUser = id => {
        dispatch({
            type: USER_SELECT,
            payload: id
        });
    }

    const unselectUser = () => {
        dispatch({
            type: USER_UNSELECTED
        });
    }

    const addUser = async user => {
        try {
            if(user.user_image_media) {
                const image = new FormData();
                image.append("file", user.user_image_media);
    
                const resultImage = await axiosClient.post("/api/upload/users", image, {
                    headers: {"Content-Type": "multipart/form-data"}
                });
    
                user.user_image = resultImage.data.data.url
            }
    
            const result = await axiosClient.post("/api/users", user);
            console.log(result);   
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

    const editUser = async user => {

    }

    const deleteUser = async id => {

    }

    const cleanError = () => {
        dispatch({
            type: ERROR_CLEAN
        });
    }

    return (
        <UserContext.Provider
            value={{
                user_list: state.user_list,
                user_select: state.user_select,
                message: state.message,
                getUsers,
                selectUser,
                unselectUser,
                addUser,
                editUser,
                deleteUser,
                cleanError
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;