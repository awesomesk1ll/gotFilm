import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';

import './Lists.scss';
import ListLink from '../../components/ListLink';
import { clearLists } from '../../store/actions/filmActions';

const Lists = ({ blacklist, temporary, alreadySeen, history, favorites, clearLists }) => {
    const handleClearButton = useCallback(() => {
        ['blacklist', 'alreadySeen', 'history', 'favorites'].forEach(list => {localStorage.removeItem(list)});
        clearLists()
    }, [clearLists])


    return (
        <div className="lists--wrapper theme">
            <div className="lists__header theme">Списки фильмов</div>
            <Link className="lists__link--color theme" to="/history"><ListLink listLength={history.data.length}>История предложений</ListLink></Link>
            <Link className="lists__link--color theme" to="/seenList"><ListLink listLength={alreadySeen.data.length}>Просмотренные фильмы</ListLink></Link>
            <Link className="lists__link--color theme" to="/blacklist"><ListLink listLength={blacklist.data.length}>Отклоненные фильмы</ListLink></Link>
            <Link className="lists__link--color theme" to="/temporary"><ListLink listLength={temporary.data.length}>В другой раз</ListLink></Link>
            <Link className="lists__link--color theme" to="/favorites"><ListLink listLength={favorites.data.length}>Избранные</ListLink></Link>
            <div className="lists__button__group">
                <Button className="button" type="secondary" size="large" onClick={handleClearButton}>Очистить списки</Button>
            </div>
        </div>
    )
};

Lists.propTypes = {
    history: PropTypes.object,
    favorites: PropTypes.object,
    blacklist: PropTypes.object,
    temporary: PropTypes.object,
    alreadySeen: PropTypes.object,
    clearLists: PropTypes.func,
};

const mapDispatchToProps = dispatch => bindActionCreators({ clearLists }, dispatch);

const mapStateToProps = ({ filmReducer }) => ({
    history: filmReducer.history,
    favorites: filmReducer.favorites,
    blacklist: filmReducer.blacklist,
    temporary: filmReducer.temporary,
    alreadySeen: filmReducer.alreadySeen
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);