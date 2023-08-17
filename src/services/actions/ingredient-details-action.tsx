export const INGREDIENT = "INGREDIENT";
export const NO_INGREDIENT = "NO_INGREDIENT";
export const OPEN_MODAL_INGREDIENT = "OPEN_MODAL_INGREDIENT";
export const CLOSE_MODAL_INGREDIENT = "CLOSE_MODAL_INGREDIENT";
import { TIngredient} from '../../utils/types';

export function selectIngredient(ingredient: TIngredient) {
    return {
        type: INGREDIENT,
        ingredient: ingredient,
    };
}