export const LOAD_FILMS = '@@film/LOAD_FILMS';
export const ADD_TO_BLACKLIST_FILMS = '@@film/BLACKLIST_FILMS';
export const ADD_TO_ALREADY_SEEN_FILMS = '@@film/ALREADY_SEEN_FILMS';
export const CHANGE_FILM = '@@film/CHANGE_FILM';
export const GET_RANDOM_FILM = '@@film/GET_RANDOM_FILM';
export const UPDATE_FILTERED_FILMS = '@@film/UPDATE_FILTERED_FILMS';
export const UPDATE_FILTER_RATING = '@@film/UPDATE_FILTER_RATING';
export const UPDATE_FILTER_YEAR = '@@film/UPDATE_FILTER_YEAR';
export const UPDATE_FILTER_GENRE = '@@film/UPDATE_FILTER_GENRE';
export const UPDATE_FILTER_COUNTRY = '@@film/UPDATE_FILTER_COUNTRY';
export const UPDATE_BUTTON_STATE = '@@film/UPDATE_BUTTON_STATE';

export const changeFilm = (film) => ({
    type: CHANGE_FILM,
    film
});

export const getRandomFilm = () => ({
    type: GET_RANDOM_FILM,
});

export const loadFilms = (films) => ({
    type: LOAD_FILMS,
    films
});

export const addToBlacklistFilms = (film) => ({
    type: ADD_TO_BLACKLIST_FILMS,
    film
});

export const addToAlreadySeenFilms = (film) => ({
    type: ADD_TO_ALREADY_SEEN_FILMS,
    film
});

export const updateFilteredFilms = (film) => ({
    type: UPDATE_FILTERED_FILMS,
    film
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
