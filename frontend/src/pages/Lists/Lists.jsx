import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';

import './Lists.scss';
import Navigation from '../../components/Navigation';
import ListLink from '../../components/ListLink';

const Lists = ({ blacklist, alreadySeen, history, favorites }) => {
    return (
        <div className="lists--wrapper theme">
            <div className="lists__header theme">Списки фильмов</div>
            <Link className="lists__link--color" to="/history"><ListLink listLength={history.data.length}>История предложений</ListLink></Link>
            <Link className="lists__link--color" to="/seenList"><ListLink listLength={alreadySeen.data.length}>Просмотренные фильмы</ListLink></Link>
            <Link className="lists__link--color" to="/blacklist"><ListLink listLength={blacklist.data.length}>Отклоненные фильмы</ListLink></Link>
            <Link className="lists__link--color" to="/favorites"><ListLink listLength={favorites.data.length}>Избранные</ListLink></Link>
            <Navigation checked={'lists'} />
        </div>
    )
};

Lists.propTypes = {
    history: PropTypes.object,
    favorites: PropTypes.object,
    blacklist: PropTypes.object,
    alreadySeen: PropTypes.object
};

const mapStateToProps = ({ filmReducer }) => ({
    history: filmReducer.history,
    favorites: filmReducer.favorites,
    blacklist: filmReducer.blacklist,
    alreadySeen: filmReducer.alreadySeen
});

export default connect(mapStateToProps)(Lists);