import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import "./FilmLists.scss";

const FilmLists = () => {
  return (
    <div>
      <h1 className="filmLists__title">списки фильмов</h1>
      <div className="filmLists__item">
        <Link className="filmLists__link" to="/history">
          История предложений
        </Link>
        24
      </div>
      <div className="filmLists__item">
        <Link className="filmLists__link" to="/watched">
          Просмотренные фильмы
        </Link>
        12
      </div>
      <div className="filmLists__item">
        <Link className="filmLists__link" to="/rejectув">
          Отклонённые фильмы
        </Link>
        7
      </div>
      <div className="filmLists__item">
        <Link className="filmLists__link" to="/favorites">
          Избранные
        </Link>
        3
      </div>
      <Navbar />
    </div>
  );
};

export default FilmLists;
