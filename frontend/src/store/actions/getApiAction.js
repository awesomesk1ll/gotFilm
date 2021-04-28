
import axios from 'axios';
import { loadFilms, loadFilmsStarted, loadFilmsFailure, getRandomFilm, addToHistory } from './filmActions';

export const fetchFilms = () => {
    return dispatch => {
        dispatch(loadFilmsStarted());

        axios.get("./films.json")
            .then(response => {
                let randomIndex = ~~(Math.random() * response.data.length);
                dispatch(loadFilms(response.data));
                dispatch(addToHistory(randomIndex));
                dispatch(getRandomFilm(randomIndex));
            })
            .catch(err => {
                dispatch(loadFilmsFailure(err.message));
            });
    }
};