import React from 'react';
import PropTypes from 'prop-types';

import './FilmCard.scss';

const ErrorFilmCard = ({ error }) => {
    return (
        <div className="filmCard--wrapper">
            <div className="filmCard__poster"></div>
            <div className="filmCard__infoBlock">
                <div className="filmCard__infoBlock--titleWrapper">
                    <p className="filmCard__infoBlock__rate">
                    </p>
                </div>
                <div className="filmCard__infoBlock--secondTitleWrapper">
                    <p className="filmCard__infoBlock__secondTitle"></p>
                    <p className="filmCard__infoBlock__year"></p>
                </div>
                <p className="filmCard__infoBlock__error"><span>{error}</span></p>
                <input type="checkbox" name="hiddenDesc" id="hiddenDesc" className="inputDesc" />
                <label htmlFor="hiddenDesc" className="filmCard__infoBlock__description--label">
                    <p className="filmCard__infoBlock__description"></p>
                </label>
            </div>
            <div className="filmCard__footer">
                <div className="filmCard__footer__buttonGroup">
                </div>
                <div className="filmCard__footer__emptyBlock" ></div>
            </div>
            <div className="navigation"></div>
        </div>
    )
};

ErrorFilmCard.propTypes = {
    error: PropTypes.string
};

export default ErrorFilmCard;