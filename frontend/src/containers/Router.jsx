import React from 'react';
import { Route, Switch } from 'react-router';

import Home from "../pages/Home/Home"
import Catalog from '../pages/Catalog';
import LoginForm from '../pages/LoginPage/LoginPage';
import RegistrationForm from "../pages/RegPage/RegPage";
import FilmCardContainer from './FilmCardContainer';


const Router = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/login" component={LoginForm} />
            <Route path="/registration" component={RegistrationForm} />
            <Route path="/film" component={FilmCardContainer} />
        </Switch>
    );
};

export default Router;