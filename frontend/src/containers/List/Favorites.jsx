import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { removeFromListAndSave } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import './List.scss';


const Favorites = ({ films, favorites, removeFromListAndSave }) => {
    const handleRemoveFromList = useCallback((filmId) => {
        removeFromListAndSave(filmId, "favorites");
    }, [removeFromListAndSave]);
    
    let list = films.length && favorites.data.map(item => {
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
                                removeFromList={() => handleRemoveFromList(film.id)} 
                    />
                </CSSTransition>
    }).reverse();

    const transitionGroup = () => <TransitionGroup className="list__list">{ list }</TransitionGroup>
    
    return (
        <div className="list--wrapper theme">
            <div className="list__header theme">Избранные</div>
            { list?.length ? transitionGroup() : (<div className="list__placeholder"/>) }
            <div className="list__emptyBlock"></div>
        </div>
    )
};

Favorites.propTypes = {
    favorites: PropTypes.object,
    films: PropTypes.array,
    removeFromListAndSave: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    favorites: filmReducer.favorites
});

const mapDispatchToProps = dispatch => bindActionCreators({ removeFromListAndSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);