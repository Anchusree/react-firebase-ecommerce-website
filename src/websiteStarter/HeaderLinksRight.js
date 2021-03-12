import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "../components/CustomButtons/Button.js";
import styles from "../assets/jss/material-kit-react/components/headerLinksStyle.js";
import UserContext from '../UserContext'
import { AccountCircle, ShoppingBasket } from "@material-ui/icons";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import Avatar from '@material-ui/core/Avatar';
//import db from "db.js";

const useStyles = makeStyles(styles);

export default function HeaderLinksRight() {

  const { user } = useContext(UserContext)
  //console.log(user)

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  

  return (
    <List className={classes.list} >
      
      {
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/"
          >
            Home
          </Button>
        </ListItem>
      }
       <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/products"
          >
            Products
          </Button>
        </ListItem>

        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/categories"
          >
            Category
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/faq"
          >
            FAQ
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/contactus"
          >
            Contact Us
          </Button>
        </ListItem>
      {
        user
        &&
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/wishlist/:id/"
          >
            My Wishlist<FavoriteIcon/>
          </Button>
        </ListItem>
      }
       {
        user
        &&
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/cartitem/:id/"
          >
             My Cart <ShoppingBasket/>
          </Button>
        </ListItem>
      }
       {
        user
        &&
        <ListItem className={classes.listItem}>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}  color="transparent" className={classes.navLink} >
         My Account 
      </Button>
      <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      >
      <MenuItem onClick={handleClose}  color="transparent"component={Link}to="/profile">
     My Profile <AccountCircle className={classes.icons} /></MenuItem>
      <MenuItem onClick={handleClose}color="transparent"component={Link}to="/logout">  
    Logout {user.name} <ExitToAppIcon/>
    </MenuItem>
    </Menu>
  </ListItem>
      }
      {
        !user
        &&
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/register"
          >
            Register
        </Button>
        </ListItem>
      }
      {
        !user
        &&
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            className={classes.navLink}
            component={Link}
            to="/login"
          >
            Login
        </Button>
        </ListItem>
      }
      
    </List >
  );
}
