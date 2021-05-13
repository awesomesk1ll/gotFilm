import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import './FilmCardButton.scss';

const FilmCardButton = ({ children, eventAction }) => {
    return (
        <Button onClick={eventAction} className="button">{children}</Button>
    )
};

FilmCardButton.propTypes = {
    eventAction: PropTypes.func,
    children: PropTypes.string
}

export default FilmCardButton;