import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './components/App';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';

const middlewares = [thunk];
const store = createStore(reducer, applyMiddleware(...middlewares));

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)