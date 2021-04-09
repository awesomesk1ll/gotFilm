import React from 'react';
import { List, Typography, Divider } from 'antd';
import FilmCardButton from '../../components/FilmCardButton/FilmCardButton';
import Star from '../../components/icons/Star';
import './Lists.scss';
import Navigation from '../../components/Navigation';

const { Title } = Typography;
const data = [
    'История предложений',
    'Просмотренные фильмы',
    'Отклоненные фильмы',
    'Избранные',
];

const Lists = (props) => {

    return (
        <div className="lists--wrapper theme">
            <div className="lists__header theme">
                <Title className="lists__header--title" level={2}>списки фильмов</Title>
            </div>
            <div className="lists_content">

                <List
                    size="large"
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />

            </div>
            <Navigation checked={'lists'} />

        </div>
    )
};

export default Lists;