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

const IngredientReducer = (state, action) => {
    switch(action.type) {
        case INGREDIENT_GET:
            return {
                ...state,
                ingredient_list: action.payload
            }
        case INGREDIENT_SELECT:
            return {
                ...state,
                ingredient_selected: state.ingredient_list.filter( ingredient => ingredient.ingredient_id === action.payload )[0]
            }
        case INGREDIENT_UNSELECTED:
            return {
                ...state,
                ingredient_selected: null
            }
        case INGREDIENT_ADD:
            return {
                ...state,
                ingredient_list: [...state.ingredient_list, action.payload.ingredient],
                message: action.payload.message
            }
        case INGREDIENT_EDIT:
            return {
                ...state, 
                ingredient_list: state.ingredient_list.map( 
                                                            ingredient => ingredient.ingredient_id === action.payload.ingredient.ingredient_id 
                                                            ? action.payload.ingredient 
                                                            : ingredient ),
                message: action.payload.message,
                ingredient_selected: null
            }
        case INGREDIENT_DELETE:
            return {
                ...state,
                ingredient_list: state.ingredient_list.filter( ingredient => ingredient.ingredient_id !== action.payload.id),
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

export default IngredientReducer;