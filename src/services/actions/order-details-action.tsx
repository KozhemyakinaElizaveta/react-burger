import { request } from '../../utils/burger-api';
import {clearIngredientCounter} from './ingredients-action';
import { AppDispatch, AppThunk } from '../store';

export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCEED = "ORDER_SUCCEED";
export const ORDER_FAILED = "ORDER_FAILED";
export const OPEN_ORDER_DETAILS_MODAL = "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_ORDER_DETAILS_MODAL = "CLOSE_ORDER_DETAILS_MODAL";

export interface IOrderRequest {
    readonly type: typeof ORDER_REQUEST;
}

export interface IOrderSucceed {
    readonly type: typeof ORDER_SUCCEED;
    orderId: string;
}

export interface IOrderFailed {
    readonly type: typeof ORDER_FAILED;
}

export interface IOpen {
    readonly type: typeof OPEN_ORDER_DETAILS_MODAL;
}

export interface IClose {
    readonly type: typeof CLOSE_ORDER_DETAILS_MODAL;
}

export type TOrderActions =
    | IOrderRequest
    | IOrderSucceed 
    | IOrderFailed
    | IClose
    | IOpen;


export const createOrder: AppThunk = (orderItemsId) => {
    return (dispatch: AppDispatch) => {
        dispatch({
        type: ORDER_REQUEST,
        });

        request("orders", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            Authorization: String(localStorage.getItem("burgerAccessToken")) },
        body: JSON.stringify({
            ingredients: orderItemsId,
        }),
        })
        .then((data) => {
            dispatch({
            type: ORDER_SUCCEED,
            orderId: data.order.number.toString(),
            });
            dispatch({
            type: OPEN_ORDER_DETAILS_MODAL,
            });
            dispatch({
            type: CLEAR_CONSTRUCTOR
            })
            dispatch (clearIngredientCounter())

        })
        
        .catch((err) => {
            dispatch({
            type: ORDER_FAILED,
            });
        });
    };
};