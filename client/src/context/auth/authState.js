import React, { useReducer } from "react";
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";

import {
    AUTH_GET_USER_INFO,
    AUTH_LOGOUT,
    AUTH_LOGIN,
    ERROR_CREATE,
    ERROR_CLEAN
} from "../../types";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticate: null,
        user: null,
        message: null,
        loading: null,
        isAdmin: 0
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const authenticateUser = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const result = await axiosClient.get('api/auth');
            dispatch({
                type: AUTH_GET_USER_INFO,
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

    const login = async data => {
        try {
            const result = await axiosClient.post('/api/auth', data);
            dispatch({
                type: AUTH_LOGIN,
                payload: result.data
            });

            authenticateUser();
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

    const logout = () => {
        dispatch({
            type: AUTH_LOGOUT,
        });
    }

    const cleanError = () => {
        dispatch({
            type: ERROR_CLEAN
        });
    }

    return (
        <AuthContext.Provider 
            value={{
                token: state.token,
                authenticate: state.authenticate,
                user: state.user,
                message: state.message,
                loading: state.loading,
                isAdmin: state.isAdmin,
                authenticateUser,
                login,
                logout,
                cleanError
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;