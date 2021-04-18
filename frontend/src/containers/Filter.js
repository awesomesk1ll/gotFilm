import React from 'react';

import { updateFilteredFilms } from '../store/actions/filmActions';

const Filter = (props) => {
  let filteredFilms = props.films.filter(film => film.countries.filter(el => props.selectedCountries.includes(el)).length > 0 );
  filteredFilms = filteredFilms.filter(film => film.genres.filter(el => props.selectedGenres.includes(el)).length > 0 );
  filteredFilms = filteredFilms.filter(film => film.year >= props.numberYear[0] && film.year <= props.numberYear[1]);
  filteredFilms = filteredFilms.filter(film => film.rate >= props.numberRate[0] && film.rate <= props.numberRate[1]);
  props.updateFilteredFilms(filteredFilms.map(film => film.id));
  return(null);
}

const mapStateToProps = ({ filmReducer }) => ({
    films: filmReducer.films,
    numberRate: filmReducer.ratingFilter,
    numberYear: filmReducer.yearFilter,
    selectedGenres: filmReducer.genreFilter,
    selectedCountries: filmReducer.countryFilter
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateFilteredFilms }, dispatch);
export default Filter;
