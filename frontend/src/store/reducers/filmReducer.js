import update from 'react-addons-update';
import { ADD_TO_HISTORY, ADD_TO_ALREADY_SEEN, ADD_TO_BLACKLIST, LOAD_FILMS, SELECT_FILM, LOAD_FILMS_STARTED, LOAD_FILMS_FAILURE, CLEAR_LISTS, ADD_TO_FAVORITES } from '../actions/filmActions';

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
                                status: 'ADDED'
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
