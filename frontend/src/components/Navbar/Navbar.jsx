import React from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "antd";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Settings from "../icons/Settings";
import Search from "../icons/Search";
import "./Navbar.scss";

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="navbar__mobile">
        <HamburgerMenu />

        <div className="search-container">
          <input type="text" placeholder="Поиск..." />
          <div className="search"></div>
        </div>

        <Link className="navbar__item" to="/settings">
          <Settings />
        </Link>
      </div>

      <div className="navbar__desktop">
        <Link className="navbar__desktop-item" to="/">
          Главная
        </Link>
        <Link className="navbar__desktop-item" to="/setings">
          Настройки
        </Link>
        <form className="navbar__desktop-form">
          <Input placeholder="Поиск..." />
          <Button><Search /></Button>
        </form>

        <Link className="navbar__desktop-item login" to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
