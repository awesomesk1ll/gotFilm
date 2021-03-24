import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from "./reportWebVitals";
import './styles/styles.scss';


import App from './containers/App';
import { store, persistor, history } from './store';
import Catalog from './pages/Catalog';
import SettingsPage from './pages/SettingsPage';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history} >
        <Switch>
          <Route exact path="/" render={() => <App />} />
          <Route path="/catalog" render={() => <Catalog />} />
          <Route path="/settings" render={() => <SettingsPage />} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
