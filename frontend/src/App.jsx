import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale/ru_RU';

import Router from './containers/Router';
import Error from './pages/Error';
import { getFilms } from './store/actions/complexFilmActions';

const App = ({ getFilms, settings, filmsCount, error }) => {
  useEffect(() => {
    if (!filmsCount) {
      getFilms();
    }
  }, [getFilms, filmsCount]);

  useEffect(() => {
    document.body.classList.toggle("dark", settings.dark);
  }, [settings.dark]);
  
  useEffect(() => {
    document.body.style.cssText += 
        `--gf-color-main: hsl(${settings.color.hue},60%,50%);`
        + `--gf-color-dark: hsl(${settings.color.hue},55%,42%);`
        + `--gf-color-light: hsl(${settings.color.hue},65%,58%);`;
  }, [settings.color]);

  return (
    <ConfigProvider locale={ru_RU}>
      <div className="App">
        <div className="container theme">
        { error ? <Error text={error}/> : <Router /> }
        </div>
      </div>
    </ConfigProvider>
  );
};

App.propTypes = {
  error: PropTypes.string,
  getFilms: PropTypes.func,
  settings: PropTypes.object,
  filmsCount: PropTypes.number
};

const mapStateToProps = ({ filmReducer }) => ({
  settings: filmReducer.settings,
  filmsCount: filmReducer.films.length,
  error: filmReducer.error
});

const mapDispatchToProps = dispatch => bindActionCreators({ getFilms }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
