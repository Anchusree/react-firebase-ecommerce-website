/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import Card from "components/Card/Card";
import styles from "assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();
 

  return (

    <footer className={classes.footer}>
      <div className={classes.container}>
        
       
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} Classique Bags{" "}
            - Carry On World Wide.
        </div>
      </div>
      </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
