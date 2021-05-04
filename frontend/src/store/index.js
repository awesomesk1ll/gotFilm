import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import RootReducers from './reducers';
import middlewares from './middlewares';

export const history = createBrowserHistory();

// тернарник внутри compose не сработает
const composer = window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(
    applyMiddleware(routerMiddleware(history), thunk, ...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__(),
) : compose(
    applyMiddleware(routerMiddleware(history), thunk, ...middlewares),
);

export const store = createStore(
    RootReducers(history),
    composer,
);
