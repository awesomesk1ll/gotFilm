import React from 'react';
import { List, Typography } from 'antd';
import './Lists.scss';
import Navigation from '../../components/Navigation';
import { Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

const { Title } = Typography;
const data = [
    'История предложений',
    'Просмотренные фильмы',
    'Отклоненные фильмы',
    'Избранные',
];

const Lists = ({ blackList }) => {
    const a = () => console.log(blackList);
    a();
    const head = <div className="lists__header theme">
        <Title className="lists__header--title" level={ 2 }>Списки фильмов</Title>
    </div>;
    return (
        <div className="lists-wrapper theme">
            <div className="lists__content">
                <List
                    className="lists__titel"
                    size="large"
                    header={ head }
                    bordered
                    dataSource={ data }
                    renderItem={ item => (
                        <Link to="/">
                            <List.Item
                                className="theme"
                                extra={ <span>{ data.length }</span> }
                            >
                                { item }
                            </List.Item>
                        </Link>
                    ) }
                />
            </div>
            <Navigation checked={ 'lists' } />
        </div>
    )
};

const mapStateToProps = ({ filmReducer }) => ({
    blackList: filmReducer.blacklistFilms
});

export default connect(mapStateToProps)(Lists);