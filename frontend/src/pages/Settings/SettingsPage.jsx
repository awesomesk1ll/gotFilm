import React from 'react';
import Header from "../../components/Header/Header.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import FooterBar from "../../components/FooterBar/FooterBar";
import "./SettingsPage.scss";
const SettingsPage = () => {
  return (
    <section>
      <Header title="Настройки" />
      <div className="div-filter">
        <button className="reg-button">ВХОД / РЕГИСТРАЦИЯ"</button>
        <h2 className="h2-fil">
          Темная верия оформенлия
          <span className="h2-fil-switch">
            <span className="h2-fil-slider-point"></span>
          </span>
        </h2>
        <h2 className="h2-fil-2">Настройки поиска</h2>
        <Filter settingName="Рейтинг"/>
        <button className="delete-button">СБРОСИТЬ НАСТРОЙКИ</button>
      </div>
      <FooterBar />
    </section>
  );
};

export default SettingsPage;
