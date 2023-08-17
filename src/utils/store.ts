import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../services/combine-reducers';
import { TOrder } from './types';

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const getAuth = (store: RootState) => store.authReducer
export const getOrderDetails = (store: RootState) => store.orderDetails as { orderId: TOrder, makeOrderRequestInProgress: boolean }
export const getConstructorIngredients = (store: RootState) => store.burgerConstructor
export const getIngredients = (store: RootState) => store.burgerIngredients.ingredients
export const getReturnUrl = (store: RootState) => store.returnUrlReducer.url
export const getResetEmail = (store: RootState) => store.sendResetEmailReducer