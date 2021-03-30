import axios from 'axios';

export const LOAD_FILMS = '@@film/LOAD_FILMS';
export const BLACKLIST_FILM = '@@film/BLACKLIST_FILM';
export const ALREADY_SEEN_FILM = '@@film/ALREADY_SEEN_FILM';
export const CHANGE_FILM = '@@film/CHANGE_FILM';

export const changeFilm = (film) => ({
    type: CHANGE_FILM,
    film
});

export const loadFilms = (films) => ({
    type: LOAD_FILMS,
    films
});

export const blacklistFilm = (film) => ({
    type: BLACKLIST_FILM,
    film
});

export const alreadySeenFilm = (film) => ({
    type: ALREADY_SEEN_FILM,
    film
});

export const getFilmsFromApi = () => {
    return async (dispatch) => {
        await axios.get("./films.json")
            .then(response => {
                dispatch(loadFilms(response.data));
            })
    }
}