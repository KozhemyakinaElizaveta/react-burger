import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./reducers/ingredients-reducer";
import { ingredientDetailsReducer } from "./reducers/ingredient-details-reducer";
import { burgerConstructorReducer } from "./reducers/constructor-reducer";
import { orderDetailsReducer } from "./reducers/order-details-reducer";
import { authReducer, returnUrlReducer, sendResetEmailReducer, resetPasswordReducer } from './reducers/auth-reducer';
import { ActionCreator } from 'redux';
import { TAddReturnUrlActions, TAuthActions, TResetPasswordActions, TSendResetEmailActions } from '../services/actions/auth-action';
import {store} from '../index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TCurrentIngredientActions } from "./actions/constructor-action";
import { TSelectIngredientAction } from "./actions/ingredient-details-action";
import { TCounterIngredientActions } from "./actions/ingredients-action";
import { TIngredient } from "../utils/types";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    authReducer,
    returnUrlReducer,
    sendResetEmailReducer,
    resetPasswordReducer
});

type TAppActions = | TAddReturnUrlActions | TAuthActions | TResetPasswordActions | TSendResetEmailActions | TCounterIngredientActions | TSelectIngredientAction |  TCurrentIngredientActions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, TAppActions>;
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, RootState, any, TAppActions>
>;

export const getAuth = (store: RootState) => store.authReducer
export const getOrderDetails = (store: RootState) => store.orderDetails.makeOrderRequestInProgress
export const getOpenModal = (store: RootState) => store.orderDetails.openModal
export const getConstructorIngredients = (store: RootState) => store.burgerConstructor.ingredients
export const getConstructor = (store: RootState) => store.burgerConstructor as { bunIngredient: TIngredient }
export const getBurgerIngredients = (store: RootState) => store.burgerIngredients
export const getOrder = (store: RootState) => store.orderDetails
export const getReturnUrl = (store: RootState) => store.returnUrlReducer.url
export const getResetEmail = (store: RootState) => store.sendResetEmailReducer