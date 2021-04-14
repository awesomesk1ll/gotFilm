import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Router from './containers/Router';
import { fetchFilms } from './store/actions/getApiAction';
import { getFromLocalStorage } from './store/actions/getFromLocalStorage';

const App = ({ fetchFilms, getFromLocalStorage }) => {
  useEffect(() => {
    console.log(localStorage.getItem('blacklist'));
    console.log(localStorage.getItem('seenList'));
    getFromLocalStorage();
    fetchFilms();
  });

  return (
    <div className="App">
      <Router />
    </div>
  );
};

App.propTypes = {
  fetchFilms: PropTypes.func,
  getFromLocalStorage: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchFilms, getFromLocalStorage }, dispatch);

export default connect(null, mapDispatchToProps)(App);
