import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { favoriteIconPush } from '../../store/actions/complexFilmActions';
import { removeFromTemporary } from '../../store/actions/filmActions';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './Lists.scss';

const Temporary = ({ films, favorites, temporary, favoriteIconPush, removeFromTemporary }) => {
    let list = films.length && temporary.data.map(item => {
        let film = films.find(film => film.id === item.id);
        const handleAddToFavorites = () => {
            favoriteIconPush(film.id);
        };
        const handleRemoveFromList = () => {
            removeFromTemporary(film.id);
        };

        return <CSSTransition key={film.id} timeout={400} classNames="lists__list--item">
                    <ListItem   key={film.id} 
                                name={film.name} 
                                secondName={film.secondName} 
                                year={film.year} 
                                rate={film.rate} 
                                age={film.age} 
                                genre={film.genre} 
                                addToFavorites={handleAddToFavorites} 
                                removeFromList={handleRemoveFromList} 
                                status={favorites.list[film.id]} 
                    />
                </CSSTransition>
    }).reverse();
    return (
        <div className="lists--wrapper theme">
            <div className="lists__header theme">В другой раз</div>
            <TransitionGroup className="lists__list">
                { list?.length ? list : (<div className="lists__placeholder"/>) }
            </TransitionGroup>
            <div className="lists__emptyBlock"></div>
            <Navigation checked={'lists'} />
        </div>
    )
};

Temporary.propTypes = {
    temporary: PropTypes.object,
    favorites: PropTypes.object,
    films: PropTypes.array,
    favoriteIconPush: PropTypes.func,
    removeFromTemporary: PropTypes.func
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    favorites: filmReducer.favorites,
    temporary: filmReducer.temporary
});

const mapDispatchToProps = dispatch => bindActionCreators({ favoriteIconPush, removeFromTemporary }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Temporary);