import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './Blacklist.scss';


const Blacklist = ({ films, blacklistFilms }) => {
    let list = blacklistFilms.data.map(item => {
        let film = films.find(film => film.id === item.id);
        return <ListItem key={film.id} name={film.name} secondName={film.secondName} year={film.year} rate={film.rate} age={film.age} genre={film.genre} />
    });
    return (
        <div className="blacklist--wrapper">
            <div className="blacklist__header">Отклоненные</div>
            <div className="blacklist__list"> 
            { list.length ? list : (<div className="blacklist__placeholder"/>) }
            </div>
            <Navigation checked={'lists'} />
        </div>
    )
};

Blacklist.propTypes = {
    blacklistFilms: PropTypes.object,
    films: PropTypes.array
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    blacklistFilms: filmReducer.blacklistFilms
});

export default connect(mapStateToProps)(Blacklist);