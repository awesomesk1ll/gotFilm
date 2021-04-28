import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';

import './Lists.scss';
import Navigation from '../../components/Navigation';
import ListLink from '../../components/ListLink';

const Lists = ({ blacklistFilms, alreadySeenFilms, nextTime, favorite }) => {
    return (
        <div className="lists--wrapper theme">
            <div className="lists__header">Списки фильмов</div>
            <Link className="lists__link--color" to="/film"><ListLink listLength={nextTime.data.length}>История предложений</ListLink></Link>
            <Link className="lists__link--color" to="/film"><ListLink listLength={alreadySeenFilms.data.length}>Просмотренные фильмы</ListLink></Link>
            <Link className="lists__link--color" to="/film"><ListLink listLength={blacklistFilms.data.length}>Отклоненные фильмы</ListLink></Link>
            <Link className="lists__link--color" to="/film"><ListLink listLength={favorite.data.length}>Избранные</ListLink></Link>
            <Navigation checked={'lists'} />
        </div>
    )
};

Lists.propTypes = {
    nextTime: PropTypes.object,
    favorite: PropTypes.object,
    blacklistFilms: PropTypes.object,
    alreadySeenFilms: PropTypes.object
};

const mapStateToProps = ({ filmReducer }) => ({
    nextTime: filmReducer.nextTime,
    favorite: filmReducer.favorite,
    blacklistFilms: filmReducer.blacklistFilms,
    alreadySeenFilms: filmReducer.alreadySeenFilms
});

export default connect(mapStateToProps)(Lists);