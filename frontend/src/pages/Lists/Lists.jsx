import React, { useEffect, useState } from 'react';
import { List, Typography } from 'antd';
import './Lists.scss';
import Navigation from '../../components/Navigation';
import { Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

import FilmList from './FilmList';

const { Title } = Typography;
const data = [
    {
        id: 1,
        titel: 'История предложений'
    },
    {
        id: 2,
        titel: 'Просмотренные фильмы'
    },
    {
        id: 3,
        titel: 'Отклоненные фильмы'
    },
    {
        id: 4,
        titel: 'Избранные'
    }
];

const Lists = ({ blackList, seenList, films }) => {
    const [blacklist] = useState([]);
    const [seenlist] = useState([]);

    const handleAddToListById = (listName, place) => {
        for (let i = 0; i < listName.data.length; i++) {
            let addedFilms = films.find(item => item.id === listName.data[i].id);
            place.push(addedFilms)
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
                    <Link to={ `/lists/${item.id}` }>
                        <List.Item
                            className="theme"
                            extra={ <span className="lists__films-counter">{ blacklist.length }</span> }
                        >
                            { item.titel }
                        </List.Item>
                    </Link>
                ) }
            />
            <FilmList name={ 'Отклоненные фильмы' } source={ blacklist } />
            <Navigation checked={ 'lists' } />
        </div>
    )
};


const mapStateToProps = ({ filmReducer }) => ({
    blackList: filmReducer.blacklistFilms,
    seenList: filmReducer.alreadySeenFilms,
    films: filmReducer.films
});

export default connect(mapStateToProps)(Lists);