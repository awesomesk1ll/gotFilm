import update from 'react-addons-update';
import { ADD_TO_ALREADY_SEEN_FILMS, ADD_TO_BLACKLIST_FILMS, CHANGE_FILM, LOAD_FILMS, GET_RANDOM_FILM, UPDATE_FILTERED_FILMS} from '../actions/filmActions';

const initStore = {
    films: [],
    film: {},
    blacklistFilms: [],
    alreadySeenFilms: [],
    idFilmsFiltered: [],
}

export default function filmReducer(store = initStore, action) {
    switch (action.type) {
        case LOAD_FILMS: {
            return update(store, {
                films: {
                    $set: [...action.films]
                }
            });
        }
        case GET_RANDOM_FILM: {
            let randomFilm = Math.round(Math.random() * ((store.films.length - 1) - 0) + 0);
            return update(store, {
                film: {
                    $set: { ...store.films[randomFilm] }
                }
            });
        }
        case CHANGE_FILM: {
            return update(store, {
                film: {
                    $set: { ...store.idFilmsFiltered[action.film] }
                }
            });
        }
        case ADD_TO_BLACKLIST_FILMS: {
            return update(store, {
                blacklistFilms: {
                    $merge: [...store.blacklistFilms, action.film]
                }
            });
        }
        case ADD_TO_ALREADY_SEEN_FILMS: {
            return update(store, {
                alreadySeenFilms: {
                    $merge: [...store.alreadySeenFilms, action.film]
                }
            });
        }
        case UPDATE_FILTERED_FILMS: {
            return update(store, {
                idFilmsFiltered: {
                    $set: action.film
                }
            });
        }
        default:
            return store;
    }
}
