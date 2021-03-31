import React from "react";
import "./Header.scss"
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '        '
    };
  }
  render(){
    const title = this.props.title
    return(
      <h1>
        {title}
      </h1>
    );
  }
}
export default Header;
