import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import FilmCard from '../pages/FilmCard';
import { addToBlacklistFilms, addToAlreadySeenFilms, changeFilm } from '../store/actions/filmActions';

const FilmCardContainer = (props) => {
    useEffect(() => {
        handleScrollToBottom();
    }, []);

    useEffect(() => {
        handleScrollToBottom();
    }, [props.film]);

    const cardEndRef = useRef(null);

    const handleScrollToBottom = () => {
        cardEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const handleChangeFilm = useCallback(() => {
        let randomFilm = Math.round(Math.random() * ((props.films.length - 1) - 0) + 0);
        if (!props.alreadySeenFilms.includes(props.films[randomFilm]) && !props.blacklistFilms.includes(props.films[randomFilm])) {
            props.changeFilm(randomFilm);
        }
    }, [props.films, props.alreadySeenFilms, props.blacklistFilms, props.film]);

    const handleRemoveFilmToBlacklist = useCallback(() => {
        if (!props.blacklistFilms.includes(props.film)) {
            props.addToBlacklistFilms(props.film);
        }
        handleChangeFilm();
    }, [props.blacklistFilms, props.film]);

    const handleRemoveFilmToAlreadySeen = useCallback(() => {
        if (!props.blacklistFilms.includes(props.film)) {
            props.addToAlreadySeenFilms(props.film);
        }
        handleChangeFilm();
    }, [props.alreadySeenFilms, props.film]);

    const handleChangeFontSize = useCallback(() => {
        if (props.film.name.length > 15 && props.film.name.length < 30) {
            return '20px';
        } else if (props.film.name.length >= 30) {
            return '18px';
        } else {
            return '25px';
        }
    }, [props.film]);

    return (
        <FilmCard cardEndRef={cardEndRef} film={props.film} changeFilm={handleChangeFilm} removeFilm={handleRemoveFilmToBlacklist} seenFilm={handleRemoveFilmToAlreadySeen} changeFontSize={handleChangeFontSize} />
    )
};

FilmCardContainer.propTypes = {
    film: PropTypes.object,
    films: PropTypes.array,
    blacklistFilms: PropTypes.array,
    alreadySeenFilms: PropTypes.array,
    addToBlacklistFilms: PropTypes.func,
    addToAlreadySeenFilms: PropTypes.func,
    changeFilm: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    film: filmReducer.film,
    blacklistFilms: filmReducer.blacklistFilms,
    alreadySeenFilms: filmReducer.alreadySeenFilms
});

const mapDispatchToProps = dispatch => bindActionCreators({ changeFilm, addToBlacklistFilms, addToAlreadySeenFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilmCardContainer);