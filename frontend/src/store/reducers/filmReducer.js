import update from 'react-addons-update';
import { ALREADY_SEEN_FILM, BLACKLIST_FILM, LOAD_FILMS, GET_RANDOM_FILM, LOAD_FILMS_STARTED, LOAD_FILMS_FAILURE } from '../actions/filmActions';

const initStore = {
    films: [],
    film: null,
    blacklistFilms: [],
    alreadySeenFilms: [],
    isLoading: true,
    error: null
}

export default function filmReducer(store = initStore, action) {
    switch (action.type) {
        case LOAD_FILMS_STARTED: {
            return update(store, {
                isLoading: {
                    $set: true
                }
            });
        }
        case LOAD_FILMS_FAILURE: {
            return update(store, {
                isLoading: {
                    $set: false
                },
                error: {
                    $set: action.error
                }
            });
        }
        case LOAD_FILMS: {
            return update(store, {
                films: {
                    $set: [...action.films]
                },
                error: {
                    $set: null
                }
            });
        }
        case GET_RANDOM_FILM: {
            return update(store, {
                film: {
                    $set: { ...store.films[action.film] }
                },
                isLoading: {
                    $set: false
                },
                error: {
                    $set: null
                }
            });
        }
        case BLACKLIST_FILM: {
            return update(store, {
                blacklistFilms: {
                    $merge: [...store.blacklistFilms, action.film]
                }
            });
        }
        case ALREADY_SEEN_FILM: {
            return update(store, {
                alreadySeenFilms: {
                    $merge: [...store.alreadySeenFilms, action.film]
                }
            });
        }
        default:
            return store;
    }
}
