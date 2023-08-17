import uniqid from 'uniqid';
export const ADD_BUN = "SELECT_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const CONSTRUCTOR_CARD = "CONSTRUCTOR_CARD";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
import { TIngredient} from '../../utils/types';

export const addIngredient = (ingredient: TIngredient) => {
    const key=uniqid();
    return {
    type: ADD_INGREDIENT,
    ingredient: {ingredient,
    key}
}
};


export const removeIngredient = (ingridient: TIngredient, index: number) => ({
    type: REMOVE_INGREDIENT,
    index,
    ingridient,
});