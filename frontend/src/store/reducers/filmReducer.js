import update from 'react-addons-update';
import { ADD_TO_HISTORY, ADD_TO_ALREADY_SEEN, LOAD_FILMS, SELECT_FILM, CHANGE_FILM, LOAD_FILMS_STARTED, LOAD_FILMS_FAILURE, CLEAR_LISTS, GET_RANDOM_FILM, UPDATE_FILTERED_FILMS, UPDATE_FILTER_RATING, UPDATE_FILTER_YEAR, UPDATE_FILTER_GENRE, UPDATE_FILTER_COUNTRY, UPDATE_BUTTON_STATE, ADD_TO_BLACKLIST} from '../actions/filmActions';

const prepareList = (listName) => localStorage.getItem(listName) ? JSON.parse(localStorage.getItem(listName)) : { data: [], list: {} }

const initStore = {
    films: [],
    film: null,
    history: prepareList('history'),
    blacklist: prepareList('blacklist'),
    alreadySeen: prepareList('alreadyseen'),
    temporary: prepareList('temporary'),
    favorites: prepareList('favorites'),
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
        case SELECT_FILM: {
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
        case ADD_TO_HISTORY: {
            return update(store, {
                history: {
                    $merge: {
                        ...store.history,
                        data: [
                            ...store.history.data,
                            {
                                id: action.filmId,
                                timestamp: Date.now(),
                                status: 'ADDED'
                            }
                        ],
                        list: {
                            ...store.history.list,
                            [action.filmId]: true
                        }
                    }
                }
            });
        }
        case ADD_TO_BLACKLIST: {
            return update(store, {
                blacklist: {
                    $merge: {
                        ...store.blacklist,
                        data: [
                            ...store.blacklist.data,
                            {
                                id: action.filmId,
                                timestamp: Date.now(),
                                status: 'ADDED'
                            }
                        ],
                        list: {
                            ...store.blacklist.list,
                            [action.filmId]: true
                        }
                    }
                }
            });
        }
        case ADD_TO_ALREADY_SEEN: {
            return update(store, {
                alreadySeen: {
                    $merge: {
                        ...store.alreadySeen,
                        data: [
                            ...store.alreadySeen.data,
                            {
                                id: action.filmId,
                                timestamp: Date.now(),
                                status: 'ADDED'
                            }
                        ],
                        list: {
                            ...store.alreadySeen.list,
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
        case CLEAR_LISTS: {
            return update(store, {
                history: {
                    $set: {
                        data: [],
                        list: {}
                    }
                },
                alreadySeen: {
                    $set: {
                        data: [],
                        list: {}
                    }
                },
                blacklist: {
                    $set: {
                        data: [],
                        list: {}
                    }
                }
            });
        }
        default:
            return store;
    }
}
