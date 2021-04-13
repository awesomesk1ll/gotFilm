import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import './FilmCardButton.scss';

const FilmCardButton = (props) => {
    return (
        <Button onClick={props.eventAction} className="button">{props.children}</Button>
    )
};

FilmCardButton.propTypes = {
    eventAction: PropTypes.func,
    children: PropTypes.string
}

export default FilmCardButton;