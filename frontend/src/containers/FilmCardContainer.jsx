import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Spinner from '../components/Spinner';
import FilmCard from '../pages/FilmCard';
import { addToBlacklistFilms, addToAlreadySeenFilms } from '../store/actions/filmActions';
import { changeFilm } from '../store/actions/changeFilmAction';

const FilmCardContainer = ({ film, addToBlacklistFilms, addToAlreadySeenFilms, changeFilm, error, idFilmsFiltered }) => {
    const handleChangeFilm = useCallback(() => {
        changeFilm();
    }, [changeFilm]);

    const handleRemoveFilmToBlacklist = useCallback(() => {
        addToBlacklistFilms(film.id);
        handleChangeFilm();
    }, [film, addToBlacklistFilms, handleChangeFilm]);

    const handleRemoveFilmToAlreadySeen = useCallback(() => {
        addToAlreadySeenFilms(film.id);
        handleChangeFilm();
    }, [film, addToAlreadySeenFilms, handleChangeFilm]);

    return (
        idFilmsFiltered.length == 0 ? <div>Нет результатов</div> :
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
    films: filmReducer.films,
    film: filmReducer.film,
    blacklistFilms: filmReducer.blacklistFilms,
    alreadySeenFilms: filmReducer.alreadySeenFilms,
    idFilmsFiltered: filmReducer.idFilmsFiltered,
    error: filmReducer.error
});

const mapDispatchToProps = dispatch => bindActionCreators({ changeFilm, addToBlacklistFilms, addToAlreadySeenFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilmCardContainer);
