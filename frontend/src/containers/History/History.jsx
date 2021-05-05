import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { removeFromListAndSave, favoriteIconPush } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './History.scss';


const History = ({ films, favorites, history, favoriteIconPush, removeFromListAndSave }) => {
    let list = films.length && history.data.map(item => {
        let film = films.find(film => film.id === item.id);
        const handleAddToFavorites = () => {
            favoriteIconPush(film.id);
        };
        const handleRemoveFromList = () => {
            removeFromListAndSave(film.id);
        };
        return <ListItem key={`${film.id}${item.timestamp}`} name={film.name} secondName={film.secondName} year={film.year} rate={film.rate} age={film.age} genre={film.genre} addToFavorites={handleAddToFavorites} removeFromList={handleRemoveFromList} status={favorites.list[film.id]} />
    }).reverse();
    return (
        <div className="history--wrapper">
            <div className="history__header">История предложений</div>
            <div className="history__list">
                { list?.length ? list : (<div className="history__placeholder"/>) }
            </div>
            <div className="history__emptyBlock"></div>
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