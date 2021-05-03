export const LOAD_FILMS = '@@film/LOAD_FILMS';
export const LOAD_FILMS_STARTED = '@@film/LOAD_FILMS_STARTED';
export const LOAD_FILMS_FAILURE = '@@film/LOAD_FILMS_FAILURE';
<<<<<<< HEAD
export const ADD_TO_BLACKLIST_FILMS = '@@film/ADD_TO_BLACKLIST_FILMS';
export const ADD_TO_ALREADY_SEEN_FILMS = '@@film/ADD_TO_ALREADY_SEEN_FILMS';
export const GET_RANDOM_FILM = '@@film/GET_RANDOM_FILM';
export const UPDATE_FILTERED_FILMS = '@@film/UPDATE_FILTERED_FILMS';
export const UPDATE_FILTER_RATING = '@@film/UPDATE_FILTER_RATING';
export const UPDATE_FILTER_YEAR = '@@film/UPDATE_FILTER_YEAR';
export const UPDATE_FILTER_GENRE = '@@film/UPDATE_FILTER_GENRE';
export const UPDATE_FILTER_COUNTRY = '@@film/UPDATE_FILTER_COUNTRY';
export const UPDATE_BUTTON_STATE = '@@film/UPDATE_BUTTON_STATE';
=======
export const ADD_TO_HISTORY = '@@film/ADD_TO_HISTORY';
export const ADD_TO_BLACKLIST = '@@film/ADD_TO_BLACKLIST';
export const ADD_TO_ALREADY_SEEN = '@@film/ADD_TO_ALREADY_SEEN';
export const SELECT_FILM = '@@film/SELECT_FILM';
export const CLEAR_LISTS = '@@film/CLEAR_LISTS';
>>>>>>> 21c92b12350bdc12e9608725cf89f25da72e5906

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

<<<<<<< HEAD
export const getRandomFilm = (filmId) => ({
    type: GET_RANDOM_FILM,
    filmId
=======
export const selectFilm = (film) => ({
    type: SELECT_FILM,
    film
>>>>>>> 21c92b12350bdc12e9608725cf89f25da72e5906
});

export const addToHistory = (filmId) => ({
    type: ADD_TO_HISTORY,
    filmId
});

export const addToBlacklist = (filmId) => ({
    type: ADD_TO_BLACKLIST,
    filmId
});

<<<<<<< HEAD
export const updateFilteredFilms = (filmId) => ({
    type: UPDATE_FILTERED_FILMS,
    filmId
});

export const updateFilterRating = (value) => ({
    type: UPDATE_FILTER_RATING,
    value
});

export const updateFilterYear = (value) => ({
    type: UPDATE_FILTER_YEAR,
    value
});
export const updateFilterGenre = (value) => ({
    type: UPDATE_FILTER_GENRE,
    value
});
export const updateFilterCountry = (value) => ({
    type: UPDATE_FILTER_COUNTRY,
    value
});
export const updateButtonState = (value) => ({
    type: UPDATE_BUTTON_STATE,
    value
});
=======
export const addToAlreadySeen = (filmId) => ({
    type: ADD_TO_ALREADY_SEEN,
    filmId
});

export const clearLists = () => ({
    type: CLEAR_LISTS
});
>>>>>>> 21c92b12350bdc12e9608725cf89f25da72e5906
