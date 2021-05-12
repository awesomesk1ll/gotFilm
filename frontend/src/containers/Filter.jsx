import React, { useEffect } from 'react';
import { updateFilteredFilms } from '../store/actions/filmActions';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Settings from '../pages/Settings'

const Filter = ({ films, numberRate, numberYear, selectedGenres, selectedCountries, updateFilteredFilms }) => {
  useEffect(() => {
    let filteredFilms = films.filter(film => film.countries.filter(el => selectedCountries.includes(el)).length > 0);
    filteredFilms = filteredFilms.filter(film => film.genres.filter(el => selectedGenres.includes(el)).length > 0);
    filteredFilms = filteredFilms.filter(film => film.year >= numberYear[0] && film.year <= numberYear[1]);
    filteredFilms = filteredFilms.filter(film => film.rate >= numberRate[0] && film.rate <= numberRate[1]);
    updateFilteredFilms(filteredFilms.map(film => film.id));
    // console.log('filtering');
  });
  return (<Settings rate={ numberRate } year={ numberYear } genre={ selectedGenres } countries={ selectedCountries } />)
}

const mapStateToProps = ({ filmReducer }) => ({
  films: filmReducer.films,
  numberRate: filmReducer.ratingFilter,
  numberYear: filmReducer.yearFilter,
  selectedGenres: filmReducer.genreFilter,
  selectedCountries: filmReducer.countryFilter
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateFilteredFilms }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
