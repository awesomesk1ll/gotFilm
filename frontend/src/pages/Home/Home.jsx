import React, { useCallback } from 'react';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';

import Search from '../../components/icons/Search';
import './home.scss';

const Home = (props) => {
  const handleNavigate = useCallback(link => {
    props.push(link);
  }, []);

  return (
    <div className="main-page">
      <h1 className="main-page__title">gotfilm</h1>
      <a className="main-page__icon" onClick={() => handleNavigate('/film')}>
        <Search />
      </a>
    </div>
  );
};

Home.propTypes = {
  push: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default connect(null, mapDispatchToProps)(Home);