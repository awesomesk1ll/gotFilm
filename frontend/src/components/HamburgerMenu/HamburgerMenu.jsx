import React from "react";
import { Link } from "react-router-dom";
import "./HamburgerMenu.scss";

const HamburgerMenu = (props) => {

  return (
        <div className="hamburger-menu">
          <input id="menu__toggle" type="checkbox" />
          <label className="hamburger-menu__btn" htmlFor="menu__toggle">
            <span></span>
          </label>

          <ul className="hamburger-menu__box">
          <li>
              <Link className="hamburger-menu__item" to="/login">
                Войти
              </Link>
            </li>
            <li>
              <Link className="hamburger-menu__item" to="/">
                Главная
              </Link>
            </li>
            <li>
              <Link className="hamburger-menu__item" to="/">
                История предложений
              </Link>
            </li>
            <li>
              <Link className="hamburger-menu__item" to="/">
                Просмотренные фильмы
              </Link>
            </li>
            <li>
              <Link className="hamburger-menu__item" to="/settings">
                Отклонённые фильмы
              </Link>
            </li>
            <li>
              <Link className="hamburger-menu__item" to="/settings">
                Избранные
              </Link>
            </li>
          </ul>
        </div>
  );
};

export default HamburgerMenu;
