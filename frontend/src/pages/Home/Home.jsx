import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../../assets/icons/SearchIcon'

import './style.scss';

const Home = (props) => {

  return (
    <div className="main-page">
      <h1 className="main-page__title">gotfilm</h1>
      <Link className="main-page__icon" to="/catalog">
        <SearchIcon />
      </Link>
    </div>
  );
};

export default Home;
