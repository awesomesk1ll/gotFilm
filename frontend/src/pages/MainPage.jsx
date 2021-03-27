import React from "react";
import { NavLink } from "react-router-dom";

const MainPage = (props) => {

  return (
    <section className="mainPage">
      <p className="mainPage__title">gotfilm</p>
      <NavLink className="mainPage__link" to="/catalog">
      </NavLink>
    </section>
  );
};

export default MainPage;
