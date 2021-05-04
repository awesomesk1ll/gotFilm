import React from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'antd';
import { changeTheme } from '../../store/actions/themeAction';

const ThemeSwitch = (props) => {
  // const onChange = (checked) => {
  //   document.body.classList.toggle('dark', checked);
  // }

  const dispatch = useDispatch()

  const onChange = (checked) => {
    const newTheme = document.body.classList.toggle('dark', checked)
    dispatch(changeTheme(newTheme));
  };

  return <Switch onChange={onChange}></Switch>;
};

export default ThemeSwitch;
