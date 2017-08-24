import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAIL = 'FAIL';


let createStoreWithMiddleware = createStore;

if (process.env.NODE_ENV === 'production') {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware({
      promiseTypeSuffixes: [REQUEST, SUCCESS, FAIL],
    })
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    createLogger,
    promiseMiddleware({
      promiseTypeSuffixes: [REQUEST, SUCCESS, FAIL],
    })
  )(createStore);
}

export default function configureStore(rootReducer, initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
