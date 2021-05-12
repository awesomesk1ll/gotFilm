import React from 'react';
import { Typography, Button, Slider, Select } from 'antd';
import PropTypes from 'prop-types';

import { clearLists } from '../../store/actions/filmActions';

import Navigation from '../../components/Navigation';
import { RATINGS, YEARS, GENRES, COUNTRIES } from './config';
import './Settings.scss';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { updateFilterRating, updateFilterYear, updateFilterCountry, updateFilterGenre, updateButtonState } from '../../store/actions/filmActions';
import { updateFilteredFilms } from '../../store/actions/filmActions';
import ThemeSwitch from '../../components/ThemeSwitch'

const { Title, Text } = Typography;

const Settings = ({ rate, year, genre, countries, idFilmsFiltered, buttonState, updateFilterRating, updateFilterYear, updateFilterGenre, updateFilterCountry, updateButtonState, clearLists }) => {

    const handleSelect = (value, type) => {
        if (value === "Все") {
            (type === "genres")
                ? updateFilterGenre(GENRES.map(genre => genre.value))
                : updateFilterCountry(COUNTRIES.map(country => country.value));
        }
    }

    const handleDeSelect = (value, type) => {
        if (value === "Все") {
            (type === "genres") ? updateFilterGenre([]) : updateFilterCountry([]);
        }
    }

    const handleClearSettings = () => {
        clearLists();
        localStorage.removeItem('blacklist');
        localStorage.removeItem('alreadySeen');
        localStorage.removeItem('history');
        localStorage.removeItem('favorites');
    }

    return (
        <div className="settings--wrapper theme">
            <div className="settings__header theme">
                <div className="settings__header--title" level={ 2 }>Настройки</div>
            </div>
            <div className="settings__content">
                <Link type="secondary" className="settings__content--login" to='/login'>
                    <Button size="large">Вход / Регистрация</Button>
                </Link>

                <div className="settings__content--row">
                    <Text className="theme">Темная версия оформления</Text>
                    <ThemeSwitch />
                </div>

                <Title level={ 3 }>Настройки поиска</Title>

                <div className="settings__content--row theme">
                    <Text className="theme">Рейтинг</Text>
                    <Slider className="settings__content--slider" range
                        marks={ RATINGS }
                        min={ 5 }
                        max={ 10 }
                        step={ 0.5 }
                        value={ rate }
                        onChange={ (value) => { updateFilterRating(value) } }
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Годы</Text>
                    <Slider className="settings__content--slider" range
                        marks={ YEARS }
                        min={ 1950 }
                        max={ 2021 }
                        value={ year }
                        onChange={ (value) => { updateFilterYear(value) } }
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Жанры</Text>
                    <Select className="settings__content--select"
                        mode="multiple"
                        showArrow
                        value={ genre }
                        onSelect={ (val) => { handleSelect(val, "genres") } }
                        onDeselect={ (val) => { handleDeSelect(val, "genres") } }
                        onChange={ (value) => { updateFilterGenre(value) } }
                        options={ GENRES }
                        maxTagCount={ 3 }
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Страны</Text>
                    <Select className="settings__content--select"
                        mode="multiple"
                        showArrow
                        value={ countries }
                        onSelect={ (val) => { handleSelect(val, "countries") } }
                        onDeselect={ (val) => { handleDeSelect(val, "countries") } }
                        onChange={ (value) => { updateFilterCountry(value) } }
                        options={ COUNTRIES }
                        maxTagCount={ 4 }
                    />
                </div>
                <div>
                    Найдено { idFilmsFiltered.length } фильмов
                </div>

                <Button type="secondary" size="large" className="settings__content--reset" onClick={ handleClearSettings }>
                    Сбросить настройки
                </Button>

            </div>
            <Navigation checked={ 'settings' } />
            {/* <Filter /> */ }
        </div>
    )
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    idFilmsFiltered: filmReducer.idFilmsFiltered
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateFilterRating, updateFilteredFilms, updateFilterYear, updateFilterGenre, updateFilterCountry, updateButtonState, clearLists }, dispatch);

Settings.propTypes = {
    clearLists: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
