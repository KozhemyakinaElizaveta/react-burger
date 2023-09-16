import {
    NO_INGREDIENT,
    INGREDIENT,
} from "../actions/ingredient-details-action";
import { detailsInitialState, ingredientDetailsReducer } from "./ingredient-details-reducer";

const selectIngredient = {
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

describe('ingredient-details reducer', () => {
    it("should return the initial state", () => {
        expect(ingredientDetailsReducer(undefined, undefined))
            .toEqual(detailsInitialState);
    });

    it("should handle INGREDIENT", () => {
        expect(ingredientDetailsReducer(detailsInitialState, { type: INGREDIENT, ingredient: selectIngredient}))
            .toEqual({ ...detailsInitialState, ingredient: selectIngredient });
    });

    it("should handle NO_INGREDIENT", () => {
        expect(ingredientDetailsReducer(detailsInitialState, { type: NO_INGREDIENT }))
            .toEqual({ ...detailsInitialState, ingredient: null });
    });
})