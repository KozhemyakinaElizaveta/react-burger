import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../services/store';
import { TWSFeedActions, TWSOrdersActions, TActionsType } from '../services/actions/socket-actions'
import { getItem } from '../utils/local-storage'

export const socketMiddleware = (wsUrl: string, wsActions: TActionsType, withToken: boolean): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;


        return next => (action: TWSFeedActions | TWSOrdersActions) => {
        const { dispatch, } = store;
        const { type } = action;
        const { wsConnectionStart, wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetMessage } = wsActions;

        if (type === wsConnectionStart) {
            if (withToken) {
            const token = getItem("burgerAccessToken");
            socket = new WebSocket(`${wsUrl}?token=${token.replace('Bearer ', '')}`);
            }
            else {
            socket = new WebSocket(wsUrl);
            }
        }
        if (socket) {
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
            dispatch({ type: wsConnectionClosed, payload: event });
            };
        }

        next(action);
        };
    }) as Middleware;
}; 