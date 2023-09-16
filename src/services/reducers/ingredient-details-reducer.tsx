import {
    NO_INGREDIENT,
    INGREDIENT,
    TSelectIngredientAction,
} from "../actions/ingredient-details-action";
import { TIngredient } from '../../utils/types';

type TInitialState = {
    ingredient: TIngredient | null;
}

export const detailsInitialState: TInitialState = {
    ingredient: null
};

export const ingredientDetailsReducer = (state = detailsInitialState, action: TSelectIngredientAction | undefined): TInitialState => {
    switch (action?.type) {
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