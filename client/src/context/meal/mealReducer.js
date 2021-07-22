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

const MealReducer = (state, action) => {
    switch(action.type) {
        case MEAL_GET:
            return {
                ...state,
                meal_list: action.payload
            }
        case MEAL_SELECT:
            return {
                ...state,
                meal_selected: state.meal_list.filter( meal => meal.meal_id === action.payload )[0]
            }
        case MEAL_UNSELECTED:
            return {
                ...state,
                meal_selected: null
            }
        case MEAL_ADD:
            return {
                ...state,
                meal_list: [...state.meal_list, action.payload.meal],
                message: action.payload.message
            }
        case MEAL_EDIT:
            return {
                ...state,
                meal_list: state.meal_list.map( meal => meal.meal_id === action.payload.meal.meal_id 
                                                ? action.payload.meal
                                                : meal),
                message: action.payload.message,
                meal_selected: null
            }
        case MEAL_DELETE:
            return {
                ...state,
                meal_list: state.meal_list.filter( meal => meal.meal_id !== action.payload.id),
                message: action.payload.message
            }
        case ERROR_CREATE:
            return {
                ...state,
                message: action.payload.message
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

export default MealReducer;