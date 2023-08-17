import { request } from '../../utils/burger-api';
import {clearIngredientCounter} from './ingredients-action';
import { Dispatch } from 'redux';
import { TOrder } from '../../utils/types';

export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCEED = "ORDER_SUCCEED";
export const ORDER_FAILED = "ORDER_FAILED";
export const OPEN_ORDER_DETAILS_MODAL = "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_ORDER_DETAILS_MODAL = "CLOSE_ORDER_DETAILS_MODAL";


export const createOrder = (orderItemsId: any) => {
    return (dispatch: Dispatch) => {
        dispatch({
        type: ORDER_REQUEST,
        });

        request('orders', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ingredients: orderItemsId,
        }),
        })
        .then((data) => {
            dispatch(getOrderDetailsSuccess(data.order));
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

export function getOrderDetailsSuccess(data: TOrder | undefined) {
    return {
        type: ORDER_SUCCEED,
        orderId: data
    }
}