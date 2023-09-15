import {
    ORDER_REQUEST,
    ORDER_SUCCEED,
    ORDER_FAILED,
    OPEN_ORDER_DETAILS_MODAL,
    CLOSE_ORDER_DETAILS_MODAL,
} from "../actions/order-details-action";
import { orderDetailsReducer, orderInitialState } from "./order-details-reducer";

describe('order-details reducer', () => {
    it("should return the initial state", () => {
        expect(orderDetailsReducer(undefined, undefined))
            .toEqual(orderInitialState);
    });

    it("should handle ORDER_REQUEST", () => {
        expect(orderDetailsReducer(orderInitialState, { type: ORDER_REQUEST }))
            .toEqual({ ...orderInitialState, makeOrderRequestInProgress: true });
    });

    it("should handle ORDER_SUCCEED", () => {
        const id = '1234';
        expect(orderDetailsReducer(orderInitialState, { type: ORDER_SUCCEED, orderId: id }))
            .toEqual({ ...orderInitialState, makeOrderRequestInProgress: false, makeOrderRequestFailed: false, orderId: id });
    });

    it("should handle ORDER_FAILED", () => {
        expect(orderDetailsReducer(orderInitialState, { type: ORDER_FAILED }))
            .toEqual({ ...orderInitialState, makeOrderRequestInProgress: false, makeOrderRequestFailed: true, orderId: '' });
    });

    it("should handle OPEN_ORDER_DETAILS_MODAL", () => {
        expect(orderDetailsReducer(orderInitialState, { type: OPEN_ORDER_DETAILS_MODAL }))
            .toEqual({ ...orderInitialState, openModal: true });
    });

    it("should handle CLOSE_ORDER_DETAILS_MODAL", () => {
        expect(orderDetailsReducer(orderInitialState, { type: CLOSE_ORDER_DETAILS_MODAL }))
            .toEqual({ ...orderInitialState, openModal: false });
    });
});