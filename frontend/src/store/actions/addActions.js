import { alreadySeenFilm, blacklistFilm, getRandomFilm } from './filmActions';

export const changeFilm = () => {
    return (dispatch, getState) => {
        const { films, blacklistFilms, alreadySeenFilms } = getState().filmReducer;
        let randomFilm = Math.round(Math.random() * ((films.length - 1) - 0) + 0);
        let checkBlackFilm = blacklistFilms.find(item => item.id === films[randomFilm].id);
        let checkSeenFilm = alreadySeenFilms.find(item => item.id === films[randomFilm].id);
        if (checkBlackFilm === undefined && checkSeenFilm === undefined) {
            dispatch(getRandomFilm(randomFilm));
        }
    }
};

export const addToBlacklistFilms = () => {
    return (dispatch, getState) => {
        const { film, blacklistFilms, alreadySeenFilms } = getState().filmReducer;
        let checkBlackFilm = blacklistFilms.find(item => item.id === film.id);
        let checkSeenFilm = alreadySeenFilms.find(item => item.id === film.id);
        if (checkBlackFilm === undefined && checkSeenFilm === undefined) {
            dispatch(blacklistFilm(film));
        }
    }
};

export const addToAlreadySeenFilms = () => {
    return (dispatch, getState) => {
        const { film, alreadySeenFilms, blacklistFilms } = getState().filmReducer;
        let checkBlackFilm = blacklistFilms.find(item => item.id === film.id);
        let checkSeenFilm = alreadySeenFilms.find(item => item.id === film.id);
        if (checkBlackFilm === undefined && checkSeenFilm === undefined) {
            dispatch(alreadySeenFilm(film));
        }
    }
};