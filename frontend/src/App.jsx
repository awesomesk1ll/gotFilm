import React from 'react';
import { Route, Switch } from 'react-router';
import Home from "./pages/Home/Home"
import Catalog from './pages/Catalog';
import LoginForm from './pages/LoginPage/LoginPage';
import RegistrationForm from "./pages/RegistrationPage/RegistrationPage";
import FilmLists from './pages/FilmLists/FilmLists';

const App = (props) => {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/film_lists" component={FilmLists} />
          <Route path="/login" component={LoginForm} />
          <Route path="/registration" component={RegistrationForm} />
        </Switch>
    </div>
  );
};

export default App;
