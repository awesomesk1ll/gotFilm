import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { favoriteIconPush, removeFromListAndSave } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './Lists.scss';


const Blacklist = ({ films, favorites, blacklist, favoriteIconPush, removeFromListAndSave }) => {
    const handleAddToFavorites = useCallback((filmId) => {
        favoriteIconPush(filmId);
    }, [favoriteIconPush]);

    const handleRemoveFromList = useCallback((filmId) => {
        removeFromListAndSave(filmId, "blacklist");
    }, [removeFromListAndSave]);

    let list = films.length && blacklist.data.map(item => {
        let film = films.find(film => film.id === item.id);

        return <CSSTransition key={film.id} timeout={300} classNames="lists__list--item">
                    <ListItem   key={film.id} 
                                name={film.name} 
                                secondName={film.secondName} 
                                year={film.year} 
                                rate={film.rate} 
                                age={film.age} 
                                genre={film.genre} 
                                addToFavorites={() => handleAddToFavorites(film.id)} 
                                removeFromList={() => handleRemoveFromList(film.id)} 
                                status={favorites.list[film.id]}
                    />
                </CSSTransition>
    }).reverse();
    
    return (
        <div className="lists--wrapper theme">
            <div className="lists__header theme">Отклоненные</div>
            <TransitionGroup className="lists__list"> 
                { list?.length ? list : (<div className="lists__placeholder"/>) }
            </TransitionGroup>
            <div className="lists__emptyBlock"></div>
            <Navigation checked={'lists'} />
        </div>
    )
};

Blacklist.propTypes = {
    blacklist: PropTypes.object,
    favorites: PropTypes.object,
    films: PropTypes.array,
    favoriteIconPush: PropTypes.func,
    removeFromListAndSave: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    favorites: filmReducer.favorites,
    blacklist: filmReducer.blacklist
});

const mapDispatchToProps = dispatch => bindActionCreators({ favoriteIconPush, removeFromListAndSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Blacklist);