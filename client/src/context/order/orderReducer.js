import {
    ORDER_GET_HISTORIAL,
    ORDER_GET_DASHBOARD_DATA,
    ORDER_GET_CHART_DATA,
    ORDER_ADD,
    ERROR_CREATE,
    ERROR_CLEAN
} from "../../types";

const orderReducer = (state, action) => {
    switch(action.type) {
        case ORDER_GET_DASHBOARD_DATA:
            return {
                ...state,
                mealMostRequested: action.payload.mealMostRequested,
                mealMostRating: action.payload.mealMostRating,
                todayOrders: action.payload.todayOrders,
                ordersHistorial: action.payload.ordersHistorial,
                chartDashboard: action.payload.salesByHour
            }
        case ORDER_GET_HISTORIAL:
            return {
                ...state,
                ordersHistorial: action.payload.ordersHistorial,
            }
        case ORDER_GET_CHART_DATA: 
            return {
                ...state,
                charts: action.payload
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

export default orderReducer;