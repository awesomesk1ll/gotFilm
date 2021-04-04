import React from 'react';
import { Route, Switch } from 'react-router';

import Home from "../pages/Home/Home"
import LoginForm from '../pages/LoginPage/LoginPage';
import RegistrationForm from "../pages/RegistrationPage/RegistrationPage";
import FilmCardContainer from './FilmCardContainer';


const Router = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/registration" component={RegistrationForm} />
            <Route path="/film" component={FilmCardContainer} />
        </Switch>
    );
};

export default Router;