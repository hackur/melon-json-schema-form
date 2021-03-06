/**
 * @file SimpleDemo
 * @author leon <ludafa@outlook.com>
 */

import ReactDOM from 'react-dom';
import React from 'react';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {fill, createReducer} from '../../src/index';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import {model} from './constants';
import schema from './schema';
import App from './App';

import './index.styl';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    combineReducers({
        [model]: createReducer(
            model,
            fill({flow: '1000', cost: '0'}, schema)
        )
    }),
    composeEnhancers(
        applyMiddleware(
            thunk,
            logger({
                collapsed: true,
                logErrors: false
            })
        )
    )
);



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#app')
);
