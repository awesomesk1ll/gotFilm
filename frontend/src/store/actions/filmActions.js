export const LOAD_FILMS = '@@film/LOAD_FILMS';
export const ADD_TO_BLACKLIST_FILMS = '@@film/BLACKLIST_FILMS';
export const ADD_TO_ALREADY_SEEN_FILMS = '@@film/ALREADY_SEEN_FILMS';
export const CHANGE_FILM = '@@film/CHANGE_FILM';
export const GET_RANDOM_FILM = '@@film/GET_RANDOM_FILM';

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