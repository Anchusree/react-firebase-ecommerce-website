import React from "react";
//import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
//import ListItem from "@material-ui/core/ListItem";
//import Button from "../components/CustomButtons/Button.js";
import styles from "../assets/jss/material-kit-react/components/headerLinksStyle.js";
//import UserContext from '../UserContext'
const useStyles = makeStyles(styles);

export default function HeaderLinksLeft() {

  //const { user } = useContext(UserContext)

  const classes = useStyles();

  return (
    <List className={classes.list}>
    
    </List>
  );
}
