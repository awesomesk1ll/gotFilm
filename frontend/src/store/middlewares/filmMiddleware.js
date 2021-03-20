import { findFilm, FIND_FILM } from '../actions/filmActions';

export default store => next => action => {
    switch (action.type) {
        case FIND_FILM:
            if(1) {
                const timeout = setTimeout(() => {
                    store.dispatch(findFilm);
                    clearTimeout(timeout);
                }, 1000);
            }
    }
    return next(action);
};