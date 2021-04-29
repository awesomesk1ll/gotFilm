import axios from 'axios';
import { loadFilms, loadFilmsStarted, loadFilmsFailure } from './filmActions';
import { selectFilm, addToHistory, addToBlacklist, addToAlreadySeen, addToFavorites } from './filmActions';

/**
 * Сохраняет список в local storage
 * 
 * @param {string} listName - имя списка для сохранения.
 */
export const saveList = (listName) => {
    return (dispatch, getState) => {
        const { [listName]: list } = getState().filmReducer;
        localStorage.setItem(listName, JSON.stringify(list));
    }
};

/**
 * Добавляет фильм в список, затем сохраняет список в local storage
 * 
 * @param {number} filmId - id добавляемого фильма.
 * @param {string} [listName="history"] - имя списка для добавляемого фильма и сохранения.
 */
export const addToListAndSave = (filmId, listName = "history") => {
    return (dispatch, getState) => {
        switch (listName) {
            case "blacklist":
                dispatch(addToBlacklist(filmId));
                break;
            case "alreadySeen":
                dispatch(addToAlreadySeen(filmId));
                break;
            case "favorites":
                dispatch(addToFavorites(filmId));
                break;
            default:
                dispatch(addToHistory(filmId));
        }
        dispatch(saveList(listName));
    }
};

/**
 * Вычисляет случайный фильм отсутствующий в списках blacklist и alreadySeen, его добавляет в историю
 */
export const changeFilm = () => {
    return (dispatch, getState) => {
        const { films, blacklist, alreadySeen } = getState().filmReducer;
        let film, randomIndex;
        do {
            randomIndex = ~~(Math.random() * films.length);
            film = films[randomIndex];
        } while (
            blacklist.list[film.id] || alreadySeen.list[film.id]
        )
        dispatch(selectFilm(randomIndex));
        dispatch(addToListAndSave(film.id));
    }
};

/**
 * Загружает фильмы и запускает выбор одного из них
 */
export const fetchFilms = () => {
    return dispatch => {
        dispatch(loadFilmsStarted());

        axios.get("./films.json")
            .then(response => {
                dispatch(loadFilms(response.data));
                dispatch(changeFilm());
            })
            .catch(err => {
                dispatch(loadFilmsFailure(err.message));
            });
    }
};