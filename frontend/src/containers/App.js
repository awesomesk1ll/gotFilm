import React from 'react';
import ThemeButton from '../components/ThemeButton';
import Home from '../pages/Home';

const App = (props) => {
  return (
    <div className="App">
      <ThemeButton />
      <Home />
    </div>
  );
};

export default App;
