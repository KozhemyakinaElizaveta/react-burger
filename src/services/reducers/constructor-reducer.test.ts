import{ 
    ADD_BUN,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR,
    MOVE_INGREDIENT,
} from "../actions/constructor-action";
import {burgerConstructorReducer, constructorInitialState} from './constructor-reducer';

const ingredient = {
    "_id": "60666c42cc7b410027a1a9b6",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
};

describe('burger-constructor reducer', () => {
    it("should return the initial state", () => {
        expect(burgerConstructorReducer(undefined, undefined))
            .toEqual(constructorInitialState);
    });

    it("should handle ADD_BUN", () => {
        expect(burgerConstructorReducer(constructorInitialState, { type: ADD_BUN, bunIngredient: ingredient }))
            .toEqual({ ...constructorInitialState, bunIngredient: ingredient });
    });
    
    it("should handle ADD_INGREDIENT", () => {
        expect(burgerConstructorReducer(constructorInitialState, { type: ADD_INGREDIENT, item: ingredient }))
            .toEqual({ ...constructorInitialState, ingredients: [ingredient] });
    });
    
    it("should handle REMOVE_INGREDIENT", () => {
        expect(burgerConstructorReducer({ ...constructorInitialState, ingredients: [ingredient]}, { type: REMOVE_INGREDIENT, index: 0, ingredient: ingredient }))
            .toEqual({ ...constructorInitialState, ingredients: [] });
    });
    
    it("should handle MOVE_INGREDIENT", () => {
        const ingredient2 = { ...ingredient, name: "abc" };
        expect(burgerConstructorReducer({ ...constructorInitialState, ingredients: [ingredient, ingredient2]}, { type: MOVE_INGREDIENT, dragIndex: 0, hoverIndex: 1 }))
            .toEqual({ ...constructorInitialState, ingredients: [ingredient2, ingredient]});
    });

    it("should handle CLEAR_CONSTRUCTOR", () => {
        expect(burgerConstructorReducer(constructorInitialState, { type: CLEAR_CONSTRUCTOR }))
            .toEqual(constructorInitialState);
    });
});
