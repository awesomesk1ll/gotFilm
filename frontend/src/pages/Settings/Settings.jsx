import React, { useState, useEffect } from 'react';
import { Typography, Button, Slider, Select } from 'antd';
import Navigation from '../../components/Navigation';
import { RATINGS, YEARS, GENRES, COUNTRIES } from './config';
import './Settings.scss';
import ThemeSwitch from '../../components/ThemeSwitch/ThemeSwitch';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';


import { updateFilteredFilms } from '../../store/actions/filmActions';

const { Title, Text } = Typography;

const Settings = (props) => {
    const [selectedGenres, setSelectedGenres] = useState(['боевик','комедия']);
    const [selectedCountries, setSelectedCountries] = useState(['Россия','США']);
    const [numberRate, setNumberRate] = useState([7,9]);
    const [numberYear, setNumberYear] = useState([1990,2020]);

    useEffect(() => {
      let filteredFilms = props.films.filter(film => film.countries.filter(el => selectedCountries.includes(el)).length > 0 );
      filteredFilms = filteredFilms.filter(film => film.genres.filter(el => selectedGenres.includes(el)).length > 0 );
      filteredFilms = filteredFilms.filter(film => film.year >= numberYear[0] && film.year <= numberYear[1]);
      filteredFilms = filteredFilms.filter(film => film.rate >= numberRate[0] && film.rate <= numberRate[1]);
      props.updateFilteredFilms(filteredFilms);
    }, [selectedCountries, selectedGenres, numberRate, numberYear]);

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
                            marks={RATINGS}
                            min={5}
                            max={10}
                            step={0.5}
                            defaultValue={[7, 9]}
                            onAfterChange={(value) => {setNumberRate(value)}}
                    />
                </div>

                <div className="settings__content--row">
                    <Text className="theme">Годы</Text>
                    <Slider className="settings__content--slider" range
                            marks={YEARS}
                            min={1980}
                            max={2021}
                            defaultValue={[1990, 2020]}
                            onAfterChange={(value) => {setNumberYear(value)}}
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

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    idFilmsFiltered: filmReducer.idFilmsFiltered
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateFilteredFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
