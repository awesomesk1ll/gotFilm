import { getRandomFilm } from './filmActions';

export const changeFilm = () => {
    return (dispatch, getState) => {
        const { films, blacklistFilms, alreadySeenFilms } = getState().filmReducer;
        let film, randomIndex;
        do {
            randomIndex = ~~(Math.random() * films.length);
            film = films[randomIndex];
        } while (
            blacklistFilms.list[film.id]||
            alreadySeenFilms.list[film.id]
        )
        dispatch(getRandomFilm(randomIndex));
    }
};