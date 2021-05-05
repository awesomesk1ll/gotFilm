import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import ListItem from '../../components/ListItem';
import Navigation from '../../components/Navigation';
import './History.scss';


const History = ({ films, history }) => {
    let list = films.length && history.data.map(item => {
        let film = films.find(film => film.id === item.id);
        return <ListItem key={`${film.id}${item.timestamp}`} name={film.name} secondName={film.secondName} year={film.year} rate={film.rate} age={film.age} genre={film.genre} />
    }).reverse();
    return (
        <div className="history--wrapper">
            <div className="history__header">История предложений</div>
            <div className="history__list">
                { list?.length ? list : (<div className="history__placeholder"/>) }
            </div>
            <Navigation checked={'lists'} />
        </div>
    )
};

History.propTypes = {
    history: PropTypes.object,
    films: PropTypes.array
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    history: filmReducer.history
});

export default connect(mapStateToProps)(History);