import React from 'react';
import ThemeButton from '../components/ThemeButton';
import MainPage from '../pages/MainPage';
import { Switch, Route } from 'react-router-dom'


const App = (props) => {
  return (
    <div className="App">
      Hello World!
      <ThemeButton />
      <MainPage />
    </div>
  );
};

export default App;
