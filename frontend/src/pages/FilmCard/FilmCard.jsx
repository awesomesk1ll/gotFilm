import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'antd';
import FilmCardButton from '../../components/FilmCardButton/FilmCardButton';
import Navbar from '../../components/Navbar/Navbar';
import Star from '../../components/icons/Star';
import './FilmCard.scss';

const IMAGE_ENDPOINT = 'https://st.kp.yandex.net/images';

const FilmCard = (props) => {
    let genresList = props.film.genres.map((item, i) => <span key={i}>{item}, </span>);
    let countryList = props.film.countries.map((item, i) => i + 1 < props.film.countries.length ? <span key={i}>{item}, </span> : <span key={i}>{item}</span>);

    return (
        <div className="filmCard--wrapper">
            <div className="filmCard__poster">
            <img className="filmCard__poster__background"
                 src={`${IMAGE_ENDPOINT}/film_iphone/iphone360_${props.film.id}.jpg`}
            />
            <Image className="filmCard__poster__image"
                    preview={{src: `${IMAGE_ENDPOINT}/film_big/${props.film.id}.jpg`}}
                    src={`${IMAGE_ENDPOINT}/film_iphone/iphone360_${props.film.id}.jpg`}
            />
            </div>
            <div className="filmCard__infoBlock">
                <div className="filmCard__infoBlock--titleWrapper">
                    <h3 className="filmCard__infoBlock__title" style={{ fontSize: props.changeFontSize() }}>{props.film.name}</h3>
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
                <input type="checkbox" name="hiddenDesc" id="hiddenDesc" className="inputDesc" />
                <label htmlFor="hiddenDesc" className="filmCard__infoBlock__description--label">
                    <p className="filmCard__infoBlock__description">{props.film.description}</p>
                </label>
            </div>
            <div className="filmCard__footer">
                <div className="filmCard__footer__buttonGroup">
                    <FilmCardButton eventAction={props.removeFilm}>уже смотрел</FilmCardButton>
                    <FilmCardButton eventAction={props.seenFilm}>не предлагать</FilmCardButton>
                    <FilmCardButton eventAction={props.changeFilm}>в другой раз</FilmCardButton>
                </div>
                <div className="filmCard__footer__emptyBlock" ref={props.cardEndRef}><Navbar /></div>
            </div>
            
        </div>
    )
};

FilmCard.propTypes = {
    film: PropTypes.object,
    cardEndRef: PropTypes.object,
    removeFilm: PropTypes.func,
    seenFilm: PropTypes.func,
    changeFilm: PropTypes.func,
    changeFontSize: PropTypes.func,
};

export default FilmCard; 
