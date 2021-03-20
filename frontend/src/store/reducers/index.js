import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import filmReducer from './filmReducer';

export default history => combineReducers({
    router: connectRouter(history),
    filmReducer,
});