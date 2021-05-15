import update from 'react-addons-update';
import { ADD_TO_HISTORY, ADD_TO_ALREADY_SEEN, ADD_TO_BLACKLIST, ADD_TO_TEMPORARY, LOAD_FILMS, ADD_FILMS, SELECT_FILM, LOAD_FILMS_STARTED, LOAD_FILMS_FAILURE, CLEAR_LISTS, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, REMOVE_FROM_BLACKLIST, REMOVE_FROM_TEMPORARY, REMOVE_FROM_ALREADY_SEEN, REMOVE_FROM_HISTORY, SET_SETTINGS, CLEAR_SETTINGS, SHOW_NOTIFICATION, REMOVE_NOTIFICATION, SET_FILTERED_FILMS, LAZY_LOAD_STARTED, LAZY_LOAD_ENDED } from '../actions/filmActions';

const prepareList = (listName) => localStorage.getItem(listName) ? JSON.parse(localStorage.getItem(listName)) : { data: [], list: {} };
const prepareSettings = () => localStorage.getItem('settings') 
                            ? JSON.parse(localStorage.getItem('settings')) 
                            : { 
                                dark: false,
                                filters: {
                                    types: ['FILM', 'TV_SHOW'],
                                    genres: ['боевик','комедия', 'драма'],
                                    countries: ['Россия','США'],
                                    ratings: [7, 10],
                                    years: [1990, 2021]
                                }
                            };

const initStore = {
    films: [],
    filteredFilms: [],
    film: localStorage.getItem('film') ? JSON.parse(localStorage.getItem('film')) : null,
    history: prepareList('history'),
    blacklist: prepareList('blacklist'),
    alreadySeen: prepareList('alreadySeen'),
    temporary: { data: [], list: {} },
    favorites: prepareList('favorites'),
    settings: prepareSettings(),
    isLoading: false,
    notification: {message: '', description: ''},
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
        case LAZY_LOAD_STARTED: {
            return update(store, {
                isLazyLoading: {
                    $set: true
                }
            });
        }
        case LAZY_LOAD_ENDED: {
            return update(store, {
                isLazyLoading: {
                    $set: false
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
        case ADD_FILMS: {
            return update(store, {
                films: {
                    $set: [...store.films, ...action.films]
                }
            });
        }
        case SELECT_FILM: {
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
                                status: 'ADDED',
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
                                status: 'ADDED',
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
        case ADD_TO_TEMPORARY: {
            return update(store, {
                temporary: {
                    $merge: {
                        ...store.temporary,
                        data: [
                            ...store.temporary.data,
                            {
                                id: action.filmId,
                                timestamp: Date.now(),
                                status: 'ADDED',
                            }
                        ],
                        list: {
                            ...store.temporary.list,
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
                                status: 'ADDED',
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
        case ADD_TO_FAVORITES: {
            return update(store, {
                favorites: {
                    $merge: {
                        ...store.favorites,
                        data: [
                            ...store.favorites.data,
                            {
                                id: action.filmId,
                                timestamp: Date.now(),
                                status: 'ADDED',
                            }
                        ],
                        list: {
                            ...store.favorites.list,
                            [action.filmId]: true
                        }
                    }
                }
            });
        }
        case REMOVE_FROM_HISTORY: {
            let deleteFilm = store.history.data.find(film => (film.id === action.filmId && film.timestamp === action.timestamp));
            store.history.data.splice(store.history.data.indexOf(deleteFilm), 1);
            store.history.list[action.filmId] = store.history.data.some(film => film.id === action.filmId);
            return update(store, {
                history: {
                    $set: {...store.history}
                }
            });
        }
        case REMOVE_FROM_ALREADY_SEEN: {
            let deleteFilm = store.alreadySeen.data.find(film => film.id === action.filmId);
            store.alreadySeen.data.splice(store.alreadySeen.data.indexOf(deleteFilm), 1);
            delete store.alreadySeen.list[action.filmId];
            return update(store, {
                alreadySeen: {
                    $set: {...store.alreadySeen}
                }
            });
        }
        case REMOVE_FROM_BLACKLIST: {
            let deleteFilm = store.blacklist.data.find(film => film.id === action.filmId);
            store.blacklist.data.splice(store.blacklist.data.indexOf(deleteFilm), 1);
            delete store.blacklist.list[action.filmId];
            return update(store, {
                blacklist: {
                    $set: {...store.blacklist}
                }
            });
        }
        case REMOVE_FROM_TEMPORARY: {
            let deleteFilm = store.temporary.data.find(film => film.id === action.filmId);
            store.temporary.data.splice(store.temporary.data.indexOf(deleteFilm), 1);
            delete store.temporary.list[action.filmId];
            return update(store, {
                temporary: {
                    $set: {...store.temporary}
                }
            });
        }
        case REMOVE_FROM_FAVORITES: {
            let deleteFilm = store.favorites.data.find(film => film.id === action.filmId);
            store.favorites.data.splice(store.favorites.data.indexOf(deleteFilm), 1);
            delete store.favorites.list[action.filmId];
            return update(store, {
                favorites: {
                    $set: {...store.favorites}
                }
            });
        }
        case SHOW_NOTIFICATION: {
            return update(store, {
                notification: {
                    $set: {
                        message: action.message,
                        description: action.description,
                        type: action.notifyType
                    }
                }
            });
        }
        case REMOVE_NOTIFICATION: {
            return update(store, {
                notification: {
                    $set: {message: '', description: ''}
                }
            });
        }
        case CLEAR_LISTS: {
            return update(store, {
                history: {
                    $set: prepareList('history')
                },
                favorites: {
                    $set: prepareList('favorites')
                },
                alreadySeen: {
                    $set: prepareList('alreadySeen')
                },
                blacklist: {
                    $set: prepareList('blacklist')
                },
                temporary: {
                    $set: prepareList('temporary')
                }
            });
        }
        case SET_SETTINGS: {
            return update(store, {
                settings: {
                    $set: {
                        dark: action.settings.dark,
                        filters: {
                            types: [...action.settings.filters.types],
                            ratings: [...action.settings.filters.ratings],
                            years: [...action.settings.filters.years],
                            genres: [...action.settings.filters.genres],
                            countries: [...action.settings.filters.countries]
                        }
                    }
                }
            });
        }
        case CLEAR_SETTINGS: {
            return update(store, {
                settings: {
                    $set: prepareSettings()
                }
            });
        }
        case SET_FILTERED_FILMS: {
            return update(store, {
                filteredFilms: {
                    $set: [...action.films]
                }
            });
        }
        default:
            return store;
    }
}
