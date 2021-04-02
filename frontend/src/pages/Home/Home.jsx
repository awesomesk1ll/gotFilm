import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../../components/icons/Search';
import './Home.scss';

const Home = (props) => {
  return (
    <div className="main-page">
      <h1 className="main-page__title">gotfilm</h1>
      <Link className="main-page__icon" to="/film">
        <Search />
      </Link>
    </div>
  );
};

export default Home;