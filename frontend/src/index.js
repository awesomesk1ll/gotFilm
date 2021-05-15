import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import "./styles/styles.scss";

import App from "./App";
import { store, history } from "./store";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./serviceworker.js')
    .then((reg) => console.log('Success: ', reg.scope))
    .catch((err) => console.log('Failure: ', err))
  })
}

ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
