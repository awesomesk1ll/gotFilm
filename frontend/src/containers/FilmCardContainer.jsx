import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Spinner from '../components/Spinner';
import FilmCard from '../pages/FilmCard';
import { addToListAndSave, changeFilm, favoriteIconPush } from '../store/actions/complexFilmActions';
import { addToTemporary, removeNotification } from '../store/actions/filmActions';

const FilmCardContainer = ({ film, addToListAndSave, addToTemporary, changeFilm, error, notification, removeNotification, favorites, favoriteIconPush }) => {
    const handleChangeFilm = useCallback(() => {
        changeFilm();
    }, [changeFilm]);

    const handleAddToFavorites = useCallback(() => {
        favoriteIconPush(film.id);
    }, [film, favoriteIconPush])

    const handleMoveFilmToBlacklist = useCallback(() => {
        addToListAndSave(film.id, "blacklist");
        handleChangeFilm();
    }, [film, addToListAndSave, handleChangeFilm]);

    const handleMoveFilmToAlreadySeen = useCallback(() => {
        addToListAndSave(film.id, "alreadySeen");
        handleChangeFilm();
    }, [film, addToListAndSave, handleChangeFilm]);

    const handleMoveFilmToTemporary = useCallback(() => {
        addToTemporary(film.id);
        handleChangeFilm();
    }, [film, addToTemporary, handleChangeFilm]);

    return (
        !film 
            ? <Spinner /> 
            : <FilmCard error={error} 
                        notify={notification} 
                        removeNotification={removeNotification} 
                        film={film} 
                        addToTemporary={handleMoveFilmToTemporary} 
                        removeFilm={handleMoveFilmToBlacklist} 
                        seenFilm={handleMoveFilmToAlreadySeen} 
                        addToFavorites={handleAddToFavorites} 
                        status={favorites.list[film.id]}
            />
    )
};

FilmCardContainer.propTypes = {
    error: PropTypes.string,
    notification: PropTypes.object,
    film: PropTypes.object,
    favoritesList: PropTypes.object,
    addToListAndSave: PropTypes.func,
    addToTemporary: PropTypes.func,
    changeFilm: PropTypes.func,
    removeNotification: PropTypes.func,
    favoriteIconPush: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    favorites: filmReducer.favorites,
    error: filmReducer.error,
    film: filmReducer.film,
    notification: filmReducer.notification
});

const mapDispatchToProps = dispatch => bindActionCreators({ addToListAndSave, changeFilm, favoriteIconPush, addToTemporary, removeNotification }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilmCardContainer);