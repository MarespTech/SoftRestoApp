import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import AlertsReducer from './alertsReducer';
import AlertsContext from './alertsContext';

import { 
    ALERT_GET_NAVBAR_NUM_NOTIFICATIONS,
    ALERT_GET_NOTIFICATIONS,
    ALERT_GET_MAILS,
    ALERT_SELECT_MAIL,
    ALERT_MARK_MESSAGE,
    ALERT_DELETE_MESSAGE,
    ERROR_CREATE,
    ERROR_CLEAN
} from '../../types';

const AlertState = props => {
    const initialState = {
        notifications_navbar: [],
        messages_navbar: [],
        notifications: [],
        messages: [],
        message_selected: null,
        message: null
    }

    const [ state, dispatch ] = useReducer(AlertsReducer, initialState);

    const getNotificationsForNavbar = async () => {
        try {
            const result = await axiosClient.get("/api/alerts/checkNotificationsForNavbar");
            dispatch({
                type: ALERT_GET_NAVBAR_NUM_NOTIFICATIONS,
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

    const getMessages = async () => {
        try {
            const result = await axiosClient.get("/api/alerts/checkMessages");

            dispatch({
                type: ALERT_GET_MAILS,
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

    const getNotifications = async () => {
        try {
            const result = await axiosClient.get("/api/alerts/checkNotifications");

            dispatch({
                type: ALERT_GET_NOTIFICATIONS,
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

    const selectMessage = id => {
        dispatch({
            type: ALERT_SELECT_MAIL,
            payload: id
        });
    }

    const markMessageAsSeen = async id => {
        try {
            const result = await axiosClient.post(`/api/alerts/markMessage/${id}`);

            dispatch({
                type: ALERT_MARK_MESSAGE,
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

    const deleteMessage = async id => {
        try {
            const result = await axiosClient.delete(`/api/alerts/deleteMessage/${id}`);

            dispatch({
                type: ALERT_DELETE_MESSAGE,
                payload: {
                    data:  result.data.data,
                    message: {
                        message: result.data.message,
                        type: "success",
                        title: "Success"
                    }
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
            type: ERROR_CLEAN
        });
    }

    return (
        <AlertsContext.Provider
            value={{
                notifications_navbar: state.notifications_navbar,
                messages_navbar: state.messages_navbar,
                notifications: state.notifications,
                messages: state.messages,
                message_selected: state.message_selected,
                message: state.message,
                getNotificationsForNavbar,
                getMessages,
                getNotifications,
                selectMessage,
                markMessageAsSeen,
                deleteMessage,
                cleanError
            }}
        >
            {props.children}
        </AlertsContext.Provider>
    )
}


export default AlertState;