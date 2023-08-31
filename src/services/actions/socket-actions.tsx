export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED_CONNECTION_SUCCESS' = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE: 'WS_FEED_GET_MESSAGE' = 'WS_FEED_GET_MESSAGE';

export const WS_ORDERS_CONNECTION_START: 'WS_ORDERS_CONNECTION_START' = 'WS_ORDERS_CONNECTION_START';
export const WS_ORDERS_CONNECTION_SUCCESS: 'WS_ORDERS_CONNECTION_SUCCESS' = 'WS_ORDERS_CONNECTION_SUCCESS';
export const WS_ORDERS_CONNECTION_ERROR: 'WS_ORDERS_CONNECTION_ERROR' = 'WS_ORDERS_CONNECTION_ERROR';
export const WS_ORDERS_CONNECTION_CLOSED: 'WS_ORDERS_CONNECTION_CLOSED' = 'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_GET_MESSAGE: 'WS_ORDERS_GET_MESSAGE' = 'WS_ORDERS_GET_MESSAGE';

export type TActionsType = {
    wsConnectionStart: typeof WS_FEED_CONNECTION_START | typeof WS_ORDERS_CONNECTION_START,
    wsConnectionSuccess: typeof WS_FEED_CONNECTION_SUCCESS | typeof WS_ORDERS_CONNECTION_SUCCESS,
    wsConnectionError: typeof WS_FEED_CONNECTION_ERROR | typeof WS_ORDERS_CONNECTION_ERROR,
    wsConnectionClosed: typeof WS_FEED_CONNECTION_CLOSED | typeof WS_ORDERS_CONNECTION_CLOSED,
    wsGetMessage: typeof WS_FEED_GET_MESSAGE | typeof WS_ORDERS_GET_MESSAGE
}

export const WsFeedActions: TActionsType = {
    wsConnectionStart: WS_FEED_CONNECTION_START,
    wsConnectionSuccess: WS_FEED_CONNECTION_SUCCESS,
    wsConnectionError: WS_FEED_CONNECTION_ERROR,
    wsConnectionClosed: WS_FEED_CONNECTION_CLOSED,
    wsGetMessage: WS_FEED_GET_MESSAGE
}

export const WsOrdersActions: TActionsType = {
    wsConnectionStart: WS_ORDERS_CONNECTION_START,
    wsConnectionSuccess: WS_ORDERS_CONNECTION_SUCCESS,
    wsConnectionError: WS_ORDERS_CONNECTION_ERROR,
    wsConnectionClosed: WS_ORDERS_CONNECTION_CLOSED,
    wsGetMessage: WS_ORDERS_GET_MESSAGE
}

export interface IWsFeedConnectionStart {
    readonly type: typeof WS_FEED_CONNECTION_START;
}

export interface IWsFeedConnectionSuccess {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

export interface IWsFeedConnectionError {
    readonly type: typeof WS_FEED_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWsFeedConnectionClosed {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

export interface IWsFeedConnectionMessage {
    readonly type: typeof WS_FEED_GET_MESSAGE;
    readonly payload: any;
}

export interface IWsOrdersConnectionStart {
    readonly type: typeof WS_ORDERS_CONNECTION_START;
}

export interface IWsOrdersConnectionSuccess {
    readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}

export interface IWsOrdersConnectionError {
    readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWsOrdersConnectionClosed {
    readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}

export interface IWsOrdersConnectionMessage {
    readonly type: typeof WS_ORDERS_GET_MESSAGE;
    readonly payload: any;
}

export type TWSFeedActions =
    | IWsFeedConnectionStart
    | IWsFeedConnectionError
    | IWsFeedConnectionSuccess
    | IWsFeedConnectionClosed
    | IWsFeedConnectionMessage;

export type TWSOrdersActions =
    | IWsOrdersConnectionStart
    | IWsOrdersConnectionError
    | IWsOrdersConnectionSuccess
    | IWsOrdersConnectionClosed
    | IWsOrdersConnectionMessage;

export function wsFeedConnectionStart(): IWsFeedConnectionStart {
    return {
        type: WS_FEED_CONNECTION_START,
    }
}

export function wsFeedConnectionSuccess(): IWsFeedConnectionSuccess {
    return {
        type: WS_FEED_CONNECTION_SUCCESS,
    }
}

export function wsFeedConnectionError(event: Event): IWsFeedConnectionError {
    return {
        type: WS_FEED_CONNECTION_ERROR,
        payload: event
    }
}

export function wsFeedConnectionClose(): IWsFeedConnectionClosed {
    return {
        type: WS_FEED_CONNECTION_CLOSED
    }
}

export function wsFeedConnectionMessage(data: any): IWsFeedConnectionMessage {
    return {
        type: WS_FEED_GET_MESSAGE,
        payload: data
    }
}

export function wsOrderConnectionStart(): IWsOrdersConnectionStart {
    return {
        type: WS_ORDERS_CONNECTION_START,
    }
}

export function wsOrderConnectionSuccess(): IWsOrdersConnectionSuccess {
    return {
        type: WS_ORDERS_CONNECTION_SUCCESS,
    }
}

export function wsOrderConnectionError(event: Event): IWsOrdersConnectionError {
    return {
        type: WS_ORDERS_CONNECTION_ERROR,
        payload: event
    }
}

export function wsOrderConnectionClose(): IWsOrdersConnectionClosed {
    return {
        type: WS_ORDERS_CONNECTION_CLOSED
    }
}

export function wsOrderConnectionMessage(data: any): IWsOrdersConnectionMessage {
    return {
        type: WS_ORDERS_GET_MESSAGE,
        payload: data
    }
}

