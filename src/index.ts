import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {compose, applyMiddleware} from 'redux';
import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {rootReducer} from "./services/combine-reducers";
import { BrowserRouter } from 'react-router-dom';
import { store } from './utils/store'

const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <BrowserRouter>
    <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
