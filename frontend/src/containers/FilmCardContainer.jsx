import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Spinner from '../components/Spinner';
import FilmCard from '../pages/FilmCard';
import { addToListAndSave, changeFilm } from '../store/actions/complexFilmActions';
import { addToTemporary, removeNotification } from '../store/actions/filmActions';

const FilmCardContainer = ({ film, addToListAndSave, changeFilm, error }) => {
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

    return (
        !film ? <Spinner /> : <FilmCard error={error} film={film} changeFilm={handleChangeFilm} removeFilm={handleMoveFilmToBlacklist} seenFilm={handleMoveFilmToAlreadySeen} />
    )
};

FilmCardContainer.propTypes = {
    error: PropTypes.string,
    film: PropTypes.object,
    addToListAndSave: PropTypes.func,
    changeFilm: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    error: filmReducer.error,
    film: filmReducer.film,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addToListAndSave, changeFilm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilmCardContainer);