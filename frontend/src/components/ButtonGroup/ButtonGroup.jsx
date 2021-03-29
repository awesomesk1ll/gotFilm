import React from 'react';
import PropTypes from 'prop-types';

import './buttonGroup.scss';

const ButtonGroup = (props) => {
    return (
        <div className="buttonGroup">
            <button onClick={props.removeFilm} className="button">не предлагать</button>
            <button onClick={props.seenFilm} className="button">уже смотрел</button>
            <button onClick={props.changeFilm} className="button">в другой раз</button>
        </div>
    )
};

ButtonGroup.propTypes = {
    removeFilm: PropTypes.func,
    seenFilm: PropTypes.func,
    changeFilm: PropTypes.func
}

export default ButtonGroup;