import React, { useReducer } from 'react';
import axiosClient from "../../config/axios";
import OrderContext from './orderContext';
import orderReducer from './orderReducer';

import {
    ORDER_GET_HISTORIAL,
    ORDER_GET_DASHBOARD_DATA,
    ORDER_GET_CHART_DATA,
} from "../../types";

const OrderState = props => {
    const initialState = {
        
    }
}
