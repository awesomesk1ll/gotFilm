import axios from 'axios';
import { loadFilms, loadFilmsStarted, loadFilmsFailure, addFilms, lazyLoadFilmsStarted, lazyLoadFilmsEnded, setFilteredFilms, showNotification } from './filmActions';
import { selectFilm, addToHistory, addToBlacklist, addToAlreadySeen, addToFavorites, removeFromAlreadySeen, removeFromBlacklist, removeFromFavorites, removeFromHistory } from './filmActions';
import { setSettings } from './filmActions';

/**
 * Сохраняет что-то из redux в local storage
 * 
 * @param {string} someName - имя чего-то для сохранения.
 */
export const saveFromRedux = (someName) => {
    return (dispatch, getState) => {
        const { [someName]: something } = getState().filmReducer;
        localStorage.setItem(someName, JSON.stringify(something));
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
 * Фильтрует фильмы в соответствии с настройками и записывает их в filteredFilms
 */
 export const createFilteredFilms = () => {
    return (dispatch, getState) => {
        const { films, settings } = getState().filmReducer;
        const { types, ratings, years, genres, countries } = settings.filters;
        const skipGenres = !genres.length || genres.includes('Все');
        const skipCountries = !countries.length || countries.includes('Все');
        // фильтры настроек
        const typesFilter = (film) => (types.length !== 1 || film.type === types[0]);
        const ratingsFilter = (film) => (film.rate >= ratings[0] && film.rate <= ratings[1]);
        const yearsFilter = (film) => (film.year >= years[0] && film.year <= years[1]);
        const genresFilter = (film) => skipGenres || film.genres.some(genre => genres.includes(genre));
        const countriesFilter = (film) => skipCountries || film.countries.some(country => countries.includes(country));

        // фильтр всё в одном
        const appendFilters = (film) => [ typesFilter, ratingsFilter, yearsFilter, genresFilter, countriesFilter ].every(filter => filter(film));

        // фильтрация и сортировка по ранкингу кинопоиска
        const filteredFilms = films.filter(film => appendFilters(film)).sort((a, b) => a.kpOrder - b.kpOrder);
        
        dispatch(setFilteredFilms(filteredFilms));
    }
};


/**
 * Заменяет текущие настройки и сохраняет их в localStorage
 * 
 * @param {object} settings - новый объект настроек.
 */
export const setSettingsAndSave = (settings) => {
    return (dispatch, getState) => {
        const { settings: storedSettings } = getState().filmReducer;
        const { types: typesPrev, ratings: ratingsPrev, years: yearsPrev, genres: genresPrev, countries: countriesPrev } = storedSettings.filters;
        const { types, ratings, years, genres, countries } = settings.filters;
        const filtersPrev = [ ...typesPrev, ...ratingsPrev, ...yearsPrev, ...genresPrev, ...countriesPrev ];
        const filters = [ ...types, ...ratings, ...years, ...genres, ...countries ];
        const settingsChanged = filters.some((value, index) => value !== filtersPrev[index]);

        dispatch(setSettings(settings));
        dispatch(saveFromRedux('settings'));
        if (settingsChanged) {
            dispatch(createFilteredFilms());
            dispatch(showNotification(
                'success',
                'Настройки успешно сохранены',
                'Настройки поиска применятся при следующем переключении фильма.',
            ));
        };
    }
};

/**
 * Добавляет фильм в список, затем сохраняет список в local storage
 * 
 * @param {number} filmId - id добавляемого фильма.
 * @param {string} [listName="history"] - имя списка для добавляемого фильма и сохранения.
 */
export const addToListAndSave = (filmId, listName = "history") => {
    return (dispatch) => {
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
        dispatch(saveFromRedux(listName));
    }
};

/**
 * Удаляет фильм из списка, затем сохраняет список в local storage
 * 
 * @param {number} filmId - id удаляемого фильма.
 * @param {string} [listName="history"] - имя списка для удаляемого фильма и сохранения (опционально).
 * @param {number} [timestamp=0] - таймштамп добавления в список, для списка history.
 */
export const removeFromListAndSave = (filmId, listName = "history", timestamp = 0) => {
    return (dispatch) => {
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
                dispatch(removeFromHistory(filmId, timestamp));
        }
        dispatch(saveFromRedux(listName));
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
 * Запускает выбор фильма и сохраняет его в local storage
 * 
 * @param {number} index - index фильма в films.
 */
 export const loadFilm = (index) => {
    return dispatch => {
        dispatch(selectFilm(index));
        dispatch(saveFromRedux('film'));
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
        const { films, filteredFilms, blacklist, alreadySeen, temporary, history, film: current } = getState().filmReducer;
        // фильтры списков и не текущий
        const blacklistFilter = (film) => !!!blacklist.list[film.id];
        const alreadySeenFilter = (film) => !!!alreadySeen.list[film.id];
        const temporaryFilter = (film) => !!!temporary.list[film.id];
        const noCurrentFilter = (film) => !!!current || (film.id !== current.id);

        // фильтр всё в одном
        const appendFilters = (film) => [
            blacklistFilter, 
            alreadySeenFilter,
            temporaryFilter,
            noCurrentFilter
        ].every(filter => filter(film));

        // фильтрация итоговая
        const preparedFilms = filteredFilms.filter(film => appendFilters(film));

        if (current === null) {
            if (history.data.length) {
                const historyLast = history.data.reverse()[0];
                return dispatch(loadFilm(films.findIndex(elem => elem.id === historyLast.id)));
            } else if (!preparedFilms.length) {
                dispatch(selectFilm(0));
                return dispatch(loadFilmsFailure('Ошибка загрузки фильма. Попробуйте сбросить настройки.'));
            }
        }

        if (preparedFilms.length - 1 < 4) {dispatch(noFilmsNotification(preparedFilms.length));};
        // если следующих фильмов нет, то показали уведомление (выше) и больше ничего не делаем
        if (current && preparedFilms.length === 0) {return;};

        // случайный выбор фильма (если фильмов больше 4 то отсекаем вторую половину по ранкингу кинопоиска)
        randomIndex = ~~(Math.random() * ((preparedFilms.length > 4) ? preparedFilms.length * 0.5 : preparedFilms.length));
        film = preparedFilms[randomIndex];

        // выбор фильма по порядку в ранкинге кинопоиска
        // film = filteredFilms[randomIndex++];
        
        dispatch(loadFilm(films.findIndex(elem => elem.id === film.id)));
        dispatch(addToListAndSave(film.id));
    }
};

/**
 * Загружает фильмы и запускает выбор одного из них
 */
export const fetchFilms = () => {
    return (dispatch, getState) => {
        const { film: current } = getState().filmReducer;
        
        dispatch(loadFilmsStarted());

        axios.get("./films/0.json")
            .then(response => {
                dispatch(loadFilms(response.data));
                dispatch(createFilteredFilms());
                if (current === null) dispatch(changeFilm());
                dispatch(lazyLoadStart());
            })
            .catch(err => {
                dispatch(loadFilmsFailure(err.message));
            });
    }
};

/**
 * Начинает догрузку фильмов
 */
 export const lazyLoadStart = () => {
    return (dispatch) => {
        dispatch(lazyLoadFilmsStarted());
        if (localStorage.getItem('count') === null) {
            dispatch(showNotification(
                'info',
                'Началась фоновая загрузка фильмов',
                'Загруженные фильмы станут доступны для поиска сразу после загрузки.',
            ));
        }
        dispatch(lazyLoad());
    }
};

/**
 * Докачивает и дополняет базу фильмов
 * 
 * @param {number} [page=0] - Номер файла.
 */
 export const lazyLoad = (page = 0) => {
    ++page;
    return (dispatch, getState) => {
        axios.get(`./films/${page}.json`)
            .then(response => {
                dispatch(addFilms(response.data));
                if (page < 243) {
                    dispatch(lazyLoad(page));
                } else {
                    dispatch(createFilteredFilms());
                    dispatch(lazyLoadFilmsEnded());
                    const count = getState().filmReducer.films.length;
                    localStorage.setItem('count', count);
                    dispatch(showNotification(
                        'success',
                        'Фильмы успешно загружены',
                        `Загружено фильмов: ${count}`,
                    ));
                }

            })
            .catch(err => {
                console.log('Ошибка дополнения базы:', err);
            });
    }
};