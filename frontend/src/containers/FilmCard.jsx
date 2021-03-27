import React, { useState } from 'react';
import ChooseButton from '../components/ChooseButton/ChooseButton';
import Star from '../components/icons/Star';

const FilmCard = (props) => {
    const [name, setName] = useState(() => {
        return 'друзья';
    });
    const [rate, setRate] = useState(() => {
        return '9.2';
    });
    const [secondName, setSecondName] = useState(() => {
        return 'friends';
    });
    const [year, setYear] = useState(() => {
        return '1994';
    });
    const [countries, setCountries] = useState(() => {
        return ['США'];
    });

    const [genres, setGenres] = useState(() => {
        return ['комедия', 'мелодрама'];
    });

    const [age, setAge] = useState(() => {
        return '16+';
    });
    const [description, setDescription] = useState(() => {
        return 'Главные герои - шестеро друзей - Рейчел, Моника, Фиби, Джоуи, Чендлер и Росс. Три девушки и три парня, которые дружат, живут по соседству, вместе убивают время и противостоят жестокой реальности, делятся своими секретами и иногда очень сильно влюбляются.';
    });

    let genresList = genres.map((item, i) => <span key={i}>{item}, </span>);
    let countryList = countries.map((item, i) => i + 1 < countries.length ? <span key={i}>{item}, </span> : <span key={i}>{item}</span>);

    return (
        <div className="filmCard--wrapper">
            <div className="filmCard__poster">
                <img src="https://kinopoiskapiunofficial.tech/images/posters/kp_small/77044.jpg" alt="poster" className="filmCard__poster__image" />
            </div>
            <div className="filmCard__infoBlock">
                <div className="filmCard__infoBlock--titleWrapper">
                    <h3 className="filmCard__infoBlock__title" style={{ fontSize: name.length > 10 ? '20px' : '' }}>{name}</h3>
                    <p className="filmCard__infoBlock__rate">
                        <Star />
                        {rate}
                    </p>
                </div>
                <div className="filmCard__infoBlock--secondTitleWrapper">
                    <p className="filmCard__infoBlock__secondTitle">{secondName}</p>
                    <p className="filmCard__infoBlock__year">{year}г. ({countryList})</p>
                </div>
                <p className="filmCard__infoBlock__genre">{genresList}<span>{age}</span></p>
                <hr className="filmCard__infoBlock--underline" />
                <p className="filmCard__infoBlock__description">{description}</p>
                <div className="filmCard__infoBlock__buttonGroup">
                    <ChooseButton>не предлагать</ChooseButton>
                    <ChooseButton>уже смотрел</ChooseButton>
                    <ChooseButton>в другой раз</ChooseButton>
                </div>
                <div className="emptyBlock"></div>
            </div>
            <div className="navigation"></div>
        </div>
    )
}

export default FilmCard;