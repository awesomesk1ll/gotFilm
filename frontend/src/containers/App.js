import React from 'react';
import ThemeButton from '../components/ThemeButton/ThemeButton';
import Home from '../pages/Home/Home';

const App = (props) => {
  return (
    <div className="App">
      <ThemeButton />
      <Home />
    </div>
  );
};

export default App;
