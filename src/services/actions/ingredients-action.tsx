import { request } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import { AppDispatch, AppThunk } from '../store';


export const ADD_INGREDIENT_COUNTER = "ADD_INGREDIENT_COUNTER";
export const REMOVE_INGREDIENT_COUNTER = "REMOVE_INGREDIENT_COUNTER";
export const ADD_BUN_COUNTER = "ADD_BUN_COUNTER";
export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";
export const CLEAR_INGREDIENT_COUNTER = "CLEAR_INGREDIENT_COUNTER";
export const INGREDIENT_CARD = "INGREDIENT_CARD";

export interface IErrorIngredients {
    readonly type: typeof INGREDIENTS_ERROR;
}

export interface IRemoveCounter {
    readonly type: typeof REMOVE_INGREDIENT_COUNTER;
    readonly _id: string;
}

export interface IRequest {
    readonly type: typeof INGREDIENTS_REQUEST;
}

export interface ISuccess {
    readonly type: typeof INGREDIENTS_SUCCESS;
    ingredients: Array<TIngredient>;
}

export interface IAddCounter {
    readonly type: typeof ADD_INGREDIENT_COUNTER;
    readonly _id: string;
}

export interface IAddBunCounter {
    readonly type: typeof ADD_BUN_COUNTER;
    readonly _id: string;
}

export interface IClearCounter {
    readonly type: typeof CLEAR_INGREDIENT_COUNTER;
}

export type TCounterIngredientActions =
    | IErrorIngredients
    | IRemoveCounter
    | IClearCounter
    | IRequest
    | ISuccess
    | IAddCounter
    | IAddBunCounter;

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({ type: INGREDIENTS_REQUEST });

    request('ingredients')
    .then((res) => {
        dispatch({
            type: INGREDIENTS_SUCCESS,
            ingredients: res.data.map((ingredient: TIngredient) => ({
                ...ingredient,
                counter: 0,
            })),
        });
    })
    .catch(() => dispatch(ingredientsError()));
};

const ingredientsError = (): IErrorIngredients => ({
    type: INGREDIENTS_ERROR,
});

export const removeIngredientCounter = (_id: string): IRemoveCounter => ({
    type: REMOVE_INGREDIENT_COUNTER,
    _id: _id,
});

export const clearIngredientCounter = (): IClearCounter => ({
    type: CLEAR_INGREDIENT_COUNTER,
});