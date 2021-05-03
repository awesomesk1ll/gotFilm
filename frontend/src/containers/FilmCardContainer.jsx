import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Spinner from '../components/Spinner';
import FilmCard from '../pages/FilmCard';
import { addToListAndSave, changeFilm } from '../store/actions/complexFilmActions';

const FilmCardContainer = ({ film, addToBlacklistFilms, addToAlreadySeenFilms, changeFilm, error, idFilmsFiltered, addToListAndSave }) => {
    const handleChangeFilm = useCallback(() => {
        changeFilm();
    }, [changeFilm]);

    const handleMoveFilmToBlacklist = useCallback(() => {
        addToListAndSave(film.id, "blacklist");
        handleChangeFilm();
    }, [film, addToListAndSave,  handleChangeFilm]);

    const handleMoveFilmToAlreadySeen = useCallback(() => {
        addToListAndSave(film.id, "alreadySeen");
        handleChangeFilm();
    }, [film, addToListAndSave, handleChangeFilm]);

    return (
        idFilmsFiltered.length == 0 ? <div>Нет результатов</div> :
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
    films: filmReducer.films,
    film: filmReducer.film,
    blacklistFilms: filmReducer.blacklistFilms,
    alreadySeenFilms: filmReducer.alreadySeenFilms,
    idFilmsFiltered: filmReducer.idFilmsFiltered,
    error: filmReducer.error
});

const mapDispatchToProps = dispatch => bindActionCreators({ addToListAndSave, changeFilm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilmCardContainer);
