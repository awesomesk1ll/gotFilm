import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch } from 'antd';
import { changeTheme } from '../../store/actions/themeAction';

const ThemeSwitch = ({ isLightTheme }) => {
  // const onChange = (checked) => {
  //   document.body.classList.toggle('dark', checked);
  // }

  const dispatch = useDispatch();

  const onChange = (checked) => {
    isLightTheme 
      ? document.body.classList.add('dark', checked) 
      : document.body.classList.remove('dark')
    dispatch(changeTheme(isLightTheme));
  };

  

  return (
      <Switch 
        onChange={onChange} 
      />
    );
};

const mapStateToProps = ({ themeReducer }) => {
  return {
    isLightTheme: themeReducer.isLightTheme,
  };
};

export default connect(mapStateToProps, { changeTheme })(ThemeSwitch);
