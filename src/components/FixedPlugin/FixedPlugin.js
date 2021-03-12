/*eslint-disable*/
import React, { Component } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";

import imagine1 from 'assets/img/signbg.jpg'
import imagine2 from 'assets/img/signbg.jpg'
import imagine3 from 'assets/img/signbg.jpg'
import imagine4 from 'assets/img/signbg.jpg'

import Button from "components/SideBarButton/SidebarButton.js";

export default function FixedPlugin(props) {
  const [classes, setClasses] = React.useState("dropdown show");
  const [bg_checked, setBg_checked] = React.useState(true);
  const [bgImage, setBgImage] = React.useState(props.bgImage);
  const handleClick = () => {
    props.handleFixedClick();
  };
  return (
    <div
      className={classnames("fixed-plugin", {
        "rtl-fixed-plugin": props.rtlActive
      })}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <div onClick={handleClick}>
          {/* <i className="fa fa-cog fa-2x" /> */}
        </div>
     
      </div>
    </div>
  );
}

FixedPlugin.propTypes = {
  //bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  rtlActive: PropTypes.bool,
  fixedClasses: PropTypes.string,
  //bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  //handleColorClick: PropTypes.func
  //handleImageClick: PropTypes.func
};
