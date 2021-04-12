import { getRandomFilm } from './filmActions';

export const changeFilm = () => {
    return (dispatch, getState) => {
        const { films, blacklistFilms, alreadySeenFilms } = getState().filmReducer;
        let film, randomIndex;
        do {
            randomIndex = ~~(Math.random() * films.length);
            film = films[randomIndex];
        } while (
            // eslint-disable-next-line
            blacklistFilms.some(item => item.id === film.id) ||
            // eslint-disable-next-line
            alreadySeenFilms.some(item => item.id === film.id)
        )
        dispatch(getRandomFilm(randomIndex));
    }
};