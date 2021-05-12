import React from 'react';
import PropTypes from 'prop-types';
import Star from '../icons/Star';
import Bookmark from '../icons/Bookmark';
import TrashBin from '../icons/TrashBin';

import './ListItem.scss';

const ListItem = ({ removeFromList, addToFavorites, name, secondName, year, rate, age, genre, status }) => {
    return (
        <div className="list-item">
            <div className="list-item__about">
                <p className="list-item__name">{ name }<span className="list-item__year"> ({ year })</span></p>
                <p className="list-item__second-name">{ secondName }</p>
                <p className="list-item__genre">{ genre }<span className="list-item__age">{ age && `${age}+` }</span></p>
            </div>
            <div className="list-item__actions-container">
                <div className="list-item__rating">
                    <Star />
                    <div className="list-item__rate">{ rate }</div>
                </div>
                <div className="list-item__buttons">
                    {!!addToFavorites && <button className="favorite" onClick={ addToFavorites }><Bookmark status={ status } /></button>}
                    <button onClick={ removeFromList }><TrashBin /></button>
                </div>
            </div>
        </div>
    )
};

ListItem.propTypes = {
    removeFromList: PropTypes.func,
    addToFavorites: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(undefined)]),
    name: PropTypes.string,
    secondName: PropTypes.string,
    year: PropTypes.number,
    rate: PropTypes.number,
    age: PropTypes.number,
    genre: PropTypes.array,
    status: PropTypes.oneOfType([PropTypes.bool, PropTypes.instanceOf(undefined)]),
};

export default ListItem; 