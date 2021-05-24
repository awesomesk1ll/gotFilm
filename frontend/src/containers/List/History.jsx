import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { removeFromListAndSave, favoriteIconPush } from '../../store/actions/complexFilmActions';

import ListItem from '../../components/ListItem';
import './List.scss';


const History = ({ films, favorites, history, favoriteIconPush, removeFromListAndSave }) => {
    const handleAddToFavorites = useCallback((filmId) => {
        favoriteIconPush(filmId);
    }, [favoriteIconPush]);

    const handleRemoveFromList = useCallback((filmId, timestamp) => {
        removeFromListAndSave(filmId, 'history', timestamp);
    }, [removeFromListAndSave]);

    let list = films.length && history.data.map((item, index) => {
        let film = films.find(film => film.id === item.id);

        if (!film) {
            return <div key={`${item.id}${item.timestamp}`} className="list__list--null">Фильм загружается</div>
        }

        return <CSSTransition key={`${film.id}${item.timestamp}`} timeout={300} classNames="list__list--item">
                    <ListItem   key={`${film.id}${item.timestamp}`} 
                                name={film.name} 
                                secondName={film.secondName} 
                                year={film.year} 
                                rate={film.rate} 
                                age={film.age} 
                                genre={film.genre} 
                                addToFavorites={() => handleAddToFavorites(film.id)} 
                                removeFromList={() => handleRemoveFromList(film.id, item.timestamp)} 
                                status={favorites.list[film.id]} 
                    />
                </CSSTransition>
    }).reverse();

    const transitionGroup = () => <TransitionGroup className="list__list">{ list }</TransitionGroup>
    
    return (
        <div className="list--wrapper theme">
            <div className="list__header theme">История предложений</div>
            { list?.length ? transitionGroup() : (<div className="list__placeholder"/>) }
            <div className="list__emptyBlock"></div>
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