import {
    NO_INGREDIENT,
    INGREDIENT,
} from "../actions/ingredient-details-action";

const initialState = {
    ingredient: null
};

export const ingredientDetailsReducer = (state = initialState, action) => {
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