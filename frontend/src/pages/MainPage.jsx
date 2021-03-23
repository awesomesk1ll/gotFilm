import React from "react";
import { NavLink } from "react-router-dom";
import search from "../assets/icons/search_icon.svg";

const MainPage = (props) => {

  return (
    <section className="mainPage">
      <h1 className="mainPage__title">gotfilm</h1>
      <NavLink className="mainPage__link" to="/catalog">
        <img className="mainPage__icon" src={search} alt="search_icon" />
      </NavLink>
    </section>
  );
};

export default MainPage;
