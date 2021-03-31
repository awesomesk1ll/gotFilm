import React from 'react';
import { Route, Switch } from 'react-router';
import Home from "../pages/Home/Home"
import Catalog from '../pages/Catalog';
import LoginForm from '../pages/LoginPage/LoginPage';
import RegistrationForm from "../pages/RegPage/RegPage";
import SettingsPage from '../pages/Settings/SettingsPage.jsx';

const App = (props) => {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/catalog" render={() => <Catalog />} />
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/registration" render={() => <RegistrationForm />} />
          <Route path="/settings" render={() => <SettingsPage />} />
        </Switch>
    </div>
  );
};

export default App;
