import {
    ADD_BUN,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR,
    MOVE_INGREDIENT,
    TCurrentIngredientActions
} from "../actions/constructor-action";
import { TIngredientsInitialState } from '../../utils/types';

export const constructorInitialState: TIngredientsInitialState = {
    ingredients: [],
    bunIngredient: null,
};

export const burgerConstructorReducer = (state = constructorInitialState, action: TCurrentIngredientActions | undefined): TIngredientsInitialState => {
    switch (action?.type) {
    case ADD_BUN: {
        return {
        ...state,
        bunIngredient: action.bunIngredient,
        };
    }

    case ADD_INGREDIENT: {
        return {
        ...state,
        ingredients: [
            ...state.ingredients,
            action.item
        ],
        };
    }

    case REMOVE_INGREDIENT: {
        const ingredientsArray = [...state.ingredients];
        ingredientsArray.splice(action.index, 1);
        return {
        ...state,
        ingredients: ingredientsArray
        };
    }

    case MOVE_INGREDIENT: {
        const ingredients = [...state.ingredients];
        [ingredients[action.dragIndex], ingredients[action.hoverIndex]] = [
        ingredients[action.hoverIndex],
        ingredients[action.dragIndex],
        ];
        return {
        ...state,
        ingredients,
        };
    }

    case CLEAR_CONSTRUCTOR: {
        return {
        ...state,
        ingredients: [],
        bunIngredient: null,
        };
    }

    default: {
        return state;
    }}
};