import React, { useState, useEffect } from "react";
import GridItem from "../components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
//import styles from "../assets/jss/material-kit-react/views/loginPage.js";
import db from 'db';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import bttnstyle from './Css/myButton.module.css'
import { useHistory } from "react-router-dom";

//const useStyles = makeStyles(styles);
const usenewStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
    maxHeight: 600,
  },
  image: {
    width: 150,
    height: 150,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '150',
    maxHeight: '150',
  },
}));

export default function WishlistProducts({ userId, item, id, customerid, productId, dateAdded }) {

  //const classes = useStyles();
  const newclasses = usenewStyles()
  const history = useHistory()

  //to remove wishlist
  const remove = (userId, whishlistId) => {
    db.Users.Wishlist.removeUserWishlist(userId, whishlistId)
  }
  //to get details of product
  const [prdct, setPrdct] = useState({
    productName: "", productDescription: "", productImage: "", price: 0, color: "", size: "", modelImage: "", categoryId: ""
  })
  const { productName, productDescription, productImage, price, categoryId } = prdct
  useEffect(() => db.Products.listenOne(setPrdct, productId), [productId])  //listen to the current selected productId

  const [disablebtn,setDisableBtn] = useState(false)

  const addCart = () =>{
    setDisableBtn(true)
    db.Users.Carts.createUserCartItem(userId,{productId:productId,quantity:1,totalPrice:0,
      orderDate:new Date(),status:"pending"})
      remove(userId, id)
    history.push("/cartitem/:id/")
    
  }
 

  return (
    <GridItem xs={6} sm={6} md={6}>
      <Paper className={newclasses.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={newclasses.image}>
              <img className={newclasses.img} alt="complex" src={productImage} style={{ height: "150px", width: "150px" }} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" >
              <Grid item xs >
                <Typography gutterBottom variant="subtitle1" style={{fontFamily:"Roboto Slab"}}>
                  {productName}
                </Typography>
                <Typography variant="body2" gutterBottom style={{fontFamily:"Roboto Slab"}}>
                  {productDescription}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{fontFamily:"Roboto Slab"}}>
                  ID: &nbsp;{productId}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{fontFamily:"Roboto Slab"}}>
                  BRAND: &nbsp;{categoryId}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{fontFamily:"Roboto Slab"}}>
                  DATE ADDED: &nbsp;{dateAdded.toDate().toDateString()}
                </Typography>
              </Grid>
              <Grid item>
                <button className={bttnstyle.button2} onClick={addCart} disabled={disablebtn} style={{ cursor: 'pointer', fontFamily:"Roboto Slab" }} >
                <ShoppingCartIcon/>Add to Cart 
                </button>
                <button className={bttnstyle.button3} onClick={() => remove(userId, id)} style={{ cursor: 'pointer' }}>
                  <DeleteIcon/>Remove
                </button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">QAR {price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </GridItem>
  )
}