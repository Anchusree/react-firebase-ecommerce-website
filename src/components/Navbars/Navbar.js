import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
//import RTLNavbarLinks from "./RTLNavbarLinks.js";
import SidebarButton from "components/SideBarButton/SidebarButton.js";
import styles from "assets/jss/material-kit-react/components/headerStyle.js";


const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  function makeBrand() {
    var name;
    props.routes.map(prop => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name;
  }

  return (
  <>
     <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <SidebarButton color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </SidebarButton>
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? null : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
        </>

  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};
