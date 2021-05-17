import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { favoriteIconPush, removeFromListAndSave } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import './List.scss';


const Blacklist = ({ films, favorites, blacklist, favoriteIconPush, removeFromListAndSave }) => {
    const handleAddToFavorites = useCallback((filmId) => {
        favoriteIconPush(filmId);
    }, [favoriteIconPush]);

    const handleRemoveFromList = useCallback((filmId) => {
        removeFromListAndSave(filmId, "blacklist");
    }, [removeFromListAndSave]);

    let list = films.length && blacklist.data.map(item => {
        let film = films.find(film => film.id === item.id);

        if (!film) {
            return <div key={item.id} className="list__list--null">Фильм загружается</div>
        }

        return <CSSTransition key={film.id} timeout={300} classNames="list__list--item">
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

    const transitionGroup = () => <TransitionGroup className="list__list">{ list }</TransitionGroup>
    
    return (
        <div className="list--wrapper theme">
            <div className="list__header theme">Отклоненные</div>
            { list?.length ? transitionGroup() : (<div className="list__placeholder"/>) }
            <div className="list__emptyBlock"></div>
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