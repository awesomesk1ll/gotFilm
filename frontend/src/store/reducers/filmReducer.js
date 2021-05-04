import update from 'react-addons-update';
import { ADD_TO_HISTORY, ADD_TO_ALREADY_SEEN, ADD_TO_BLACKLIST, LOAD_FILMS, SELECT_FILM, LOAD_FILMS_STARTED, LOAD_FILMS_FAILURE, CLEAR_LISTS, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, REMOVE_FROM_BLACKLIST, REMOVE_FROM_ALREADY_SEEN, REMOVE_FROM_HISTORY } from '../actions/filmActions';

const prepareList = (listName) => localStorage.getItem(listName) ? JSON.parse(localStorage.getItem(listName)) : { data: [], list: {} }

const initStore = {
    films: [],
    film: null,
    history: prepareList('history'),
    blacklist: prepareList('blacklist'),
    alreadySeen: prepareList('alreadySeen'),
    temporary: prepareList('temporary'),
    favorites: prepareList('favorites'),
    isLoading: false,
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
            let deleteFilm = store.history.data.find(film => film.id === action.filmId);
            store.history.data.splice(store.history.data.indexOf(deleteFilm), 1);
            delete store.history.list[action.filmId];
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
        case CLEAR_LISTS: {
            return update(store, {
                history: {
                    $set: {
                        data: [],
                        list: {}
                    }
                },
                favorites: {
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
