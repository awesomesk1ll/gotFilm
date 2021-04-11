import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Spinner from '../components/Spinner/Spinner';
import FilmCard from '../pages/FilmCard';
import { addToBlacklistFilms, addToAlreadySeenFilms, changeFilm } from '../store/actions/addActions';

const FilmCardContainer = ({ film, addToBlacklistFilms, addToAlreadySeenFilms, changeFilm, error, isLoading }) => {
    const handleChangeFilm = useCallback(() => {
        changeFilm();
    }, [changeFilm]);

    const handleRemoveFilmToBlacklist = useCallback(() => {
        addToBlacklistFilms();
        handleChangeFilm();
    }, [addToBlacklistFilms, handleChangeFilm]);

    const handleRemoveFilmToAlreadySeen = useCallback(() => {
        addToAlreadySeenFilms();
        handleChangeFilm();
    }, [addToAlreadySeenFilms, handleChangeFilm]);

    return (
        isLoading ? <Spinner /> : <FilmCard error={error} film={film} changeFilm={handleChangeFilm} removeFilm={handleRemoveFilmToBlacklist} seenFilm={handleRemoveFilmToAlreadySeen} />
    )
};

FilmCardContainer.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    film: PropTypes.object,
    addToBlacklistFilms: PropTypes.func,
    addToAlreadySeenFilms: PropTypes.func,
    changeFilm: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    isLoading: filmReducer.isLoading,
    error: filmReducer.error,
    film: filmReducer.film
});

const mapDispatchToProps = dispatch => bindActionCreators({ changeFilm, addToBlacklistFilms, addToAlreadySeenFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilmCardContainer);