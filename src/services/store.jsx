import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./reducers/ingredients-reducer";
// import { ingredientDetailsReducer } from "./ingredient-details";
// import { burgerConstructorReducer } from "./burger-constructor";
// import { orderDetailsReducer } from "./order-details";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer
});