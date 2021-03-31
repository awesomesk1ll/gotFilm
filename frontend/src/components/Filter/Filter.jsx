import React from "react";
import './Filter.scss';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingName: '',
      leftPos: 1,
      rightPos: 19,
      widthColor: 30,
    };
  }
  handleChange = () => {

  };
  render(){

    return(
      <div className="filter-div">
        <span className="filter-div-name">{this.props.settingName}</span>
        <span className="filter-div-slider">
          <span className="filter-div-bullet" style={{ left: this.props.leftPos+'px' }} ></span>
          <span className="filter-div-bullet-2" style={{ left: this.props.rightPos+'px' }} ></span>
          <span className="filter-div-color" style={{ left: this.props.leftPos+'px', width: this.props.widthColor+'px' }}></span>
        </span>
      </div>
    );
  }
}
