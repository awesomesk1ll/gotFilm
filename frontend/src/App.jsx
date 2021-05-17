import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Router from './containers/Router';
import { fetchFilms } from './store/actions/complexFilmActions';

const App = ({ fetchFilms, settings, filmsCount }) => {
  useEffect(() => {
    if (!filmsCount) {
      fetchFilms();
    }
  }, [fetchFilms, filmsCount]);

  document.body.classList.toggle("dark", settings.dark);

  return (
    <div className="App">
      <div className="container theme">
        <Router /> 
      </div>
    </div>
  );
};

App.propTypes = {
  fetchFilms: PropTypes.func,
  settings: PropTypes.object,
  filmsCount: PropTypes.number
};

const mapStateToProps = ({ filmReducer }) => ({
  settings: filmReducer.settings,
  filmsCount: filmReducer.films.length
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
