import React, { useState, useEffect, useContext } from "react";
import UserContext from '../UserContext'
import { makeStyles } from "@material-ui/core/styles";
//import styles from "../assets/jss/material-kit-react/views/categoryProductPage/categoryproductStyle.js"
import { Link, useHistory } from "react-router-dom";
import db from 'db';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import bttnstyle from './Css/myButton.module.css'
import CartItem from "./CartItem";
import styles from "../assets/jss/material-kit-react/views/categoryProductPage/categoryproductStyle.js"

import cartstyle from './Css/cart.module.css'
import { Button, Grid, Paper} from "@material-ui/core";
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Linkpath from '@material-ui/core/Link';
import { Breadcrumbs } from "@material-ui/core";


const useStyles =  makeStyles(styles);
const useNewStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: 700,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  }));

export default function Carts(){
    
    const classes = useStyles();
    const newclass =useNewStyles()

    const { user } = useContext(UserContext)
    const history = useHistory()

     //const { id } = useParams();
    // const [product, setProduct] = useState({
    //      productName:""
    // })
    // const { productName} = product

    // //listen to the selected product id
    // useEffect( ()=> db.Products.listenOne(setProduct,id ),[id])

    //listen to display cartitem details of one user
    const [carts,setCarts] = useState([]);
    useEffect( ()=> db.Users.Carts.listenToOneUserAllCartItems(setCarts,user.id ),[user.id])


    const removeAll = async () => {
      // delete one user all cartitems
      const users = await db.Users.findByRole('user')
      await Promise.all(
          users.map(
              async user => {
                  const items = await db.Users.Carts.findOneUserAllCartItems(user.id)
                  const pendCarts = items.filter(element => element.status === "pending");
                  await Promise.all(
                      pendCarts.map(pending => db.Users.Carts.removeUserCartItems(user.id, pending.id) )
                  )
              }
          )
      )
    }
    //to total the cartitem products
    const newtotal = carts.reduce((total,item)=> total + item.totalPrice,0).toFixed(2)

    //to get the unique productIds 
    function getUnique(arr, comp) {
    const unique =  arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i)
           .filter((e) => arr[e]).map(e => arr[e]);
    return unique;
    }
    const uniqueCarts = getUnique(carts,'productId')
    //to get the status as pending cart items
    const pendCarts = uniqueCarts.filter(element => element.status === "pending");

    const handleClickProducts = ()=>{
        history.push("/products")
    }
  

    return(
     <>
     <style>@import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');</style>

    <div style={{backgroundColor:"#e8efff73"}}>
         <GridContainer justify="center">
         <GridItem xs={12} sm={12} md={12}>
         <h2 style={{marginLeft:"28px", fontFamily:"'Amita', cursive", textAlign:"center"}}>Shopping Cart Items</h2>
         <br/>
         <Breadcrumbs aria-label="breadcrumb">
        
        <Linkpath color="inherit" onClick={handleClickProducts} style={{cursor:"pointer"}}>
        Products
        </Linkpath>
        <Linkpath
        color="textPrimary"
         aria-current="page"
        >
         Cart
        </Linkpath>
        </Breadcrumbs>
        <br/><br/>
       
         <p style={{marginLeft:"28px", fontFamily:"'Amita', cursive", fontSize:"21px"}}>You have <span className={cartstyle.bold}>{pendCarts.length}</span> items in the cart.</p>
           
                <div className={classes.imageWrapper}>
                                <div className={newclass.root}>
                                    <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                    
                                         {
                                          pendCarts.length >=1
                                          ?
                                          <Paper className={newclass.paper}>
                                          <Table aria-label="simple table">
                                          <Thead>
                                           <Tr>
                                              <Th >PRODUCT IMAGE</Th>
                                              <Th>PRODUCT NAME</Th>
                                              <Th>GENERAL PRICE</Th>
                                              <Th>QUANTITY(Max 10)</Th>
                                              <Th>TOTAL PRICE</Th>
                                              <Th>ACTIONS</Th>
                                              <Th>DELETE</Th>
                                              <Th>SAVE</Th>
                                              <Th></Th>
                                          </Tr>
                                      </Thead>
                                      <Tbody>
                                          {
                                               pendCarts.map(item =>
                                                  <React.Fragment key={item.id}>                                              
                                                        <CartItem item={item} {...item}/>
                                                  </React.Fragment>
                                                  
                                                  )
                                          }
                                      </Tbody>
                                      </Table>
                                      <Button onClick={removeAll}>Clear All</Button>
                                       </Paper>
                                      :
                                     null
                                        }
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <br/>
             
                <br/>
                <div className={newclass.root} >
                    <Grid container spacing={3}>
                       <Grid item xs={12}>
                        <Paper className={newclass.paper}>
                            <h3 style={{fontFamily: "'Lato', sans-serif"}}>CART SUMMARY</h3>
                            <div className={cartstyle.cartsummary}>
                            <ul className={cartstyle.summarytable}>
                                <li><span>Subtotal:</span> <span>QAR {newtotal}</span></li>
                                <li><span>Delivery:</span> <span>Free</span></li>
                                <li><span>Total:</span> <span>QAR {newtotal}</span></li>
                            </ul>
                            <div className={cartstyle.cartbtn}>
                                <Button style={{color:"white"}} disabled={newtotal <= 0} component={Link} to={`/checkout/${user.id}`}>PROCEED CHECKOUT</Button>
                            </div>
                            </div>
                        </Paper>
                       </Grid>
                     </Grid>
                     <br/>
                     <br/>
                     <br/>
                </div>










               
             

            </GridItem>
         </GridContainer>
     </div>
    
     </>
    )
}