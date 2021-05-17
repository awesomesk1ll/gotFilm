import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Image, notification } from 'antd';
import Spinner from '../../components/Spinner';
import ErrorFilmCard from './ErrorFilmCard';
import FilmCardButton from '../../components/FilmCardButton/FilmCardButton';
import Star from '../../components/icons/Star';
import Bookmark from '../../components/icons/Bookmark';
import Kp from '../../components/icons/Kp';
import './FilmCard.scss';


const IMAGE_ENDPOINT = `https://st.kp.y${'a'}ndex.net/images`;
const getKPlink = (id, type) => `https://www.kinop${'o'}isk.ru/${type === 'FILM' ? 'film' : 'series'}/${id}/`;


const FilmCard = ({ film, addToTemporary, seenFilm, removeFilm, error, notify, removeNotification, status, addToFavorites }) => {
    const cardEndRef = useRef(null);
    
    const handleScrollToBottom = useCallback(() => {
        cardEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        handleScrollToBottom();
    });

    useEffect(() => {
        handleScrollToBottom();
    }, [film, handleScrollToBottom]);

    useEffect(() => {
        if (notify.message && notify.description) {
            notification[notify.type]({
                duration: 4,
                message: notify.message,
                description: notify.description
            });
            removeNotification();
        }
    }, [notify, removeNotification]);

    const handleChangeFontSize = useCallback(() => {
        if (film.name.length > 15 && film.name.length < 30) {
            return '20px';
        } else if (film.name.length >= 30) {
            return '18px';
        } else {
            return '25px';
        }
    }, [film]);

    const handleKpOpen = useCallback(() => {
        window.open(getKPlink(film.id, film.type), "_blank");
    }, [film]);

    const ageFormatted = film.age !== null && `, ${film.age}+`;

    return (
        error ? <ErrorFilmCard error={error}/> :
        <div className="filmCard--wrapper theme">
            <div className="filmCard__poster">
                <img className="filmCard__poster__background" alt=""
                    src={ `${IMAGE_ENDPOINT}/film_iphone/iphone360_${film.id}.jpg` }
                />
                <Image className="filmCard__poster__image" alt={ film.name }
                    preview={ { src: `${IMAGE_ENDPOINT}/film_big/${film.id}.jpg` } }
                    src={ `${IMAGE_ENDPOINT}/film_iphone/iphone360_${film.id}.jpg` }
                    placeholder={ <Spinner /> }
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
                    <p className="filmCard__infoBlock__year">{ film.year }г. ({ film.countries.join(', ') })</p>
                </div>
                <p className="filmCard__infoBlock__genre">{ film.genres.join(', ') }<span>{ ageFormatted }</span></p>
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
                    <FilmCardButton eventAction={ seenFilm }>уже смотрел</FilmCardButton>
                    <FilmCardButton eventAction={ removeFilm }>не предлагать</FilmCardButton>
                </div>
                <div className="filmCard__footer__buttonGroup">
                    <button className={`small__button${status ? ' active' : ''}`} onClick={ addToFavorites }>
                        <Bookmark status={ status } />
                    </button>
                    <FilmCardButton eventAction={ addToTemporary }>в другой раз</FilmCardButton>
                    <button className="small__button" onClick={ handleKpOpen }>
                        <Kp className="theme" />
                    </button>
                </div>
                <div className="filmCard__footer__emptyBlock" ref={ cardEndRef }></div>
            </div>
        </div>
    )
};

FilmCard.propTypes = {
    error: PropTypes.string,
    notify: PropTypes.object,
    film: PropTypes.object,
    removeFilm: PropTypes.func,
    seenFilm: PropTypes.func,
    addToTemporary: PropTypes.func,
    addToFavorites: PropTypes.func
};

export default FilmCard;