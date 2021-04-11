import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Router from './containers/Router';
import { fetchFilms } from './store/actions/getApiAction';

const App = ({ fetchFilms }) => {
  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

App.propTypes = {
  fetchFilms: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchFilms }, dispatch);

export default connect(null, mapDispatchToProps)(App);
