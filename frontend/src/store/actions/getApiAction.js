import axios from 'axios';
import { loadFilms, loadFilmsStarted, loadFilmsFailure, getRandomFilm } from './filmActions';

export const getFilmsFromApi = () => {
    return async (dispatch) => {
        dispatch(loadFilmsStarted());

        await axios.get("./films.json")
            .then(response => {
                let randomFilm = Math.round(Math.random() * ((response.data.length - 1) - 0) + 0);
                dispatch(loadFilms(response.data));
                dispatch(getRandomFilm(randomFilm));
            })  
            .catch(err => {
                dispatch(loadFilmsFailure(err.message));
            });
    }
};