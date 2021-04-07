import React from 'react';
import { Route, Switch } from 'react-router';

import Home from "../pages/Home/Home"
import LoginForm from '../pages/LoginPage';
import RegistrationForm from "../pages/RegistrationPage";
import FilmCardContainer from './FilmCardContainer';
import Settings from '../pages/Settings';


const Router = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/login" component={ LoginForm } />
            <Route path="/registration" component={ RegistrationForm } />
            <Route path="/film" component={ FilmCardContainer } />
            <Route path="/settings" component={ Settings } />
        </Switch>
    );
};

export default Router;