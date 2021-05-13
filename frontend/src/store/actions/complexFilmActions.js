import axios from 'axios';
import { loadFilms, loadFilmsStarted, loadFilmsFailure, showNotification } from './filmActions';
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
 * Отправляет уведомление для страницы фильмов при маленькой выборке
 * 
 * @param {number} count - количество фильмов в текущей выборке.
 */
 export const noFilmsNotification = (count) => {
    const getFilmWords = () => {
        const titles = [`остался ${count} фильм`, `осталось ${count} фильма`, `осталось ${count} фильмов`];
        const cases = [2, 0, 1, 1, 1, 2];  
        return titles[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5] ];  
    }
    count--;
    return (dispatch) => {
        if (count > 0){
            dispatch(showNotification(
                'warning',
                'Выборка фильмов заканчивается',
                `В текущей выборке ${getFilmWords()}. Измените настройки поиска на более широкие.`,
            ))
        } else {
            dispatch(showNotification(
                'error',
                'Выборка фильмов пуста',
                'В текущей выборке не осталось фильмов. Поиск недоступен. Измените настройки поиска на более широкие.',
            ))
        }
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
        dispatch(showNotification(
            'success',
            'Настройки успешно сохранены',
            'Выполнен новый поиск в соответствии с запросом.',
        ));
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
 * Действие нажатия на кнопку закладки
 * 
 * @param {number} filmId - id фильма.
 * @param {string} [listName="favorites"] - имя списка для добавления/удаления фильма. По умолчанию - избранные фильмы.
 */
export const favoriteIconPush = (filmId, listName = "favorites") => {
    return (dispatch, getState) => {
        const { [listName]: list } = getState().filmReducer;
        if (list.list[filmId]) {
            dispatch(removeFromListAndSave(filmId, listName));
        } else {
            dispatch(addToListAndSave(filmId, listName));
        }
    }
};

/**
 * Рассчитывает с учётом фильтров следующий фильм для показа, 
 * в случае успеха добавляет его в историю и показывает
 * в случае неудачи показывает уведомление
 */
export const changeFilm = () => {
    return (dispatch, getState) => {
        let film, randomIndex = 0;
        const { films, blacklist, alreadySeen, temporary, settings, history, film: current } = getState().filmReducer;
        const { types, ratings, years, genres, countries } = settings.filters;
        // фильтры
        const typesFilter = (film) => (types.length !== 1 || film.type === types[0]);
        const ratingsFilter = (film) => (film.rate > ratings[0] && film.rate < ratings[1]);
        const yearsFilter = (film) => (film.year > years[0] && film.year < years[1]);
        const genresFilter = (film) => film.genres.some(genre => genres.includes(genre));
        const countriesFilter = (film) => film.countries.some(country => countries.includes(country));
        const blacklistFilter = (film) => !!!blacklist.list[film.id];
        const alreadySeenFilter = (film) => !!!alreadySeen.list[film.id];
        const temporaryFilter = (film) => !!!temporary.list[film.id];
        const noCurrentFilter = (film) => !!!current || (film.id !== current.id);

        // фильтр всё в одном
        const appendFilters = (film) => [
            typesFilter, 
            ratingsFilter, 
            yearsFilter, 
            genresFilter, 
            countriesFilter, 
            blacklistFilter, 
            alreadySeenFilter,
            temporaryFilter,
            noCurrentFilter
        ].every(filter => filter(film));

        // фильтрация и сортировка по ранкингу кинопоиска
        const filteredFilms = films.filter(film => appendFilters(film)).sort((a, b) => a.kpOrder - b.kpOrder);

        if (current === null) {
            if (history.data.length) {
                const historyLast = history.data.reverse()[0];
                return dispatch(selectFilm(films.findIndex(elem => elem.id === historyLast.id)));
            } else if (!filteredFilms.length) {
                dispatch(selectFilm(0));
                return dispatch(loadFilmsFailure('Ошибка загрузки фильма. Попробуйте сбросить настройки.'));
            }
        }

        if (filteredFilms.length - 1 < 4) {dispatch(noFilmsNotification(filteredFilms.length));};
        // если следующих фильмов нет, то показали уведомление (выше) и больше ничего не делаем
        if (current && filteredFilms.length === 0) {return;};

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