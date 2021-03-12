import { Button} from '@material-ui/core'
import React, { useState, useEffect, useContext } from "react";

import db from 'db';
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import UserContext from 'UserContext';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CartItem({item,id, productId,quantity,totalPrice,image,userId,OrderDate,status}){

      //const classes = useStyles();
      const { user } = useContext(UserContext)
      //const cartclass = usecartstyle()
      let sum = 0

     const [prdct, setPrdct] = useState({
        productName: "", productImage: "", price: 0, 
      })
      const { productName, productImage, price } = prdct
      //listen to the current selected productId in product
      useEffect(() => db.Products.listenOne(setPrdct, productId), [productId])

    const [newquantity , setnewQ] = useState(1)
      //to increase quantity
    const increaseQ = () => {
     setnewQ(newquantity => newquantity  + 1 )
     setDisableBtn(false)
    }
    //to decrease quantity
    const decreaseQ = () => {
        setnewQ(newquantity => newquantity  - 1 )
        setDisableBtn(false)
    }
    //to remove the cart Item
    const remove = (userId, id) => {
        db.Users.Carts.removeUserCartItems(userId, id)
    }

    const [disablebtn,setDisableBtn] = useState(false)
    //to update the cartitems
    const save = () =>{
        db.Users.Carts.updateCartItem(user.id, { id:id, productId:productId,quantity:newquantity,image:productImage, totalPrice:sum,orderDate:new Date(), status:"pending"})
        setDisableBtn(true)
    }
     
    sum =  price * newquantity

    return(

        <Tr>
            <Td ><img src={productImage} alt="" width="160px" height="160px"/></Td>
            <Td style={{fontSize:"16px",fontFamily:"'Lato', sans-serif"}}>{productName}</Td>
            <Td style={{fontSize:"16px",fontFamily:"'Lato', sans-serif"}}>{price} QAR </Td>
            <Td style={{fontSize:"16px",fontFamily:"'Lato', sans-serif"}}>{`${newquantity}`} </Td>
            <Td style={{fontSize:"16px",fontFamily:"'Lato', sans-serif"}}>{`${sum}`} QAR </Td>
            <Td style={{fontSize:"16px",fontFamily:"'Lato', sans-serif"}}>
            <Button size="small" color="primary" disabled={newquantity >= 10} onClick={increaseQ } style={{ fontSize:"25px"}} > +</Button >
            <Button size="small" color="primary" disabled={newquantity < 2}  onClick={decreaseQ} style={{ fontSize:"25px"}}> - </Button>
            </Td>
          <Td style={{fontSize:"20px",fontFamily:"'Lato', sans-serif"}}>
          <Button size="small" color="primary" onClick={() => remove(user.id, item.id)}> <DeleteIcon/></Button>
          </Td>
          <Td >
          <Button disabled={disablebtn} size="small" color="primary" onClick={save} style={{fontSize:"15px",fontFamily:"'Lato', sans-serif"}}>Save Cart</Button>
          </Td>
          </Tr>
          

    )
}