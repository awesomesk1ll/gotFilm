import React from "react";
import { BarsSvg, SearchSvg, SlidersSvg, defaultStyle } from "../../assets/icons/icons.js";
import Icon from "@ant-design/icons";
import { NavLink } from "react-router-dom";

class FooterBar extends React.Component {

  render(){
    const BarsIcon = (props) => <Icon component={BarsSvg} {...props} />;
    const SearchIcon = (props) => <Icon component={SearchSvg} {...props} />;
    const SlidersIcon = (props) => <Icon component={SlidersSvg} {...props} />;
    return(
      <div>
        <NavLink className="footer__link" to="/test">
          <BarsIcon style={defaultStyle} />
        </NavLink>
        <NavLink className="footer__link" to="/catalog">
          <SearchIcon style={{ ...defaultStyle, color: "#DA952A" }} />
        </NavLink>
        <NavLink className="footer__link" to="/settings">
          <SlidersIcon style={defaultStyle} />
        </NavLink>
      </div>
    );
  }
}
export default FooterBar;
