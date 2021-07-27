import {
    ORDER_GET_HISTORIAL,
    ORDER_GET_DASHBOARD_DATA,
    ORDER_GET_CHART_DATA,
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
        default: 
            return state;
    }
}

export default orderReducer;