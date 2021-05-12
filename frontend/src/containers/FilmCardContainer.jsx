import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Spinner from '../components/Spinner';
import FilmCard from '../pages/FilmCard';
import { addToListAndSave, changeFilm } from '../store/actions/complexFilmActions';
import { addToTemporary, removeNotification } from '../store/actions/filmActions';

const FilmCardContainer = ({ film, addToListAndSave, addToTemporary, changeFilm, error, notification, removeNotification }) => {
    const handleChangeFilm = useCallback(() => {
        changeFilm();
    }, [changeFilm]);

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
        !film ? <Spinner /> : <FilmCard error={error} notify={notification} removeNotification={removeNotification} film={film} addToTemporary={handleMoveFilmToTemporary} removeFilm={handleMoveFilmToBlacklist} seenFilm={handleMoveFilmToAlreadySeen} />
    )
};

FilmCardContainer.propTypes = {
    error: PropTypes.string,
    notification: PropTypes.object,
    film: PropTypes.object,
    addToListAndSave: PropTypes.func,
    addToTemporary: PropTypes.func,
    changeFilm: PropTypes.func,
    removeNotification: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    error: filmReducer.error,
    film: filmReducer.film,
    notification: filmReducer.notification
});

const mapDispatchToProps = dispatch => bindActionCreators({ addToListAndSave, changeFilm, addToTemporary, removeNotification }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilmCardContainer);