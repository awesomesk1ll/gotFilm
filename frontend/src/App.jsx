import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Router from './containers/Router';
import { getFilmsFromApi } from './store/actions/getApiAction';

const App = (props) => {
  useEffect(() => {
    props.getFilmsFromApi();
  }, []);

  return (
    <div className="App">
        <Router />
    </div>
  );
};

App.propTypes = {
  getFilmsFromApi: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ getFilmsFromApi }, dispatch);

export default connect(null, mapDispatchToProps)(App);
