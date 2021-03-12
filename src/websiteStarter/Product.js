import React, { useState} from "react";
     //useEffect 
import GridItem from "../components/Grid/GridItem.js";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/categoryProductPage/categoryproductStyle.js"
//import db from '../db'
//import UserContext from '../UserContext'
import GridContainer from "components/Grid/GridContainer.js";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
 const useStyles = makeStyles(styles);

export default function Product({product,id,productName,productDescription, productImage,price,color,size,modelImage,categoryId}){

   
    const classes = useStyles();

    //const { user } = useContext(UserContext)

    
    //const [category, setCategory] = useState({
        //categoryId: ""
    //})
    //listen to the current selected categoryId in product
    //useEffect( ()=> db.Category.listenOne(setCategory,categoryId),[categoryId])

    const [showimage, setshowimage] = useState({img: productImage})

    
    return(
        <>
      
     <div>
         <div style={{ width: '100%' }}>
         <GridContainer justify="center">
         <GridItem>
                <div className={classes.imageWrapper}>
                <Button component={Link} to={`/details/${id}`}>
                <img src={showimage.img} className={classes.prdimage}  width="350px" height="300px" alt="product"
                    onMouseEnter={() => {
                    setshowimage({
                     img: modelImage
                    })
                    }}
                    onMouseOut={() => {
                    setshowimage({
                     img: productImage
                     })
                     }} />
                    
                </Button> 
                </div>
                <p className={classes.info} style={{fontFamily:"Roboto Slab"}}>{productName}</p>
                <p className={classes.info} style={{fontFamily:"Roboto Slab"}}>QAR {price}</p>
            </GridItem>
         </GridContainer>
         </div>
     </div>

        </>
)
}

