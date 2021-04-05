import React from 'react';
import { Typography, Button, Switch, Slider, Select } from 'antd';
import Navigation from '../../components/Navigation';
import './Settings.scss';

const { Title, Text } = Typography;

const ratings = { 5: 'от 5', 10: 'до 10' };
const years = { 1980: 'c 1980', 2021: 'по 2021' };
const genres = [{ value: 'боевик' }, { value: 'комедия' }, { value: 'драма' }, { value: 'мюзикл' }];
const countries = [{ value: 'Россия' }, { value: 'США' }, { value: 'Франция' }, { value: 'Германия' }];

const Settings = (props) => {
    
    return (
        <div className="settings--wrapper">
            <div className="settings__header">
                <Title className="settings__header--title" level={2}>Настройки</Title>
            </div>
            <div className="settings__content">
                <Button type="secondary" size="large" className="settings__content--login">
                    Вход / Регистрация
                </Button>

                <div className="settings__content--row">
                    <Text>Темная версия оформления</Text>
                    <Switch/>
                </div>

                <Title level={3}>Настройки поиска</Title>

                <div className="settings__content--row">
                    <Text>Рейтинг</Text>
                    <Slider className="settings__content--slider" range
                            marks={ratings} min={5} max={10} step={0.5} defaultValue={[7, 9]}
                    />
                </div>

                <div className="settings__content--row">
                    <Text>Годы</Text>
                    <Slider className="settings__content--slider" range
                            marks={years} min={1980} max={2021} defaultValue={[1990, 2020]}
                    />
                </div>

                <div className="settings__content--row">
                    <Text>Жанры</Text>
                    <Select className="settings__content--select"
                            mode="multiple"
                            showArrow
                            defaultValue={['боевик', 'мюзикл']}
                            options={genres}
                    />
                </div>

                <div className="settings__content--row">
                    <Text>Страны</Text>
                    <Select className="settings__content--select"
                            mode="multiple"
                            showArrow
                            defaultValue={['Россия', 'США']}
                            options={countries}
                    />
                </div>

                <Button type="secondary" size="large" className="settings__content--reset">
                    Сбросить настройки
                </Button>

            </div>
            <Navigation checked={ 'settings' } />
        </div>
    )
};

export default Settings;