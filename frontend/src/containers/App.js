import React from 'react';
import { Route, Switch } from 'react-router';
import MainPage from '../pages/MainPage';
import Catalog from '../pages/Catalog';
import NormalLoginForm from '../pages/LoginPage/LoginPage';
import RegistrationForm from "../pages/RegPage/RegPage"

const App = (props) => {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" render={() => <MainPage />} />
          <Route path="/catalog" render={() => <Catalog />} />
          <Route path="/login" render={() => <NormalLoginForm />} />
          <Route path="/registration" render={() => <RegistrationForm />} />
        </Switch>
    </div>
  );
};

export default App;
