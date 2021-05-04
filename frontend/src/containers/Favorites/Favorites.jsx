import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { favoriteIconPush, removeFromListAndSave } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './Favorites.scss';


const Favorites = ({ films, favorites, favoriteIconPush, removeFromListAndSave }) => {
    let list = films.length && favorites.data.map(item => {
        let film = films.find(film => film.id === item.id);
        const handleAddToFavorites = () => {
            favoriteIconPush(film.id);
        };
        const handleRemoveFromList = () => {
            removeFromListAndSave(film.id, "favorites");
        };
        return <ListItem key={film.id} name={film.name} secondName={film.secondName} year={film.year} rate={film.rate} age={film.age} genre={film.genre} addToFavorites={handleAddToFavorites} removeFromList={handleRemoveFromList} status={favorites.list[film.id]} />
    }).reverse();
    return (
        <div className="favorites--wrapper">
            <div className="favorites__header">Избранные</div>
            <div className="favorites__list">
                {list?.length ? list : (<div className="favorites__placeholder" />)}
            </div>
            <div className="favorites__emptyBlock"></div>
            <Navigation checked={'lists'} />
        </div>
    )
};

Favorites.propTypes = {
    favorites: PropTypes.object,
    films: PropTypes.array,
    favoriteIconPush: PropTypes.func,
    removeFromListAndSave: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    favorites: filmReducer.favorites
});

const mapDispatchToProps = dispatch => bindActionCreators({ favoriteIconPush, removeFromListAndSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);