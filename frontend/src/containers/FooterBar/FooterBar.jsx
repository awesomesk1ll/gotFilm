import React from "react";
import { BarsSvg, SearchSvg, SlidersSvg, defaultStyle } from "../icons/icons.js";
import Icon from "@ant-design/icons";

class FooterBar extends React.Component {

  render(){
    const BarsIcon = (props) => <Icon component={BarsSvg} {...props} />;
    const SearchIcon = (props) => <Icon component={SearchSvg} {...props} />;
    const SlidersIcon = (props) => <Icon component={SlidersSvg} {...props} />;
    return(
      <div>
        <BarsIcon style={defaultStyle} />
        <SearchIcon style={{ ...defaultStyle, color: "#DA952A" }} />
        <SlidersIcon style={defaultStyle} />
      </div>
    );
  }
}
export default FooterBar;
