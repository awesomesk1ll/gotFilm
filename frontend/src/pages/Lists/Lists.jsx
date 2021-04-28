import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';

import './Lists.scss';
import Navigation from '../../components/Navigation';
import ListLink from '../../components/ListLink';

const Lists = ({ blacklistFilms, alreadySeenFilms, history, favorite }) => {
    return (
        <div className="lists--wrapper theme">
            <div className="lists__header">Списки фильмов</div>
            <Link className="lists__link--color" to="/history"><ListLink listLength={history.data.length}>История предложений</ListLink></Link>
            <Link className="lists__link--color" to="/seenList"><ListLink listLength={alreadySeenFilms.data.length}>Просмотренные фильмы</ListLink></Link>
            <Link className="lists__link--color" to="/blacklist"><ListLink listLength={blacklistFilms.data.length}>Отклоненные фильмы</ListLink></Link>
            <Link className="lists__link--color" to="/film"><ListLink listLength={favorite.data.length}>Избранные</ListLink></Link>
            <Navigation checked={'lists'} />
        </div>
    )
};

Lists.propTypes = {
    history: PropTypes.object,
    favorite: PropTypes.object,
    blacklistFilms: PropTypes.object,
    alreadySeenFilms: PropTypes.object
};

const mapStateToProps = ({ filmReducer }) => ({
    history: filmReducer.history,
    favorite: filmReducer.favorite,
    blacklistFilms: filmReducer.blacklistFilms,
    alreadySeenFilms: filmReducer.alreadySeenFilms
});

export default connect(mapStateToProps)(Lists);