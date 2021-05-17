import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Typography, Button, Slider, Select, Switch } from 'antd';

import { clearSettings } from '../../store/actions/filmActions';
import { setSettingsAndSave, createFilteredFilms } from '../../store/actions/complexFilmActions';

import { TYPES, RATINGS, YEARS, GENRES, COUNTRIES } from './config';
import './Settings.scss';

const DEFAULT_RATING = [7, 10];
const DEFAULT_YEARS = [1990, 2021];

const { Title, Text } = Typography;

const Settings = ({ settings, clearSettings, setSettingsAndSave, filmsCount, filteredFilmsCount, isLazyLoading, createFilteredFilms }) => {
    const [selectedRatings, setSelectedRatings] = React.useState(settings.filters.ratings);
    const [selectedYears, setSelectedYears] = React.useState(settings.filters.years);

    const setSettings = useCallback((value, type) => {
        // отправляем новое состояние в store
        setSettingsAndSave({ 
            dark: (type === 'mode') ? value : settings.dark,
            filters: {
                types: (type === 'types') ? value : settings.filters.types,
                ratings: (type === 'ratings') ? value : settings.filters.ratings,
                years: (type === 'years') ? value : settings.filters.years,
                genres: (type === 'genres') ? value : settings.filters.genres,
                countries: (type === 'countries') ? value : settings.filters.countries
            }
        });
    }, [settings, setSettingsAndSave]);
   

    const handleSelect = useCallback((value, type) => {
        if (value === "Все") {
            switch (type) {
                case 'genres':
                    setSettings(GENRES.map(genre => genre.value), 'genres');
                    break;
                case 'countries':
                    setSettings(COUNTRIES.map(country => country.value), 'countries');
                    break;
                default:
            }
        }
    }, [setSettings]);

    const handleDeSelect = useCallback((value, type) => {
        if (value === "Все") {
            (type === "genres") ? setSettings([], 'genres') : setSettings([], 'countries')
        }
        if (type === "types" && settings.filters.types.length === 1) {
            setSettings(TYPES.map(type => type.value), 'types')
        }
    }, [setSettings, settings]);

    const handleClearSettings = useCallback(() => {
        localStorage.removeItem('settings');
        clearSettings();
        createFilteredFilms();
        setSelectedRatings(DEFAULT_RATING);
        setSelectedYears(DEFAULT_YEARS);
    }, [clearSettings, createFilteredFilms]);

    return (
        <div className="settings--wrapper theme">
            <div className="settings__header theme">
                <div className="settings__header--title" level={2}>Настройки</div>
            </div>
            <div className="settings__content">
                <Link type="secondary" className="settings__content--login" to='/login'>
                    <Button size="large">Вход / Регистрация</Button>
                </Link>

                <div className="settings__content--row">
                    <Text className="theme">Темная версия оформления</Text>
                    <Switch onChange={(val) => {setSettings(val, "mode")}} value={settings.dark} checked={settings.dark} />
                </div>

                <Title level={3}>Настройки поиска</Title>

                <div className="settings__content--row">
                    <Text className="theme">Тип</Text>
                    <Select className="settings__content--select"
                            mode="multiple"
                            showArrow
                            value={settings.filters.types}
                            onChange={(val) => {setSettings(val, "types")}}
                            onDeselect={(val) => {handleDeSelect(val, "types")}}
                            options={TYPES}
                    />
                </div>

                <div className="settings__content--row theme">
                    <Text className="theme">Рейтинг</Text>
                    <Slider className="settings__content--slider" range
                            marks={RATINGS} min={5} max={10} step={0.5} defaultValue={settings.filters.ratings}
                            value={selectedRatings}
                            onChange={(val) => {setSelectedRatings(val);}}
                            onAfterChange={(val) => {setSettings(val, "ratings")}}
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Годы</Text>
                    <Slider className="settings__content--slider" range
                            marks={YEARS} min={1950} max={2021} defaultValue={settings.filters.years}
                            value={selectedYears}
                            onChange={(val) => {setSelectedYears(val);}}
                            onAfterChange={(val) => {setSettings(val, "years")}}
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Жанры</Text>
                    <Select className="settings__content--select"
                            mode="multiple"
                            showArrow
                            value={settings.filters.genres}
                            onSelect={(val) => {handleSelect(val, "genres")}}
                            onDeselect={(val) => {handleDeSelect(val, "genres")}}
                            onChange={(val) => {setSettings(val, "genres")}}
                            options={GENRES}
                            maxTagCount="responsive"
                            placeholder='не задано'
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Страны</Text>
                    <Select className="settings__content--select"
                            mode="multiple"
                            showArrow
                            value={settings.filters.countries}
                            onSelect={(val) => {handleSelect(val, "countries")}}
                            onDeselect={(val) => {handleDeSelect(val, "countries")}}
                            onChange={(val) => {setSettings(val, "countries")}}
                            options={COUNTRIES}
                            maxTagCount="responsive"
                            placeholder='не задано'
                    />
                </div>

                <Text className={`settings__content--counter${ (filteredFilmsCount < 4 || isLazyLoading) ? ' warning' : '' }`} code>
                    {isLazyLoading ? `Загрузка фильмов: ${filmsCount}` : `Найдено фильмов: ${filteredFilmsCount} из ${filmsCount}`}
                </Text>

                <Button type="secondary" size="large" className="settings__content--reset" onClick={handleClearSettings}>
                    Сбросить настройки
                </Button>

            </div>
        </div>
    )
};

const mapStateToProps = ({ filmReducer }) => ({
    settings: filmReducer.settings,
    filmsCount: filmReducer.films.length,
    filteredFilmsCount: filmReducer.filteredFilms.length,
    isLazyLoading: filmReducer.isLazyLoading
});

Settings.propTypes = {
    clearSettings: PropTypes.func,
    setSettingsAndSave: PropTypes.func,
    createFilteredFilms: PropTypes.func,
    settings: PropTypes.object,
    filmsCount: PropTypes.number,
    filteredFilmsCount: PropTypes.number,
    isLazyLoading: PropTypes.bool
};

const mapDispatchToProps = dispatch => bindActionCreators({ clearSettings, setSettingsAndSave, createFilteredFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);