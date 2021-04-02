import axios from 'axios';
import { loadFilms, getRandomFilm } from './filmActions';

export const getFilmsFromApi = () => {
    return async (dispatch) => {
        await axios.get("./films.json")
            .then(response => {
                dispatch(loadFilms(response.data)); 
                dispatch(getRandomFilm());
            })
    }
};