import update from 'react-addons-update';
import { ALREADY_SEEN_FILM, BLACKLIST_FILM, CHANGE_FILM, LOAD_FILMS } from '../actions/filmActions';

const initStore = {
    films: [],
    blacklistFilms: [],
    alreadySeenFilms: [],
    film: {}
}

export default function filmReducer(store = initStore, action) {
    switch (action.type) {
        case LOAD_FILMS: {
            let randomFilm = Math.round(Math.random() * ((store.films.length - 1) - 0) + 0);
            return update(store, {
                films: {
                    $set: [...action.films]
                },
                film: {
                    $set: { ...store.films[randomFilm] }
                }
            });
        }
        case CHANGE_FILM: {
            return update(store, {
                film: {
                    $set: { ...store.films[action.film] }
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
