import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';

import FilmCard from '../pages/FilmCard';
import { addToBlacklistFilms, addToAlreadySeenFilms, changeFilm } from '../store/actions/addActions';

const FilmCardContainer = ({ film, films, blacklistFilms, alreadySeenFilms, addToBlacklistFilms, addToAlreadySeenFilms, changeFilm, isLoading, error }) => {
    const handleChangeFilm = useCallback(() => {
        let randomFilm = Math.round(Math.random() * ((films.length - 1) - 0) + 0);
        if (!alreadySeenFilms.includes(films[randomFilm]) && !blacklistFilms.includes(films[randomFilm])) {
            changeFilm(randomFilm);
        }
    }, [films, alreadySeenFilms, blacklistFilms, changeFilm]);

    const handleRemoveFilmToBlacklist = useCallback(() => {
        if (!blacklistFilms.includes(film)) {
            addToBlacklistFilms(film);
        }
        handleChangeFilm();
    }, [blacklistFilms, film, addToBlacklistFilms, handleChangeFilm]);

    const handleRemoveFilmToAlreadySeen = useCallback(() => {
        if (!alreadySeenFilms.includes(film)) {
            addToAlreadySeenFilms(film);
        }
        handleChangeFilm();
    }, [alreadySeenFilms, film, addToAlreadySeenFilms, handleChangeFilm]);

    const handleChangeFontSize = useCallback(() => {
        if (film.name.length > 15 && film.name.length < 30) {
            return '20px';
        } else if (film.name.length >= 30) {
            return '18px';
        } else {
            return '25px';
        }
    }, [film]);

    return (
        isLoading ? <Spin className="loadingSpinner" /> : <FilmCard error={error} film={film} changeFilm={handleChangeFilm} removeFilm={handleRemoveFilmToBlacklist} seenFilm={handleRemoveFilmToAlreadySeen} changeFontSize={handleChangeFontSize} />
    )
};

FilmCardContainer.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    film: PropTypes.object,
    films: PropTypes.array,
    blacklistFilms: PropTypes.array,
    alreadySeenFilms: PropTypes.array,
    addToBlacklistFilms: PropTypes.func,
    addToAlreadySeenFilms: PropTypes.func,
    changeFilm: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    isLoading: filmReducer.isLoading,
    error: filmReducer.error,
    films: filmReducer.films,
    film: filmReducer.film,
    blacklistFilms: filmReducer.blacklistFilms,
    alreadySeenFilms: filmReducer.alreadySeenFilms
});

const mapDispatchToProps = dispatch => bindActionCreators({ changeFilm, addToBlacklistFilms, addToAlreadySeenFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilmCardContainer);