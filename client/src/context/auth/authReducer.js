import {
    AUTH_GET_USER_INFO,
    AUTH_LOGOUT,
    AUTH_LOGIN,
    ERROR_CREATE,
    ERROR_CLEAN
} from "../../types";

const AuthReducer = (state, action) => {
    switch(action.type) {
        case AUTH_GET_USER_INFO:
            return {
                ...state,
                user: action.payload,
                authenticate: true,
                loading: false,
                isAdmin: action.payload.isAdmin
            }
        case AUTH_LOGIN:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticate: true,
                message: null,
                loading: false
            }
        case AUTH_LOGOUT:
        case ERROR_CREATE:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authenticate: false,
                loading: false,
                isAdmin: 0,
                message: action.payload
            }
        case ERROR_CLEAN:
            return {
                ...state,
                message: null
            }
        default:
            return state;
    }
}

export default AuthReducer;