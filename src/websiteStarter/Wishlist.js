import React, { useState, useEffect, useContext } from "react";
import UserContext from '../UserContext'
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/categoryProductPage/categoryproductStyle.js"
import { useHistory} from "react-router-dom";
//import {  useParams } from "react-router-dom";
import db from 'db';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import WishlistProducts from "./WishlistProducts";
import bttnstyle from './Css/myButton.module.css'
import Linkpath from '@material-ui/core/Link';
import { Breadcrumbs } from "@material-ui/core";

const useStyles =  makeStyles(styles);


export default function Wishlist(){
    
    const classes = useStyles();
    const { user } = useContext(UserContext)

   //const { id } = useParams();
    //console.log(id)
    //const [product, setProduct] = useState({
         //productName:""
    //})
    const history = useHistory()
    //const { productName,productDescription, productImage,price,color,size,modelImage,categoryId} = product

    //listen to the selected product id
   // useEffect( ()=> db.Products.listenOne(setProduct,id ),[id])

    //listen to display productid details
    const [saved,setSaved] = useState([]);
    useEffect( ()=> db.Users.Wishlist.listenToOneUserAllWishlist(setSaved,user.id ),[user.id])
    //console.log(saved)


    const removeAll = async () => {
      // delete one user all saved products
      const users = await db.Users.findByRole('user')
      await Promise.all(
          users.map(
              async user => {
                  const items = await db.Users.Wishlist.findOneUserAllItems(user.id)
                  await Promise.all(
                      items.map(item => db.Users.Wishlist.removeUserWishlist(user.id, item.id) )
                  )
              }
          )
      )
  }
    // eliminate the false id & return unique product ids
    function getUnique(arr, comp) {
    const unique =  arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i)
           .filter((e) => arr[e]).map(e => arr[e]);
    return unique;
     }
    const uniqueProducts = getUnique(saved,'productId')

    const handleClickProducts = ()=>{
        history.push("/products")
    }
   


    return(
     <>

      <div style={{backgroundColor:"#eeeeee2e"}}>
         <div className={classes.detailgrid}>
            <div style={{flexDirection:"row"}}>
                <GridContainer justify-content="center">
                    <GridItem>
                    <div className={classes.categoryHeader} style={{backgroundColor:"#eeeeee2e"}}>
                        <FavoriteBorderOutlinedIcon style={{fontSize:"3.5rem"}}/>
                        <h2 style={{fontFamily:"amita", opacity:"0.8"}}>My Wishlist ({`${uniqueProducts.length}`})</h2>
                        <hr style={{ marginLeft: "auto", marginRight: "auto", width: "90%", font:"20px", borderWidth: "1px", borderColor: "black" }} />
                    </div>
                    <Breadcrumbs aria-label="breadcrumb">
        
                    <Linkpath color="inherit" onClick={handleClickProducts} style={{cursor:"pointer"}}>
                    Products
                    </Linkpath>
                    <Linkpath
                    color="textPrimary"
                     aria-current="page"
                    >
                     Wishlist
                    </Linkpath>
                    </Breadcrumbs>
                    <br/>
                    <br/>
                    <br/>
                    </GridItem>
                    <br/>
                  {
                   uniqueProducts.length >= 1
                    ?
                    uniqueProducts.map(item =>
                        <WishlistProducts key={item.id} userId={user.id} item={item} {...item} />     
                    )
                     :
                    <h3 style={{textAlign:"center", fontFamily:"'Amita', cursive"}}>Sorry, you don't have any saved items</h3>
                  }   
              </GridContainer>
            </div>
         </div>
         <button className={bttnstyle.button1} onClick={removeAll} style={{textAlign:"center", cursor:"pointer"}}>Clear All</button>
     </div>

     </>
    )
}