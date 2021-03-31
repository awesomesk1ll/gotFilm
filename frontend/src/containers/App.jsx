import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Home from "../pages/Home/Home"
import Catalog from '../pages/Catalog';
import LoginForm from '../pages/LoginPage/LoginPage';
import RegistrationForm from "../pages/RegPage/RegPage";
import FilmCard from './FilmCard';
import { getFilmsFromApi } from '../store/actions/filmActions';

const App = (props) => {
  useEffect(() => {
    props.getFilmsFromApi();
}, []);

  return (
    <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/catalog" render={() => <Catalog />} />
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/registration" render={() => <RegistrationForm />} />
          <Route path="/film" render={() => <FilmCard /> } />
        </Switch>
    </div>
  );
};

App.propTypes = {
  getFilmsFromApi: PropTypes.func
};

const mapDispatchToProps = dispatch => bindActionCreators({ getFilmsFromApi }, dispatch);

export default connect(null, mapDispatchToProps)(App);
