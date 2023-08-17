import { request } from '../../utils/burger-api';
import { Dispatch } from 'redux';
import { TIngredient } from '../../utils/types';


export const ADD_INGREDIENT_COUNTER = "ADD_INGREDIENT_COUNTER";
export const REMOVE_INGREDIENT_COUNTER = "REMOVE_INGREDIENT_COUNTER";
export const ADD_BUN_COUNTER = "ADD_BUN_COUNTER";
export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";
export const CLEAR_INGREDIENT_COUNTER = "CLEAR_INGREDIENT_COUNTER";

export const INGREDIENT_CARD = "INGREDIENT_CARD";

export const getIngredients = () => (dispatch: Dispatch) => {
    dispatch({ type: INGREDIENTS_REQUEST });

    request('ingredients')
    .then((res) => {
        dispatch(getIngredientsSuccess(res.data))
    })
    .catch(() => dispatch(ingredientsError()));
};

function getIngredientsSuccess(data: Array<TIngredient> = []) {
    return {
        type: INGREDIENTS_SUCCESS,
        ingredients: data.map((ingredient) => ({
            ...ingredient,
            counter: 0,
        })),
    }
}

const ingredientsError = () => ({
    type: INGREDIENTS_ERROR,
});

export const removeIngredientCounter = (_id: string) => ({
    type: REMOVE_INGREDIENT_COUNTER,
    _id: _id,
});

export const clearIngredientCounter = () => ({
    type: CLEAR_INGREDIENT_COUNTER,
});