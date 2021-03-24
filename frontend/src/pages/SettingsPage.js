import React from 'react';
import Header from "../components/Header";
import Filter from "../components/Filter";
import FooterBar from "../components/FooterBar";

const SettingsPage = () => {
  return (
    <section>
      <p>hello settings</p>
      <Header title="Настройки" />
      <Filter />
      <FooterBar />
    </section>
  );
};

export default SettingsPage;
