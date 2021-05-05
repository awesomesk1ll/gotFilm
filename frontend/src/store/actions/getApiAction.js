
import axios from 'axios';
import { loadFilms, loadFilmsStarted, loadFilmsFailure } from './filmActions';

export const fetchFilms = () => {
    return dispatch => {
        dispatch(loadFilmsStarted());

        axios.get("./films.json")
            .then(response => {
                let randomIndex = ~~(Math.random() * response.data.length);
                dispatch(loadFilms(response.data));
                //dispatch(getRandomFilm(response.data[randomIndex].id));
            })
            .catch(err => {
                dispatch(loadFilmsFailure(err.message));
            });
    }
};
