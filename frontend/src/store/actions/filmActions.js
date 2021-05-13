export const LOAD_FILMS = '@@film/LOAD_FILMS';
export const LOAD_FILMS_STARTED = '@@film/LOAD_FILMS_STARTED';
export const LOAD_FILMS_FAILURE = '@@film/LOAD_FILMS_FAILURE';
export const ADD_TO_HISTORY = '@@film/ADD_TO_HISTORY';
export const ADD_TO_BLACKLIST = '@@film/ADD_TO_BLACKLIST';
export const ADD_TO_TEMPORARY = '@@film/ADD_TO_TEMPORARY';
export const ADD_TO_ALREADY_SEEN = '@@film/ADD_TO_ALREADY_SEEN';
export const ADD_TO_FAVORITES = '@@film/ADD_TO_FAVORITES';
export const REMOVE_FROM_HISTORY = '@@film/REMOVE_FROM_HISTORY';
export const REMOVE_FROM_ALREADY_SEEN = '@@film/REMOVE_FROM_ALREADY_SEEN';
export const REMOVE_FROM_BLACKLIST = '@@film/REMOVE_FROM_BLACKLIST';
export const REMOVE_FROM_TEMPORARY = '@@film/REMOVE_FROM_TEMPORARY';
export const REMOVE_FROM_FAVORITES = '@@film/REMOVE_FROM_FAVORITES';
export const SET_SETTINGS = '@@settings/SET_SETTINGS';
export const CLEAR_SETTINGS = '@@settings/CLEAR_SETTINGS';
export const SHOW_NOTIFICATION = '@@film/SHOW_NOTIFICATION';
export const REMOVE_NOTIFICATION = '@@film/REMOVE_NOTIFICATION';
export const SELECT_FILM = '@@film/SELECT_FILM';
export const CLEAR_LISTS = '@@film/CLEAR_LISTS';

export const loadFilms = (films) => ({
    type: LOAD_FILMS,
    films
});

export const loadFilmsStarted = () => ({
    type: LOAD_FILMS_STARTED
});

export const loadFilmsFailure = (error) => ({
    type: LOAD_FILMS_FAILURE,
    error
});

export const selectFilm = (film) => ({
    type: SELECT_FILM,
    film
});

export const addToHistory = (filmId) => ({
    type: ADD_TO_HISTORY,
    filmId
});

export const addToBlacklist = (filmId) => ({
    type: ADD_TO_BLACKLIST,
    filmId
});

export const addToTemporary = (filmId) => ({
    type: ADD_TO_TEMPORARY,
    filmId
});

export const addToAlreadySeen = (filmId) => ({
    type: ADD_TO_ALREADY_SEEN,
    filmId
});

export const addToFavorites = (filmId) => ({
    type: ADD_TO_FAVORITES,
    filmId
});

export const removeFromHistory = (filmId) => ({
    type: REMOVE_FROM_HISTORY,
    filmId
});

export const removeFromAlreadySeen = (filmId) => ({
    type: REMOVE_FROM_ALREADY_SEEN,
    filmId
});

export const removeFromBlacklist = (filmId) => ({
    type: REMOVE_FROM_BLACKLIST,
    filmId
});

export const removeFromTemporary = (filmId) => ({
    type: REMOVE_FROM_TEMPORARY,
    filmId
});

export const removeFromFavorites = (filmId) => ({
    type: REMOVE_FROM_FAVORITES,
    filmId
});

export const clearLists = () => ({
    type: CLEAR_LISTS
});

export const clearSettings = () => ({
    type: CLEAR_SETTINGS
});

export const setSettings = (settings) => ({
    type: SET_SETTINGS,
    settings
});

export const showNotification = (notifyType, message, description) => ({
    type: SHOW_NOTIFICATION,
    notifyType,
    message,
    description
});

export const removeNotification = () => ({
    type: REMOVE_NOTIFICATION
});