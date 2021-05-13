import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Router from './containers/Router';
import { fetchFilms } from './store/actions/complexFilmActions';

const App = ({ fetchFilms, settings }) => {
  useEffect(() => {
    fetchFilms();
  });

  document.body.classList.toggle("dark", settings.dark);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

App.propTypes = {
  fetchFilms: PropTypes.func,
  settings: PropTypes.object
};

const mapStateToProps = ({ filmReducer }) => ({
  settings: filmReducer.settings
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
