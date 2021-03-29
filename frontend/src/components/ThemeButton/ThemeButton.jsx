import React from "react";
import { Switch } from 'antd';

const ThemeButton = (props) => {
  const onChange = (checked) => {
    document.body.classList.toggle("dark");
  }

  return (
    <Switch onChange={ onChange }></Switch>
  );
};


export default ThemeButton;
