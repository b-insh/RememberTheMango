import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

const _middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const createLogger = require(`redux-logger`);
  const logger = createLogger();
  _middlewares.push(logger);
}

const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(_middlewares)
  )
);

export default configureStore;
