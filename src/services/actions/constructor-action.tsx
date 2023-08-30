import uniqid from 'uniqid';
import { TIngredient, TCurIngredient } from '../../utils/types';

export const ADD_BUN = "SELECT_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const CONSTRUCTOR_CARD = "CONSTRUCTOR_CARD";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export interface IAddCurrentIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly item: TCurIngredient;
    readonly ingredient?: TIngredient;
}

export interface IAddBun {
    readonly type: typeof ADD_BUN;
    readonly bunIngredient: TIngredient | null
}

export interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export interface IClearConstructor {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export interface IRemoveCurrentIngredient {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly index: number;
    readonly ingredient: TIngredient;
}

export type TCurrentIngredientActions =
    | IAddCurrentIngredient
    | IRemoveCurrentIngredient
    | IAddBun
    | IMoveIngredient
    | IClearConstructor;

export const addIngredient = (ingredient: TIngredient): IAddCurrentIngredient => {
    const key=uniqid();
    return {
    type: ADD_INGREDIENT,
    item: {ingredient,
    key}
}
};


export const removeIngredient = (ingredient: TIngredient, index: number): IRemoveCurrentIngredient => ({
    type: REMOVE_INGREDIENT,
    index,
    ingredient,
});