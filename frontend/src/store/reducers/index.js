import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import filmReducer from './filmReducer';

// eslint-disable-next-line
export default history => combineReducers({
    router: connectRouter(history),
    filmReducer,
});