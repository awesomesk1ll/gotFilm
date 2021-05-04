import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { addToListAndSave, removeFromListAndSave } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './SeenList.scss';


const SeenList = ({ films, favorites, alreadySeen, addToListAndSave, removeFromListAndSave }) => {
    let list = films.length && alreadySeen.data.map(item => {
        let film = films.find(film => film.id === item.id);
        const handleAddToFavorites = () => {
            let checkList = favorites.data.find(item => item.id === film.id);
            if (!checkList) {
                addToListAndSave(film.id, "favorites");
            } else {
                removeFromListAndSave(film.id, "favorites");
            }
        };
        const handleRemoveFromList = () => {
            removeFromListAndSave(film.id, "alreadySeen");
        };
        return <ListItem key={film.id} name={film.name} secondName={film.secondName} year={film.year} rate={film.rate} age={film.age} genre={film.genre} addToFavorites={handleAddToFavorites} removeFromList={handleRemoveFromList} status={favorites.list[film.id]} />
    }).reverse();
    return (
        <div className="seenList--wrapper">
            <div className="seenList__header">Просмотренные</div>
            <div className="seenList__list">
                { list?.length ? list : (<div className="seenList__placeholder"/>) }
            </div>
            <Navigation checked={'lists'} />
        </div>
    )
};

SeenList.propTypes = {
    alreadySeen: PropTypes.object,
    favorites: PropTypes.object,
    films: PropTypes.array,
    addToListAndSave: PropTypes.func,
    removeFromListAndSave: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    favorites: filmReducer.favorites,
    alreadySeen: filmReducer.alreadySeen
});

const mapDispatchToProps = dispatch => bindActionCreators({ addToListAndSave, removeFromListAndSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SeenList);