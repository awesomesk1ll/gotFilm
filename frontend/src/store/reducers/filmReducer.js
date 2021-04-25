import update from 'react-addons-update';
import { ADD_TO_ALREADY_SEEN_FILMS, ADD_TO_BLACKLIST_FILMS, LOAD_FILMS, CHANGE_FILM, LOAD_FILMS_STARTED, LOAD_FILMS_FAILURE, GET_RANDOM_FILM, UPDATE_FILTERED_FILMS, UPDATE_FILTER_RATING, UPDATE_FILTER_YEAR, UPDATE_FILTER_GENRE, UPDATE_FILTER_COUNTRY, UPDATE_BUTTON_STATE} from '../actions/filmActions';

const initStore = {
    films: [],
    film: null,
    blacklistFilms: {
        data: [],
        list: {}
    },
    alreadySeenFilms: {
        data: [],
        list: {}
    },
    nextTime: {
        data: {},
        list: {}
    },
    isLoading: false,
    error: null,
    idFilmsFiltered: [],
    ratingFilter: [7,9],
    yearFilter: [1990, 2020],
    genreFilter: ['боевик','комедия'],
    countryFilter: ['Россия','США'],
    buttonState: false,
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
                    $set: { ...store.films.find((ele) => ele.id == action.filmId) }
                },
                isLoading: {
                    $set: false
                },
                error: {
                    $set: null
                }
            });
        }
        case ADD_TO_BLACKLIST_FILMS: {
            return update(store, {
                blacklistFilms: {
                    $merge: {
                        ...store.blacklistFilms,
                        data: [
                            ...store.blacklistFilms.data,
                            {
                                id: action.filmId,
                                timestamp: Date.now(),
                                status: 'ADDED'
                            }
                        ],
                        list: {
                            ...store.blacklistFilms.list,
                            [action.filmId]: true
                        }
                    }
                }
            });
        }
        case ADD_TO_ALREADY_SEEN_FILMS: {
            return update(store, {
                alreadySeenFilms: {
                    $merge: {
                        ...store.alreadySeenFilms,
                        data: [
                            ...store.alreadySeenFilms.data,
                            {
                                id: action.filmId,
                                timestamp: Date.now(),
                                status: 'ADDED'
                            }
                        ],
                        list: {
                            ...store.alreadySeenFilms.list,
                            [action.filmId]: true
                        }
                    }
                }
            });
        }
        case UPDATE_FILTERED_FILMS: {
            return update(store, {
                idFilmsFiltered: {
                    $set: action.filmId
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
            });
        }
        default:
            return store;
    }
}
