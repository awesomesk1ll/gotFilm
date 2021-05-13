import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { removeFromListAndSave } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './Lists.scss';


const Favorites = ({ films, favorites, removeFromListAndSave }) => {
    const handleRemoveFromList = useCallback((filmId) => {
        removeFromListAndSave(filmId, "favorites");
    }, [removeFromListAndSave]);
    
    let list = films.length && favorites.data.map(item => {
        let film = films.find(film => film.id === item.id);

        return <CSSTransition key={film.id} timeout={300} classNames="lists__list--item">
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
    
    return (
        <div className="lists--wrapper theme">
            <div className="lists__header theme">Избранные</div>
            <TransitionGroup className="lists__list">
                {list?.length ? list : (<div className="lists__placeholder" />)}
            </TransitionGroup>
            <div className="lists__emptyBlock"></div>
            <Navigation checked={'lists'} />
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