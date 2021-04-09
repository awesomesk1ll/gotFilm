import React from 'react';
import { Typography, Button, Slider, Select } from 'antd';
import Navigation from '../../components/Navigation';
import { RATINGS, YEARS, GENRES, COUNTRIES } from './config';
import './Settings.scss';
import ThemeSwitch from '../../components/ThemeSwitch/ThemeSwitch';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Settings = (props) => {
    const [selectedGenres, setSelectedGenres] = React.useState(['боевик','комедия']);
    const [selectedCountries, setSelectedCountries] = React.useState(['Россия','США']);

    const handleSelect = (value, type) => {
        if (value === "Все") {
            (type === "genres")
                ? setSelectedGenres(GENRES.map(genre => genre.value))
                : setSelectedCountries(COUNTRIES.map(country => country.value));
        }
    }

    const handleDeSelect = (value, type) => {
        if (value === "Все") {
            (type === "genres") ? setSelectedGenres([]) : setSelectedCountries([])
        }
    }

    return (
        <div className="settings--wrapper theme">
            <div className="settings__header theme">
                <Title className="settings__header--title" level={2}>Настройки</Title>
            </div>
            <div className="settings__content">
                <Button type="secondary" size="large" className="settings__content--login">
                    Вход / Регистрация
                </Button>

                <div className="settings__content--row">
                    <Text className="theme">Темная версия оформления</Text>
                    <ThemeSwitch/>
                </div>

                <Title level={3}>Настройки поиска</Title>

                <div className="settings__content--row theme">
                    <Text className="theme">Рейтинг</Text>
                    <Slider className="settings__content--slider" range
                            marks={RATINGS} min={5} max={10} step={0.5} defaultValue={[7, 9]}
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Годы</Text>
                    <Slider className="settings__content--slider" range
                            marks={YEARS} min={1980} max={2021} defaultValue={[1990, 2020]}
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Жанры</Text>
                    <Select className="settings__content--select"
                            mode="multiple"
                            showArrow
                            value={selectedGenres}
                            onSelect={(val) => {handleSelect(val, "genres")}}
                            onDeselect={(val) => {handleDeSelect(val, "genres")}}
                            onChange={setSelectedGenres}
                            options={GENRES}
                            maxTagCount={3}
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Страны</Text>
                    <Select className="settings__content--select"
                            mode="multiple"
                            showArrow
                            value={selectedCountries}
                            onSelect={(val) => {handleSelect(val, "countries")}}
                            onDeselect={(val) => {handleDeSelect(val, "countries")}}
                            onChange={setSelectedCountries}
                            options={COUNTRIES}
                            maxTagCount={4}
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