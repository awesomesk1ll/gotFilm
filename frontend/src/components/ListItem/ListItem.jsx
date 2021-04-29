import React from 'react';
import Star from '../icons/Star';
import Bookmark from '../icons/Bookmark';
import TrashBin from '../icons/TrashBin';

import './ListItem.scss';

const ListItem = ({ removeFromList, addToFavorites, name, secondName, year, rate, age, genre }) => {
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
                    <span className="list-item__rate">{ rate }</span>
                </div>
                <div className="list-item__buttons">
                    <button onClick={addToFavorites}><Bookmark /></button>
                    <button onClick={removeFromList}><TrashBin /></button>
                </div>
            </div>
        </div>
    )
}

export default ListItem; 