import React from "react";
import { Switch } from 'antd';

const ThemeSwitch = (props) => {
  const onChange = (checked) => {
    document.body.classList.toggle("dark", checked);
  }

  return (
    <Switch onChange={ onChange }></Switch>
  );
};

export default ThemeSwitch;