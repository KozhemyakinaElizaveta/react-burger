import { wsFeedReducer, wsOrdersReducer } from './socket-reducer'
import {
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_GET_MESSAGE,
    WS_ORDERS_CONNECTION_CLOSED,
    WS_ORDERS_CONNECTION_ERROR,
    WS_ORDERS_CONNECTION_SUCCESS,
    WS_ORDERS_GET_MESSAGE
} from '../actions/socket-actions';

describe('feed reducer', () => {
    it('should return the initial state', () => {
        expect(wsFeedReducer(undefined, undefined)).toEqual(
            {
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }
        )
    })

    it('should handle WS_FEED_CONNECTION_SUCCESS', () => {
        expect(
            wsFeedReducer({
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }, {
                type: WS_FEED_CONNECTION_SUCCESS,
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: true,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }
        )
    })

    it('should handle WS_FEED_CONNECTION_ERROR', () => {
        expect(
            wsFeedReducer({
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }, {
                type: WS_FEED_CONNECTION_ERROR,
                payload: new Event('error')
            })
        ).toEqual(
            {
                error: new Event('error'),
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }
        )
    })

    it('should handle WS_FEED_CONNECTION_CLOSED', () => {
        expect(
            wsFeedReducer({
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }, {
                type: WS_FEED_CONNECTION_CLOSED,
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }
        )
    })

    it('should handle WS_FEED_GET_MESSAGE', () => {
        expect(
            wsFeedReducer({
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }, {
                type: WS_FEED_GET_MESSAGE,
                payload: JSON.stringify({ success: true, orders: [], total: 123, totalToday: 5 })
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: false,
                message: { success: true, orders: [], total: 123, totalToday: 5 }
            }
        )
    })
})

describe('orders reducer', () => {
    it('should return the initial state', () => {
        expect(wsOrdersReducer(undefined, undefined)).toEqual(
            {
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }
        )
    })

    it('should handle WS_ORDERS_CONNECTION_SUCCESS', () => {
        expect(
            wsOrdersReducer({
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }, {
                type: WS_ORDERS_CONNECTION_SUCCESS,
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: true,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }
        )
    })

    it('should handle WS_ORDERS_CONNECTION_ERROR', () => {
        expect(
            wsOrdersReducer({
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }, {
                type: WS_ORDERS_CONNECTION_ERROR,
                payload: new Event('error')
            })
        ).toEqual(
            {
                error: new Event('error'),
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }
        )
    })

    it('should handle WS_ORDERS_CONNECTION_CLOSED', () => {
        expect(
            wsOrdersReducer({
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }, {
                type: WS_ORDERS_CONNECTION_CLOSED,
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }
        )
    })

    it('should handle WS_ORDERS_GET_MESSAGE', () => {
        expect(
            wsOrdersReducer({
                wsConnected: false,
                message: { success: false, orders: [], total: 0, totalToday: 0 }
            }, {
                type: WS_ORDERS_GET_MESSAGE,
                payload: JSON.stringify({ success: true, orders: [], total: 123, totalToday: 5 })
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: false,
                message: { success: true, orders: [], total: 123, totalToday: 5 }
            }
        )
    })
})