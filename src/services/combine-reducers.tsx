import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./reducers/ingredients-reducer";
import { ingredientDetailsReducer } from "./reducers/ingredient-details-reducer";
import { burgerConstructorReducer } from "./reducers/constructor-reducer";
import { orderDetailsReducer } from "./reducers/order-details-reducer";
import { authReducer, returnUrlReducer, sendResetEmailReducer, resetPasswordReducer } from './reducers/auth-reducer'

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    authReducer,
    returnUrlReducer,
    sendResetEmailReducer,
    resetPasswordReducer
});