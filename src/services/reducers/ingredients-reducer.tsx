import { TIngredient } from "../../utils/types";
import {
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS,
    INGREDIENTS_ERROR,
    ADD_INGREDIENT_COUNTER,
    REMOVE_INGREDIENT_COUNTER,
    ADD_BUN_COUNTER,
    CLEAR_INGREDIENT_COUNTER,
    TCounterIngredientActions,
} from "../actions/ingredients-action";

type TInitialState = {
    ingredients: Array<TIngredient>;
    fetchIngredientsRequest: boolean;
    fetchIngredientsError: boolean;
}

export const ingredientsInitialState: TInitialState = {
    ingredients: [],
    fetchIngredientsRequest: false,
    fetchIngredientsError: false,
};

export const burgerIngredientsReducer = (state = ingredientsInitialState, action: TCounterIngredientActions | undefined): TInitialState => {
switch (action?.type) {
    case INGREDIENTS_REQUEST: {
    return {
        ...state,
        fetchIngredientsRequest: true,
    };
    }

    case INGREDIENTS_SUCCESS: {
    return {
        ...state,
        fetchIngredientsRequest: false,
        fetchIngredientsError: false,
        ingredients: action.ingredients,
    };
    }

    case INGREDIENTS_ERROR: {
    return {
        ...state,
        fetchIngredientsRequest: false,
        fetchIngredientsError: true,
        ingredients: [],
    };
    }

    case ADD_INGREDIENT_COUNTER: {
    return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) => {
        return ingredient._id === action._id
            ? { ...ingredient, counter: ingredient.counter + 1 }
            : ingredient;
        }),
    };
    }

    case REMOVE_INGREDIENT_COUNTER: {
    return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) => {
        return ingredient._id === action._id
            ? { ...ingredient, counter: ingredient.counter - 1 }
            : ingredient;
        }),
    };
    }

    case ADD_BUN_COUNTER: {
    return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) => {
        if (ingredient.type === "bun") {
            return {
            ...ingredient,
            counter: ingredient._id === action._id ? 2 : 0,
            };
        } else {
            return ingredient;
        }
        }),
    };
    }

    case CLEAR_INGREDIENT_COUNTER: {
    return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) => {
        return { ...ingredient, counter: 0 };
        }),
    };
    }

    default: {
    return state;
    }
}
};