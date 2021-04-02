import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import "./styles/styles.scss";

import App from "./App";
import { store, persistor, history } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
