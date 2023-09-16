import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../services/store';
import { TWSFeedActions, TWSOrdersActions, TActionsType } from '../services/actions/socket-actions'
import { getItem } from '../utils/local-storage'

export const socketMiddleware = (wsUrl: string, wsActions: TActionsType, withToken: boolean): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWSFeedActions | TWSOrdersActions) => {
        const { dispatch, } = store;
        let isConnected = false;
        let reconnectTimerRef = 0;
        const { type } = action;
        const { wsConnectionStart, wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetMessage, wsConnecting } = wsActions;

        if (type === wsConnectionStart ) {
            isConnected = true;
            if (withToken) {
            const token = getItem("burgerAccessToken");
            socket = new WebSocket(`${wsUrl}?token=${token.replace('Bearer ', '')}`);
            }
            else {
            socket = new WebSocket(wsUrl);
            }
            window.clearTimeout(reconnectTimerRef);
            reconnectTimerRef = 0;
            dispatch({ type: wsConnecting });
        }
        if (socket && "WS_CONNECTING" === type) {
            socket.onopen = event => {
                dispatch({ type: wsConnectionSuccess, payload: event });
            };

            socket.onerror = event => {
                dispatch({ type: wsConnectionError, payload: event });
            };

            socket.onmessage = event => {
                const { data } = event;
                dispatch({ type: wsGetMessage, payload: data });
            };

            socket.onclose = event => {

                if (event.code !== 1000) {
                    dispatch({ type: wsConnectionError, payload: event });
                }
                if (isConnected) {
                    dispatch({ type: wsConnecting });
                    reconnectTimerRef = window.setTimeout(() => {
                    dispatch({ type: wsConnectionSuccess, payload: event });
                    }, 3000);
                }
                dispatch({ type: wsConnectionClosed, payload: event });

            };
        }

        if (socket && type == wsConnectionClosed) {
            window.clearTimeout(reconnectTimerRef);
            isConnected = false;
            reconnectTimerRef = 0;
            socket.close();
        }

        next(action);
        };
    }) as Middleware;
}; 