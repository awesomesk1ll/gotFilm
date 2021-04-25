import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

import RootReducers from './reducers';
import middlewares from './middlewares';

export const history = createBrowserHistory();

const persistConfig = {
    key: 'filmSearch',
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['filmReducer'],
};

// тернарник внутри compose не сработает
const composer = window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(
    applyMiddleware(routerMiddleware(history), thunk, ...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__(),
) : compose(
    applyMiddleware(routerMiddleware(history), thunk, ...middlewares),
);

export const store = createStore(
    persistReducer(persistConfig, RootReducers(history)),
    composer,
);

export const persistor = persistStore(store);
