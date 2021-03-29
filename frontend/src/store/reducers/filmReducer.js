import update from 'react-addons-update';
import { ALREADY_SEEN_FILM, BLACKLIST_FILM, CHANGE_FILM, LOAD_FILMS } from '../actions/filmActions';

const initStore = {
    films: [],
    blacklistFilms: [],
    alreadySeenFilms: [],
    film: {
        id: 77044,
        name: "друзья",
        rate: 9.2,
        secondName: "friends",
        year: 1994,
        countries: ["США"],
        genres: ["комедия","мелодрама"],
        age: "16+",
        description: "Главные герои - шестеро друзей - Рейчел, Моника, Фиби, Джоуи, Чендлер и Росс. Три девушки и три парня, которые дружат, живут по соседству, вместе убивают время и противостоят жестокой реальности, делятся своими секретами и иногда очень сильно влюбляются."
    }
}

export default function filmReducer(store = initStore, action) {
    switch (action.type) {
        case LOAD_FILMS: {
            let randomFilm = Math.round(Math.random() * ((store.films.length - 1) - 0) + 0);
            return update(store, {
                films: {
                    $set: [...action.films]
                },
                /*film: {
                    $set: { ...store.films[randomFilm] }
                }*/
            });
        }
        case CHANGE_FILM: {
            return update(store, {
                film: {
                    $set: { ...store.films[action.film] }
                }
            });
        }
        case BLACKLIST_FILM: {
            return update(store, {
                blacklistFilms: {
                    $merge: [...store.blacklistFilms, action.film]
                }
            });
        }
        case ALREADY_SEEN_FILM: {
            return update(store, {
                alreadySeenFilms: {
                    $merge: [...store.alreadySeenFilms, action.film]
                }
            });
        }
        default:
            return store;
    }
}
