import React from 'react';

import "./Header.scss";

const Header = (props) => {
  return(
    <h1>
      {props.title}
    </h1>
  );
};

export default Header;
