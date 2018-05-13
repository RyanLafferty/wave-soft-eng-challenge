import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { logger } from 'redux-logger';
import { applyMiddleware } from 'redux';

const middlewares = [
    promise(),
    thunk,
    logger
];

const Middleware = applyMiddleware(...middlewares);

export {
    Middleware
}