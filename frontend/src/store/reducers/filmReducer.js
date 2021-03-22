import update from 'react-addons-update';
import { FIND_FILM } from '../actions/filmActions';

const initStore = {
    films: []
}

export default function filmReducer(store = initStore, action) {
    switch (action.type) {
        case FIND_FILM:
            return update(store, {
                films: [...store.films]
            });
        default:
            return store;
    }
}

