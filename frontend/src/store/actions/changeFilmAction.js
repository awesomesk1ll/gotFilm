import { getRandomFilm } from './filmActions';

export const changeFilm = () => {
    return (dispatch, getState) => {
        const { idFilmsFiltered, blacklistFilms, alreadySeenFilms } = getState().filmReducer;
        let filmId, randomIndex;
        do {
            randomIndex = ~~(Math.random() * idFilmsFiltered.length);
            filmId = idFilmsFiltered[randomIndex];
        } while (
            blacklistFilms.list[filmId]||
            alreadySeenFilms.list[filmId]
        )
        dispatch(getRandomFilm(filmId));
    }
};
