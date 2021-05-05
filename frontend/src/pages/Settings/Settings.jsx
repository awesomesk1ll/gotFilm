import React from 'react';
import { Typography, Button, Slider, Select, Switch} from 'antd';
import PropTypes from 'prop-types';

import { clearLists } from '../../store/actions/filmActions';

import Navigation from '../../components/Navigation';
import { RATINGS, YEARS, GENRES, COUNTRIES } from './config';
import './Settings.scss';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Filter from '../../containers/Filter'
import { updateFilterRating, updateFilterYear, updateFilterCountry, updateFilterGenre, updateButtonState } from '../../store/actions/filmActions';
import { updateFilteredFilms } from '../../store/actions/filmActions';

const { Title, Text } = Typography;

const Settings = (props) => {

    const handleSelect = (value, type) => {
        if (value === "Все") {
            (type === "genres")
                ? props.updateFilterGenre(GENRES.map(genre => genre.value))
                : props.updateFilterCountry(COUNTRIES.map(country => country.value));
        }
    }

    const handleDeSelect = (value, type) => {
        if (value === "Все") {
            (type === "genres") ? props.updateFilterGenre([]) : updateFilterCountry([]);
        }
    }

    const handleClearSettings = () => {
        props.clearLists();
        localStorage.removeItem('blacklist');
        localStorage.removeItem('seenList');
    }

    return (
        <div className="settings--wrapper theme">
            <div className="settings__header theme">
                <Title className="settings__header--title" level={2}>Настройки</Title>
            </div>
            <div className="settings__content">
                <Link type="secondary" className="settings__content--login" to='/login'>
                    <Button size="large">Вход / Регистрация</Button>
                </Link>

                <div className="settings__content--row">
                    <Text className="theme">Темная версия оформления</Text>
                    <Switch
                        checked={props.buttonState}
                        onClick={
                            (checked) => {
                                props.updateButtonState(checked);
                                //document.body.classList.toggle("dark", checked);
                            }
                        }
                    />
                </div>

                <Title level={3}>Настройки поиска</Title>

                <div className="settings__content--row theme">
                    <Text className="theme">Рейтинг</Text>
                    <Slider className="settings__content--slider" range
                            marks={RATINGS}
                            min={5}
                            max={10}
                            step={0.5}
                            value={props.numberRate}
                            onChange={(value) => {props.updateFilterRating(value)}}
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Годы</Text>
                    <Slider className="settings__content--slider" range
                            marks={YEARS}
                            min={1950}
                            max={2021}
                            value={props.numberYear}
                            onChange={(value) => {props.updateFilterYear(value)}}
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Жанры</Text>
                    <Select className="settings__content--select"
                            mode="multiple"
                            showArrow
                            value={props.selectedGenres}
                            onSelect={(val) => {handleSelect(val, "genres")}}
                            onDeselect={(val) => {handleDeSelect(val, "genres")}}
                            onChange={(value) => {props.updateFilterGenre(value)}}
                            options={GENRES}
                            maxTagCount={3}
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Страны</Text>
                    <Select className="settings__content--select"
                            mode="multiple"
                            showArrow
                            value={props.selectedCountries}
                            onSelect={(val) => {handleSelect(val, "countries")}}
                            onDeselect={(val) => {handleDeSelect(val, "countries")}}
                            onChange={(value) => {props.updateFilterCountry(value)}}
                            options={COUNTRIES}
                            maxTagCount={4}
                    />
                </div>
                <div>
                Найдено {props.idFilmsFiltered.length} фильмов
                </div>

                <Button type="secondary" size="large" className="settings__content--reset" onClick={handleClearSettings}>
                    Сбросить настройки
                </Button>

            </div>
            <Navigation checked={ 'settings' } />
            <Filter />
        </div>
    )
};

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    idFilmsFiltered: filmReducer.idFilmsFiltered,
    numberRate: filmReducer.ratingFilter,
    numberYear: filmReducer.yearFilter,
    selectedGenres: filmReducer.genreFilter,
    selectedCountries: filmReducer.countryFilter,
    buttonState: filmReducer.buttonState
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateFilterRating, updateFilteredFilms, updateFilterYear, updateFilterGenre, updateFilterCountry, updateButtonState, clearLists}, dispatch);

Settings.propTypes = {
    clearLists: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
