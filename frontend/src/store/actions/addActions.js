import { alreadySeenFilm, blacklistFilm, getRandomFilm } from './filmActions';

export const changeFilm = (film) => {
    return dispatch => {
        dispatch(getRandomFilm(film));
    }
};

export const addToBlacklistFilms = (film) => {
    return dispatch => {
        dispatch(blacklistFilm(film));
    }
};

export const addToAlreadySeenFilms = (film) => {
    return dispatch => {
        dispatch(alreadySeenFilm(film));
    }
};