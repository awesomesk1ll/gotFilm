import axios from 'axios';
import { loadFilms, loadFilmsStarted, loadFilmsFailure } from './filmActions';
import { selectFilm, addToHistory, addToBlacklist, addToAlreadySeen, addToFavorites, removeFromAlreadySeen, removeFromBlacklist, removeFromFavorites, removeFromHistory } from './filmActions';
import { setSettings } from './filmActions';

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
 * Заменяет текущие настройки и сохраняет их в localStorage
 * 
 * @param {object} settings - новый объект настроек.
 */
 export const setSettingsAndSave = (settings) => {
    return (dispatch, getState) => {
        dispatch(setSettings(settings));
        dispatch(saveList('settings'));
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
 * Удаляет фильм из списка, затем сохраняет список в local storage
 * 
 * @param {number} filmId - id удаляемого фильма.
 * @param {string} [listName="history"] - имя списка для удаляемого фильма и сохранения.
 */
export const removeFromListAndSave = (filmId, listName = "history") => {
    return (dispatch, getState) => {
        switch (listName) {
            case "blacklist":
                dispatch(removeFromBlacklist(filmId));
                break;
            case "alreadySeen":
                dispatch(removeFromAlreadySeen(filmId));
                break;
            case "favorites":
                dispatch(removeFromFavorites(filmId));
                break;
            default:
                dispatch(removeFromHistory(filmId));
        }
        dispatch(saveList(listName));
    }
};

/**
 * 
 * @param {number} filmId - id фильма.
 * @param {*} listName - имя списка для добавления/удаления фильма. По умолчанию - избранные фильмы.
 */
export const favoriteIconPush = (filmId, listName = "favorites") => {
    return (dispatch, getState) => {
        const { favorites } = getState().filmReducer;
        let checkList = favorites.data.find(item => item.id === filmId);
        if (!checkList) {
            dispatch(addToListAndSave(filmId, listName));
        } else {
            dispatch(removeFromListAndSave(filmId, listName));
        }
    }
};

/**
 * Вычисляет случайный фильм отсутствующий в списках blacklist и alreadySeen, его добавляет в историю
 */
export const changeFilm = () => {
    return (dispatch, getState) => {
        const { films, blacklist, alreadySeen, settings } = getState().filmReducer;
        const { types, ratings, years, genres, countries } = settings.filters;
        // фильтры
        const typesFilter = (film) => (types.length !== 1 || film.type === types[0]);
        const ratingsFilter = (film) => (film.rate > ratings[0] && film.rate < ratings[1]);
        const yearsFilter = (film) => (film.year > years[0] && film.year < years[1]);
        const genresFilter = (film) => film.genres.some(genre => genres.includes(genre));
        const countriesFilter = (film) => film.countries.some(country => countries.includes(country));
        const blacklistFilter = (film) => !!!blacklist.list[film.id];
        const alreadySeenFilter = (film) => !!!alreadySeen.list[film.id];
        const appendFilters = (film) => [typesFilter, ratingsFilter, yearsFilter, genresFilter, countriesFilter, blacklistFilter, alreadySeenFilter].every(filter => filter(film));

        // фильтрация и сортировка по ранкингу кинопоиска
        const filteredFilms = films.filter(film => appendFilters(film)).sort((a, b) => a.kpOrder - b.kpOrder);

        let film, randomIndex = 0;

        // случайный выбор фильма (если фильмов больше 4 то отсекаем вторую половину по ранкингу кинопоиска)
        randomIndex = ~~(Math.random() * ((filteredFilms.length > 4) ? filteredFilms.length * 0.5 : filteredFilms.length));
        film = filteredFilms[randomIndex];

        // выбор фильма по порядку в ранкинге кинопоиска
        // film = filteredFilms[randomIndex++];
        
        dispatch(selectFilm(films.findIndex(elem => elem === film)));
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