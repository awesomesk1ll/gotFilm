import React from 'react';
import SettingsPage from './SettingsPage';
import ThemeButton from '../components/ThemeButton';
import MainPage from '../pages/MainPage';

const App = (props) => {
  return (
    <div className="App">
      Hello World!
      <SettingsPage />
      <ThemeButton />
      <MainPage />
    </div>
  );
}

export default App;
