import React from 'react';
import { Route, Switch } from 'react-router';

import Home from "../pages/Home/Home"
import Catalog from '../pages/Catalog';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import FilmCardContainer from './FilmCardContainer';
import FilmLists from '../pages/FilmLists/FilmLists';


const Router = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/login" component={LoginPage} />
            <Route path="/registration" component={RegistrationPage} />
            <Route path="/film" component={FilmCardContainer} />
            <Route path="/film_lists" component={FilmLists} />
        </Switch>
    );
};

export default Router;