import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form'

import filmReducer from './filmReducer';

export default history => combineReducers({
    router: connectRouter(history),
    filmReducer,
    form: formReducer,
});