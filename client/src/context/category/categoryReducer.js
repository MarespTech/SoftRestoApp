import {
    CATEGORY_ADD,
    CATEGORY_EDIT,
    CATEGORY_DELETE,
    CATEGORY_GET,
    CATEGORY_SELECT,
    ERROR_CREATE,
    ERROR_CLEAN
} from "../../types";

const CategoryReducer = (state, action) => {
    switch(action.type) {
        case CATEGORY_GET:
            return {
                ...state,
                category_list: action.payload
            }
        case CATEGORY_SELECT:
            return {
                ...state,
                category_selected: action.payload
            }
        case CATEGORY_ADD:
            return {
                ...state,
                category_list: [...state.category_list, action.payload.category],
                message: action.payload.message
            }
        case CATEGORY_EDIT:
            return {
                ...state,
                category_list: state.category_list.map( category => category.category_id === action.payload.category.category_id ? action.payload.category : category),
                message: action.payload.message,
                category_selected: null
            }
        case CATEGORY_DELETE:
            return {
                ...state,
                category_list: state.category_list.filter( category => category.category_id !== action.payload.id),
                message: action.payload.message,
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
            return state;
    }
}

export default CategoryReducer;