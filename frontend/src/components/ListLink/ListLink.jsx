import React from 'react';
import PropTypes from 'prop-types';

import './ListLink.scss';

const ListLink = ({ children, listLength }) => {
    return (
        <div className="listLink--wrapper">
            <p className="listLink__title">{children}</p>
            <p className="listLink__length">{listLength}</p>
        </div>
    )
};

ListLink.propTypes = {
    listLength: PropTypes.number,
    children: PropTypes.string
}

export default ListLink;