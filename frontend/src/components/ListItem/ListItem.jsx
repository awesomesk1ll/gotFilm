import React from 'react';
import Star from '../icons/Star';
import Bookmark from '../icons/Bookmark';
import TrashBin from '../icons/TrashBin';

import './ListItem.scss';

const ListItem = (props) => {
    const { name, secondName, year, rate, age, genre } = props;
    return (
        <div className="list-item">
            <div className="list-item_about">
                <p className="list-item__name">{ name }<span className="list-item__year">({ year })</span></p>
                <p className="list-item__second-name">{ secondName }</p>
                <p className="list-item__genre">{ genre }<span className="list-item__age">{ age }+</span></p>
            </div>
            <div className="list-item_actions-container">
                <div className="list-item_rating">
                    <Star />
                    <span className="list-item__rate">{ rate }</span>
                </div>
                <div className="list-item__buttons">
                    <button><Bookmark /></button>
                    <button><TrashBin /></button>
                </div>
            </div>
        </div>
    )
}

export default ListItem;