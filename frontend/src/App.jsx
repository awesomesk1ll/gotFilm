import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Router from './containers/Router';
import Error from './pages/Error';
import { getFilms } from './store/actions/complexFilmActions';

const App = ({ getFilms, settings, filmsCount, error }) => {
  useEffect(() => {
    if (!filmsCount) {
      getFilms();
    }
  }, [getFilms, filmsCount]);

  document.body.classList.toggle("dark", settings.dark);

  return (
    <div className="App">
      <div className="container theme">
       { error ? <Error text={error}/> : <Router /> }
      </div>
    </div>
  );
};

App.propTypes = {
  error: PropTypes.string,
  getFilms: PropTypes.func,
  settings: PropTypes.object,
  filmsCount: PropTypes.number
};

const mapStateToProps = ({ filmReducer }) => ({
  settings: filmReducer.settings,
  filmsCount: filmReducer.films.length,
  error: filmReducer.error
});

const mapDispatchToProps = dispatch => bindActionCreators({ getFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
