import {
    INGREDIENTS_REQUEST,
    INGREDIENTS_SUCCESS,
    INGREDIENTS_ERROR,
} from "../actions/ingredients-action";
import { burgerIngredientsReducer, ingredientsInitialState } from "./ingredients-reducer";

const data = [
    {
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
        "__v": 0, 
        'counter': 0
    },
    {
        "_id": "60666c42cc7b410027a1a9b7",
        "name": "Соус Spicy-X",
        "type": "sauce",
        "proteins": 30,
        "fat": 20,
        "carbohydrates": 40,
        "calories": 30,
        "price": 90,
        "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        "__v": 0,
        'counter': 0
    }
];

describe('ingredients reducer', () => {
    it("should return the initial state", () => {
        expect(burgerIngredientsReducer(undefined, undefined))
            .toEqual(ingredientsInitialState);
    });

    it("should handle INGREDIENTS_REQUEST", () => {
        expect(burgerIngredientsReducer(ingredientsInitialState, { type: INGREDIENTS_REQUEST }))
            .toEqual({ ...ingredientsInitialState, fetchIngredientsRequest: true });
    });

    it("should handle INGREDIENTS_SUCCESS", () => {
        expect(burgerIngredientsReducer(ingredientsInitialState, { type: INGREDIENTS_SUCCESS, ingredients: data }))
            .toEqual({ ...ingredientsInitialState, fetchIngredientsRequest: false, fetchIngredientsError: false, ingredients: data });
    });

    it("should handle INGREDIENTS_ERROR", () => {
        expect(burgerIngredientsReducer(ingredientsInitialState, { type: INGREDIENTS_ERROR }))
            .toEqual({ ...ingredientsInitialState, fetchIngredientsRequest: false, fetchIngredientsError: true, ingredients: [] });
    });

});