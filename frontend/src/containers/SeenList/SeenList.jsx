import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './SeenList.scss';


const SeenList = ({ films, alreadySeen }) => {
    let list = films.length && alreadySeen.data.map(item => {
        let film = films.find(film => film.id === item.id);
        return <ListItem key={film.id} name={film.name} secondName={film.secondName} year={film.year} rate={film.rate} age={film.age} genre={film.genre} />
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
    films: PropTypes.array
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    alreadySeen: filmReducer.alreadySeen
});

export default connect(mapStateToProps)(SeenList);