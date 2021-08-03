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

const UserReducer = (state, action) => {
    switch(action.type) {
        case USER_ADD:
                return {
                    ...state,
                    user_list: [...state.user_list, action.payload.user],
                    message: action.payload.message,
                    user_select: null
                }
        case USER_EDIT:
            return {
                ...state,
                user_list: state.user_list.map( user => user.user_id === action.payload.user.user_id ? action.payload.user : user),
                message: action.payload.message,
                user_select: null
            }
        case USER_DELETE:
            return {
                ...state,
                user_list: state.user_list.filter( user => user.user_id !== action.payload.user_id),
                message: action.payload.message
            }
        case USER_GET:
            return {
                ...state,
                user_list: action.payload
            }
        case USER_SELECT:
            return {
                ...state,
                user_select: state.user_list.filter( user => user.user_id === action.payload)[0],
            }
        case USER_UNSELECTED:
            return {
                ...state,
                user_select: null
            }
        case ERROR_CREATE:
            return {
                ...state,
                message: action.payload
            }
        case ERROR_CLEAN:
            return {
                ...state,
                message: null
            }
        default:
            return state
    }
}

export default UserReducer;