import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch } from 'antd';
import { changeTheme } from '../../store/actions/themeAction';

const ThemeSwitch = ({ isLightTheme }) => {
  const dispatch = useDispatch();

  const onChange = (isLightTheme, checked) => {
    document.body.classList.toggle('dark', isLightTheme, checked);
    dispatch(changeTheme(isLightTheme));
  }

  return (
      <Switch 
        onChange={onChange} 
        checked={!isLightTheme && true}
      />
    );
};

const mapStateToProps = ({ themeReducer }) => ({
    isLightTheme: themeReducer.isLightTheme,
});

export default connect(mapStateToProps, { changeTheme })(ThemeSwitch);
