import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { removeFromListAndSave, favoriteIconPush } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './Lists.scss';


const History = ({ films, favorites, history, favoriteIconPush, removeFromListAndSave }) => {
    const handleAddToFavorites = useCallback((filmId) => {
        favoriteIconPush(filmId);
    }, [favoriteIconPush]);

    const handleRemoveFromList = useCallback((filmId) => {
        removeFromListAndSave(filmId);
    }, [removeFromListAndSave]);
    let list = films.length && history.data.map(item => {
        let film = films.find(film => film.id === item.id);
        return <ListItem key={`${film.id}${item.timestamp}`} name={film.name} secondName={film.secondName} year={film.year} rate={film.rate} age={film.age} genre={film.genre} addToFavorites={() => handleAddToFavorites(film.id)} removeFromList={() => handleRemoveFromList(film.id)} status={favorites.list[film.id]} />
    });
    return (
        <div className="lists--wrapper theme">
            <div className="lists__header theme">История предложений</div>
            <div className="lists__list">
                { list?.length ? list : (<div className="lists__placeholder"/>) }
            </div>
            <div className="lists__emptyBlock"></div>
            <Navigation checked={'lists'} />
        </div>
    )
};

History.propTypes = {
    history: PropTypes.object,
    favorites: PropTypes.object,
    films: PropTypes.array,
    favoriteIconPush: PropTypes.func,
    removeFromListAndSave: PropTypes.func,
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    history: filmReducer.history,
    favorites: filmReducer.favorites
});

const mapDispatchToProps = dispatch => bindActionCreators({ favoriteIconPush, removeFromListAndSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(History);