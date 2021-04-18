import React, { useEffect, useState } from 'react';
import { List, Typography } from 'antd';
import './Lists.scss';
import Navigation from '../../components/Navigation';
import { Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

import ListItem from '../../components/ListItem/ListItem';

const { Title } = Typography;
const data = [
    'История предложений',
    'Просмотренные фильмы',
    'Отклоненные фильмы',
    'Избранные',
];

const Lists = ({ blackList, seenList, films }) => {
    const [blacklist] = useState([]);
    const [seenlist] = useState([]);

    const handleAddToListById = (listName, place) => {
        for (let i = 0; i < listName.data.length; i++) {
            let a = films.find(item => item.id === listName.data[i].id);
            place.push(a)
        }
        console.log(place);
    }
    useEffect(() => {
        handleAddToListById(blackList, blacklist);
        handleAddToListById(seenList, seenlist);
    });

    const head = <div className="lists__header theme">
        <Title className="lists__header--title" level={ 2 }>Списки фильмов</Title>
    </div>;

    return (
        <div className="lists-wrapper theme">
            <List
                className="lists__container"
                size="large"
                header={ head }
                bordered
                dataSource={ data }
                renderItem={ item => (
                    <Link to="/">
                        <List.Item
                            className="theme"
                            extra={ <span className="lists__films-counter">{ 'list.length' }</span> }
                        >
                            { item }
                        </List.Item>
                    </Link>
                ) }
            />
            <List
                className="lists__container"
                size="large"
                header={ head }
                bordered
                dataSource={ blacklist }
                renderItem={ item => (
                    <List.Item >
                        <ListItem
                            key={ `item-${item.id}` }
                            name={ item.name }
                            secondName={ item.secondName }
                            year={ item.year }
                            genre={ item.genres }
                            age={ item.age }
                            rate={ item.rate }
                        />
                    </List.Item>
                ) }
            />
            <Navigation checked={ 'lists' } />
        </div>
    )
};

const mapStateToProps = ({ filmReducer }) => ({
    blackList: filmReducer.blacklistFilms,
    seenList: filmReducer.alreadySeenFilms,
    films: filmReducer.films,
    film: filmReducer.film
});

export default connect(mapStateToProps)(Lists);