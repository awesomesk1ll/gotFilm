import update from 'react-addons-update';
import { ADD_TO_ALREADY_SEEN_FILMS, ADD_TO_BLACKLIST_FILMS, CHANGE_FILM, LOAD_FILMS, GET_RANDOM_FILM, UPDATE_FILTERED_FILMS, UPDATE_FILTER_RATING, UPDATE_FILTER_YEAR, UPDATE_FILTER_GENRE, UPDATE_FILTER_COUNTRY, UPDATE_BUTTON_STATE} from '../actions/filmActions';

const initStore = {
    films: [],
    film: {},
    blacklistFilms: [],
    alreadySeenFilms: [],
    idFilmsFiltered: [],
    ratingFilter: [7,9],
    yearFilter: [1990, 2020],
    genreFilter: ['боевик','комедия'],
    countryFilter: ['Россия','США'],
    buttonState: false,
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
        case UPDATE_FILTER_RATING: {
            return update(store, {
                ratingFilter: {
                    $set: action.value
                }
            });
        }
        case UPDATE_FILTER_YEAR: {
            return update(store, {
                yearFilter: {
                    $set: action.value
                }
            });
        }
        case UPDATE_FILTER_GENRE: {
            return update(store, {
                genreFilter: {
                    $set: action.value
                }
            });
        }
        case UPDATE_FILTER_COUNTRY: {
            return update(store, {
                countryFilter: {
                    $set: action.value
                }
            });
        }
        case UPDATE_BUTTON_STATE: {
            return update(store, {
                buttonState: {
                    $set: action.value
                }
            })
        }
        default:
            return store;
    }
}
