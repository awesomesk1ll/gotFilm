import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { favoriteIconPush, removeFromListAndSave } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './Lists.scss';


const SeenList = ({ films, favorites, alreadySeen, favoriteIconPush, removeFromListAndSave }) => {
    const handleAddToFavorites = (filmId) => {
        favoriteIconPush(filmId);
    };

    const handleRemoveFromList = (filmId) => {
        removeFromListAndSave(filmId, "alreadySeen");
    };
    let list = films.length && alreadySeen.data.map(item => {
        let film = films.find(film => film.id === item.id);
        return <ListItem key={film.id} name={film.name} secondName={film.secondName} year={film.year} rate={film.rate} age={film.age} genre={film.genre} addToFavorites={() => handleAddToFavorites(film.id)} removeFromList={() => handleRemoveFromList(film.id)} status={favorites.list[film.id]} />
    }).reverse();
    return (
        <div className="lists--wrapper theme">
            <div className="lists__header theme">Просмотренные</div>
            <div className="lists__list">
                { list?.length ? list : (<div className="lists__placeholder"/>) }
            </div>
            <div className="lists__emptyBlock"></div>
            <Navigation checked={'lists'} />
        </div>
    )
};

SeenList.propTypes = {
    alreadySeen: PropTypes.object,
    favorites: PropTypes.object,
    films: PropTypes.array,
    favoriteIconPush: PropTypes.func,
    removeFromListAndSave: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    favorites: filmReducer.favorites,
    alreadySeen: filmReducer.alreadySeen
});

const mapDispatchToProps = dispatch => bindActionCreators({ favoriteIconPush, removeFromListAndSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SeenList);