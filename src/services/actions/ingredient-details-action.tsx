import { TIngredient } from '../../utils/types';

export const INGREDIENT = "INGREDIENT";
export const NO_INGREDIENT = "NO_INGREDIENT";
export const OPEN_MODAL_INGREDIENT = "OPEN_MODAL_INGREDIENT";
export const CLOSE_MODAL_INGREDIENT = "CLOSE_MODAL_INGREDIENT";

export interface ICurrentIngredient {
    readonly type: typeof INGREDIENT;
    readonly ingredient: TIngredient;
}

export interface INoIngredient {
    readonly type: typeof NO_INGREDIENT;
}

export type TSelectIngredientAction =
    | ICurrentIngredient
    | INoIngredient;

export function selectIngredient(ingredient: TIngredient): ICurrentIngredient {
    return {
        type: INGREDIENT,
        ingredient: ingredient,
    };
}