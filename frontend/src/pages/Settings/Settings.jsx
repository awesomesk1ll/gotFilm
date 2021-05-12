import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import { clearLists } from '../../store/actions/filmActions';

import { setSettingsAndSave } from '../../store/actions/complexFilmActions';

//import { setSettingsAndSave } from '../../store/actions/complexFilmActions';

import { Typography, Button, Slider, Select, Switch } from 'antd';
import Navigation from '../../components/Navigation';
import { TYPES, RATINGS, YEARS, GENRES, COUNTRIES } from './config';
import './Settings.scss';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Settings = ({ settings, clearLists, setSettingsAndSave }) => {
    const [selectedTypes, setSelectedTypes] = React.useState(settings.filters.types);
    const [selectedRatings, setSelectedRatings] = React.useState(settings.filters.ratings);
    const [selectedYears, setSelectedYears] = React.useState(settings.filters.years);
    const [selectedGenres, setSelectedGenres] = React.useState(settings.filters.genres);
    const [selectedCountries, setSelectedCountries] = React.useState(settings.filters.countries);
    const [darkMode, setDarkMode] = React.useState(settings.dark);

    const setSettings = useCallback((value, type) => {
        // меняем локальное состояние компонента
        switch (type) {
            case 'types':
                setSelectedTypes(value);
                break;
            case 'ratings':
                setSelectedRatings(value);
                break;
            case 'years':
                setSelectedYears(value);
                break;
            case 'genres':
                setSelectedGenres(value);
                break;
            case 'countries':
                setSelectedCountries(value);
                break;
            case 'mode':
                setDarkMode(value);
                document.body.classList.toggle("dark", value);
                break;
        }

        // отправляем новое состояние в store
        setSettingsAndSave({ 
            dark: (type === 'mode') ? value : darkMode,
            filters: {
                types: (type === 'types') ? value : selectedTypes,
                ratings: (type === 'ratings') ? value : selectedRatings,
                years: (type === 'years') ? value : selectedYears,
                genres: (type === 'genres') ? value : selectedGenres,
                countries: (type === 'countries') ? value : selectedCountries
            }
        });
    }, [setSettingsAndSave]);
   

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
        if (type === "types" && selectedTypes.length === 1) {
            setSelectedTypes(TYPES.map(type => type.value))
        }
    }

    const handleClearSettings = () => {
        clearLists();
        ['blacklist', 'alreadySeen', 'history', 'favorites'].forEach(list => {localStorage.removeItem(list)});
    }

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
                    <Switch onChange={(val) => {setSettings(val, "mode")}} defaultChecked={darkMode} />
                </div>

                <Title level={3}>Настройки поиска</Title>

                <div className="settings__content--row">
                    <Text className="theme">Тип</Text>
                    <Select className="settings__content--select"
                            mode="multiple"
                            showArrow
                            value={selectedTypes}
                            onChange={(val) => {setSettings(val, "types")}}
                            onDeselect={(val) => {handleDeSelect(val, "types")}}
                            options={TYPES}
                    />
                </div>

                <div className="settings__content--row theme">
                    <Text className="theme">Рейтинг</Text>
                    <Slider className="settings__content--slider" range
                            marks={RATINGS} min={5} max={10} step={0.5} defaultValue={selectedRatings}
                            onChange={(val) => {setSettings(val, "ratings")}}
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Годы</Text>
                    <Slider className="settings__content--slider" range
                            marks={YEARS} min={1980} max={2021} defaultValue={selectedYears}
                            onChange={(val) => {setSettings(val, "years")}}
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
                            onChange={(val) => {setSettings(val, "genres")}}
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
                            onChange={(val) => {setSettings(val, "countries")}}
                            options={COUNTRIES}
                            maxTagCount={4}
                    />
                </div>

                <Button type="secondary" size="large" className="settings__content--reset" onClick={handleClearSettings}>
                    Сбросить настройки
                </Button>

            </div>
            <Navigation checked={ 'settings' } />
        </div>
    )
};

const mapStateToProps = ({ filmReducer }) => ({
    settings: filmReducer.settings,
});

Settings.propTypes = {
    clearLists: PropTypes.func,
    setSettingsAndSave: PropTypes.func,
    settings: PropTypes.object
};

const mapDispatchToProps = dispatch => bindActionCreators({ clearLists, setSettingsAndSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);