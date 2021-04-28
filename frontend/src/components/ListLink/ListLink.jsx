import React from 'react';
import PropTypes from 'prop-types';

import './ListLink.scss';

const ListLink = (props) => {
    return (
        <div className="listLink--wrapper">
            <p className="listLink__title">{props.children}</p>
            <p className="listLink__length">{props.listLength}</p>
        </div>
    )
};

ListLink.propTypes = {
    listLength: PropTypes.number,
    children: PropTypes.string
}

export default ListLink;