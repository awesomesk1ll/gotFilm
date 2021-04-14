import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Spinner from '../components/Spinner';
import FilmCard from '../pages/FilmCard';
import { addToBlacklistFilms, addToAlreadySeenFilms } from '../store/actions/filmActions';
import { changeFilm } from '../store/actions/changeFilmAction';

const FilmCardContainer = ({ film, alreadySeenFilms, blacklistFilms, addToBlacklistFilms, addToAlreadySeenFilms, changeFilm, error }) => {
    const handleChangeFilm = useCallback(() => {
        changeFilm();
    }, [changeFilm]);

    const handleRemoveFilmToBlacklist = useCallback(() => {
        addToBlacklistFilms(film.id);
        localStorage.setItem('blacklist', JSON.stringify(blacklistFilms));
        handleChangeFilm();
    }, [film, blacklistFilms, addToBlacklistFilms, handleChangeFilm]);

    const handleRemoveFilmToAlreadySeen = useCallback(() => {
        addToAlreadySeenFilms(film.id);
        localStorage.setItem('seenList', JSON.stringify(alreadySeenFilms));
        handleChangeFilm();
    }, [film, alreadySeenFilms, addToAlreadySeenFilms, handleChangeFilm]);

    return (
        !film ? <Spinner /> : <FilmCard error={error} film={film} changeFilm={handleChangeFilm} removeFilm={handleRemoveFilmToBlacklist} seenFilm={handleRemoveFilmToAlreadySeen} />
    )
};

FilmCardContainer.propTypes = {
    error: PropTypes.string,
    film: PropTypes.object,
    blacklistFilms: PropTypes.object,
    alreadySeenFilms: PropTypes.object,
    addToBlacklistFilms: PropTypes.func,
    addToAlreadySeenFilms: PropTypes.func,
    changeFilm: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    error: filmReducer.error,
    film: filmReducer.film,
    blacklistFilms: filmReducer.blacklistFilms,
    alreadySeenFilms: filmReducer.alreadySeenFilms
});

const mapDispatchToProps = dispatch => bindActionCreators({ changeFilm, addToBlacklistFilms, addToAlreadySeenFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilmCardContainer);