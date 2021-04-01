import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./FilmLists.scss";

const FilmLists = () => {
  return (
    <div>
      <h1 className="filmLists__title">списки фильмов</h1>
      <Navbar />
    </div>
  );
};

export default FilmLists;
