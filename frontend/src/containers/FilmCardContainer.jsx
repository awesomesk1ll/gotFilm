import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Spinner from '../components/Spinner';
import FilmCard from '../pages/FilmCard';
import { addToBlacklistFilms, addToAlreadySeenFilms } from '../store/actions/filmActions';
import { changeFilm } from '../store/actions/changeFilmAction';

const FilmCardContainer = ({ film, addToBlacklistFilms, addToAlreadySeenFilms, changeFilm, error }) => {
    const handleChangeFilm = useCallback(() => {
        changeFilm();
    }, [changeFilm]);

    const handleRemoveFilmToBlacklist = useCallback(() => {
        addToBlacklistFilms(film);
        handleChangeFilm();
    }, [film, addToBlacklistFilms, handleChangeFilm]);

    const handleRemoveFilmToAlreadySeen = useCallback(() => {
        addToAlreadySeenFilms(film);
        handleChangeFilm();
    }, [film, addToAlreadySeenFilms, handleChangeFilm]);

    return (
        !film ? <Spinner /> : <FilmCard error={error} film={film} changeFilm={handleChangeFilm} removeFilm={handleRemoveFilmToBlacklist} seenFilm={handleRemoveFilmToAlreadySeen} />
    )
};

FilmCardContainer.propTypes = {
    error: PropTypes.string,
    film: PropTypes.object,
    addToBlacklistFilms: PropTypes.func,
    addToAlreadySeenFilms: PropTypes.func,
    changeFilm: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    error: filmReducer.error,
    film: filmReducer.film
});

const mapDispatchToProps = dispatch => bindActionCreators({ changeFilm, addToBlacklistFilms, addToAlreadySeenFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilmCardContainer);