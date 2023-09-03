import {
    NO_INGREDIENT,
    INGREDIENT,
    TSelectIngredientAction,
} from "../actions/ingredient-details-action";
import { TIngredient } from '../../utils/types';

type TInitialState = {
    ingredient: TIngredient | null;
}

const initialState: TInitialState = {
    ingredient: null
};

export const ingredientDetailsReducer = (state = initialState, action: TSelectIngredientAction): TInitialState => {
    switch (action.type) {
        case INGREDIENT: {
            return {
            ...state,
            ingredient: action.ingredient,
            };
        }
        case NO_INGREDIENT: {
            return {
            ...state,
            ingredient: null,
            };
        }
        default: {
            return state;
        }
    }
};