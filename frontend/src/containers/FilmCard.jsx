import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import ButtonGroup from '../components/ButtonGroup/ButtonGroup';
import Star from '../components/icons/Star';
import { addToBlacklistFilms, addToAlreadySeenFilms, changeFilm } from '../store/actions/filmActions';

const FilmCard = (props) => {
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

    let genresList = props.film.genres.map((item, i) => <span key={i}>{item}, </span>);
    let countryList = props.film.countries.map((item, i) => i + 1 < props.film.countries.length ? <span key={i}>{item}, </span> : <span key={i}>{item}</span>);

    return (
        <div className="filmCard--wrapper">
            <div className="filmCard__poster">
                <img src={`https://kinopoiskapiunofficial.tech/images/posters/kp_small/${props.film.id}.jpg`} alt="poster" className="filmCard__poster__image" />
            </div>
            <div className="filmCard__infoBlock">
                <div className="filmCard__infoBlock--titleWrapper">
                    <h3 className="filmCard__infoBlock__title" style={{ fontSize: handleChangeFontSize() }}>{props.film.name}</h3>
                    <p className="filmCard__infoBlock__rate">
                        <Star />
                        {props.film.rate}
                    </p>
                </div>
                <div className="filmCard__infoBlock--secondTitleWrapper">
                    <p className="filmCard__infoBlock__secondTitle">{props.film.secondName}</p>
                    <p className="filmCard__infoBlock__year">{props.film.year}г. ({countryList})</p>
                </div>
                <p className="filmCard__infoBlock__genre">{genresList}<span>{props.film.age}</span></p>
                <hr className="filmCard__infoBlock--underline" />
                <p className="filmCard__infoBlock__description">{props.film.description}</p>
            </div>
            <div className="filmCard__footer">
                <ButtonGroup changeFilm={handleChangeFilm} removeFilm={handleRemoveFilmToBlacklist} seenFilm={handleRemoveFilmToAlreadySeen} />
                <div className="emptyBlock"></div>
            </div>
            <div className="navigation"></div>
        </div>
    )
};

FilmCard.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FilmCard);