import React, { useReducer } from 'react';
import axiosClient from "../../config/axios";
import OrderContext from './orderContext';
import OrderReducer from './orderReducer';

import {
    ORDER_GET_HISTORIAL,
    ORDER_GET_DASHBOARD_DATA,
    ORDER_GET_CHART_DATA,
    ERROR_CREATE,
    ERROR_CLEAN
} from "../../types";

const OrderState = props => {
    const initialState = {
        mealMostRequested: null,
        mealMostRating: null,
        todayOrders: [],
        chartDashboard: [],
        ordersHistorial: [],
        charts: [],
        message: null
    }

    const [ state, dispatch ] = useReducer(OrderReducer, initialState);

    const getDashboardData = async () => {
        try {
            const result = await axiosClient.get("/api/orders/dashboardData");

            dispatch({
                type: ORDER_GET_DASHBOARD_DATA,
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

    const getHistorialOrders = async () => {
        try {
            const result = await axiosClient.get("/api/orders/historialOrders");
            
            dispatch({
                type: ORDER_GET_HISTORIAL,
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

    const getCharts = async () => {
        try {
            const result = await axiosClient.get("/api/orders/charts");
            dispatch({
                type: ORDER_GET_CHART_DATA,
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

    const addOrder = async ( orders, payment ) => {
        const order = {
            order_historial_payment: payment,
            order_historial_status: 1,
            order_historial_amount: 0,
            order_meals: []
        }
        var total = 0;
        let meals = [];
        
        orders.forEach( order => {
            total += order.quantity * order.meal.meal_cost;
            meals.push({
                order_meal_qty: order.quantity,
                order_meal: order.meal.meal_id
            });
        });

        order.order_historial_amount = total;
        order.order_meals = meals;

        try {
            const result = await axiosClient.post("/api/orders", order);
            dispatch({
                type: ERROR_CREATE,
                payload: {
                    type: "success",
                    title: "Order added",
                    message: result.data.message
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

    const cleanError = () => {
        dispatch({
            type: ERROR_CLEAN,
        });
    }

    return (
        <OrderContext.Provider
            value={{
                mealMostRequested: state.mealMostRequested,
                mealMostRating: state.mealMostRating,
                todayOrders: state.todayOrders,
                chartDashboard: state.chartDashboard,
                ordersHistorial: state.ordersHistorial,
                charts: state.charts,
                message: state.message,
                getDashboardData,
                getHistorialOrders,
                getCharts,
                addOrder,
                cleanError
            }}
        >
            {props.children}
        </OrderContext.Provider>
    );
}


export default OrderState;