export const LOAD_FILMS = '@@film/LOAD_FILMS';
export const LOAD_FILMS_STARTED = '@@film/LOAD_FILMS_STARTED';
export const LOAD_FILMS_FAILURE = '@@film/LOAD_FILMS_FAILURE';
export const BLACKLIST_FILM = '@@film/BLACKLIST_FILM';
export const ALREADY_SEEN_FILM = '@@film/ALREADY_SEEN_FILM';
export const GET_RANDOM_FILM = '@@film/GET_RANDOM_FILM';

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

export const getRandomFilm = (film) => ({
    type: GET_RANDOM_FILM,
    film
});

export const blacklistFilm = (film) => ({
    type: BLACKLIST_FILM,
    film
});

export const alreadySeenFilm = (film) => ({
    type: ALREADY_SEEN_FILM,
    film
});