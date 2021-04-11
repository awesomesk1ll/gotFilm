import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Image } from 'antd';
import ErrorFilmCard from './ErrorFilmCard';
import FilmCardButton from '../../components/FilmCardButton/FilmCardButton';
import Star from '../../components/icons/Star';
import './FilmCard.scss';
import Navigation from '../../components/Navigation/Navigation';

const IMAGE_ENDPOINT = 'https://st.kp.yandex.net/images';

const FilmCard = ({ film, changeFilm, seenFilm, removeFilm, error }) => {
    const cardEndRef = useRef(null);
    
    const handleScrollToBottom = useCallback(() => {
        cardEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        handleScrollToBottom();
    });

    useEffect(() => {
        handleScrollToBottom();
    }, [film, handleScrollToBottom]);

    const handleChangeFontSize = useCallback(() => {
        if (film.name.length > 15 && film.name.length < 30) {
            return '20px';
        } else if (film.name.length >= 30) {
            return '18px';
        } else {
            return '25px';
        }
    }, [film]);

    let genresList = film.genres.map((item, i) => <span key={ i }>{ item }, </span>);
    let countryList = film.countries.map((item, i) => i + 1 < film.countries.length ? <span key={ i }>{ item }, </span> : <span key={ i }>{ item }</span>);

    return (
        error ? <ErrorFilmCard error={error}/> :
        <div className="filmCard--wrapper theme">
            <div className="filmCard__poster">
                <img className="filmCard__poster__background"
                    src={ `${IMAGE_ENDPOINT}/film_iphone/iphone360_${film.id}.jpg` }
                    alt="film_poster"
                />
                <Image className="filmCard__poster__image"
                    preview={ { src: `${IMAGE_ENDPOINT}/film_big/${film.id}.jpg` } }
                    src={ `${IMAGE_ENDPOINT}/film_iphone/iphone360_${film.id}.jpg` }
                />
            </div>
            <div className="filmCard__infoBlock theme">
                <div className="filmCard__infoBlock--titleWrapper">
                    <h3 className="filmCard__infoBlock__title" style={ { fontSize: handleChangeFontSize() } }>{ film.name }</h3>
                    <p className="filmCard__infoBlock__rate">
                        <Star />
                        { film.rate }
                    </p>
                </div>
                <div className="filmCard__infoBlock--secondTitleWrapper">
                    <p className="filmCard__infoBlock__secondTitle">{ film.secondName }</p>
                    <p className="filmCard__infoBlock__year">{ film.year }г. ({ countryList })</p>
                </div>
                <p className="filmCard__infoBlock__genre">{ genresList }<span>{ film.age }+</span></p>
                <hr className="filmCard__infoBlock--underline" />
                <div className="filmCard__infoBlock--scrollableWrapper">
                    <input type="checkbox" name="hiddenDesc" id="hiddenDesc" className="inputDesc" />
                    <label htmlFor="hiddenDesc" className="filmCard__infoBlock__description--label">
                        <p className="filmCard__infoBlock__description">{ film.description }</p>
                    </label>
                </div>
            </div>
            <div className="filmCard__footer theme">
                <div className="filmCard__footer__buttonGroup">
                    <FilmCardButton eventAction={ removeFilm }>уже смотрел</FilmCardButton>
                    <FilmCardButton eventAction={ seenFilm }>не предлагать</FilmCardButton>
                    <FilmCardButton eventAction={ changeFilm }>в другой раз</FilmCardButton>
                </div>
                <div className="filmCard__footer__emptyBlock" ref={ cardEndRef }></div>
            </div>
            <Navigation checked={ 'search' } />
        </div>
    )
};

FilmCard.propTypes = {
    error: PropTypes.string,
    film: PropTypes.object,
    removeFilm: PropTypes.func,
    seenFilm: PropTypes.func,
    changeFilm: PropTypes.func
};

export default FilmCard;