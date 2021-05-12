import React from 'react';
import { Link } from 'react-router-dom';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';

import Search from '../../components/icons/Search';

import './Home.scss';

const Home = (props) => {
  const anim = (e) => {
    switch (e.index) {
      case 0:
        return {
          rotate: 90,
          opacity: 0,
          y: -100,
        };
      case 10:
      case 1:
        return {
          y: -60,
          x: -15,
          opacity: 0,
        };
      case 9:
      case 2:
        return {
          y: -100,
          x: 60,
          opacity: 0,
        };
      case 3:
        return {
          y: 100,
          opacity: 0,
        };
      case 8:
      case 4:
        return {
          x: 60,
          opacity: 0,
        };
      case 5:
        return {
          enter: [
            {
              scale: 2,
              opacity: 0,
              type: 'set',
            },
            { scale: 1.2, opacity: 1, duration: 800 },
            { scale: 0.9, duration: 600 },
            { scale: 1.05, duration: 400 },
            { scale: 1, duration: 300 },
          ],
          leave: {
            opacity: 0, scale: 0,
          },
        };
      case 6:
        return {
          scale: 0.8,
          x: 60,
          y: -20,
          opacity: 0,
        };
      case 7:
        return {
          scale: 0.8,
          x: 60,
          y: 20,
          opacity: 0,
        };
      default:
        return {
          opacity: 0,
        };
    }
  }

  return (
    <div className="main-page">
      <h1 className="main-page__title theme"><Texty enter={anim}>gotfilm</Texty></h1>
      <Link className="main-page__icon" to="/film">
        <Search className="search-icon_home theme" />
      </Link>
    </div>
  );
};

export default Home;