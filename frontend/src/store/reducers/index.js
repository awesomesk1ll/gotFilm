import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import filmReducer from './filmReducer';
import themeReducer from './themeReducer';

// eslint-disable-next-line
export default history => combineReducers({
    router: connectRouter(history),
    filmReducer,
    themeReducer,
});