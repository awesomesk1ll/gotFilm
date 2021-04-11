import React from 'react';
import PropTypes from 'prop-types';

import './FilmCardButton.scss';

const FilmCardButton = (props) => {
    return (
        <button onClick={props.eventAction} className="button">{props.children}</button>
    )
};

FilmCardButton.propTypes = {
    eventAction: PropTypes.func,
    children: PropTypes.string
}

export default FilmCardButton;
