import fb from '../fb'
import "firebase/storage"
import db from '../db'
import React, { useState, useEffect, useContext } from "react";
import UserContext from '../UserContext'
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
import styles from "../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import image from "../assets/img/profilebcg.png";
import AddIcon from "@material-ui/icons/Add";
import { Button, Dialog, Fab, Slide, TablePagination } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Email from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "@material-ui/core";
import { CountryDropdown } from "react-country-region-selector";
import { Close } from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import CustomTabs from 'components/CustomTabs/CustomTabs';

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
 });
 Transition.displayName = "Transition";

export default function Profile() {

  const { user } = useContext(UserContext)

  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  useEffect(() => {
      const clear = setTimeout(() => setCardAnimation(""), 700)
      return () => clearTimeout(clear) // function that cancels the timeout
  }, [])

  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);

  //to upload profile image
  const uploadAvatar = async event => {
    const filenameRef = fb.storage().ref().child(`avatars/${user.id}`)
    const snapshot = await filenameRef.put(event.target.files[0])
    user.avatar = await snapshot.ref.getDownloadURL() // put file url in user object and upload to db
    await db.Users.update(user)
  }

  const [email,setEmail] = useState(user.email);
  const [name,setName] = useState(user.name);
  const [address,setAddress] = useState(user.address);

  //to update the user profile
  const edit=()=>
    setClassicModal(true)
  const save = (id) =>{
    db.Users.updateProfile(user.id ,{ id:id,  name:name  , address:address , role:"user" ,  email:email, avatar:user.avatar}) 
    setClassicModal(false)
  }
  //to get number of wishlist
  const [saved,setSaved] = useState([]);
  useEffect( ()=> db.Users.Wishlist.listenToOneUserAllWishlist(setSaved,user.id ),[user.id])

  //to get number of cart items
  const [items,setItems] = useState([]);
  useEffect( ()=> db.Users.Carts.listenToOneUserAllCartItems(setItems,user.id ),[user.id])

  //to get number of faqs by user
  const [faqs, setFaqs] = useState([])
  useEffect(()=>db.Faq.listenByUserId(setFaqs,user.id),[user.id])
  
  //to get payment by user
  const [payment, setPayment] = useState([])
  useEffect(()=>db.Payment.listenByUserId(setPayment,user.id),[user.id])

  //to get shipment by user
  const [shipping, setShipping] = useState([])
  useEffect(()=>db.Shipping.listenByUserId(setShipping,user.id),[user.id])

  //function to show and hide the payment activity
  const [showResult, setShowResult] = useState(false)
   const veiwPaymentDetails =() =>{
     setShowResult(true)
   }
   //to get unique productIds
   function getUnique(arr, comp) {
    const unique =  arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i)
           .filter((e) => arr[e]).map(e => arr[e]);
    return unique;
    }
    const uniqueProducts = getUnique(saved,'productId')
    const uniqueCarts = getUnique(items,'productId')
    //to get all pending products
    //const pendCarts = uniqueCarts.filter(element => element.status === "pending");
    //to get all paid products
    const paidCarts = uniqueCarts.filter(element => element.status === "paid");

    const [showPaidResult, setShowPaidResult] = useState(false)
    const veiwPaidDetails =() =>{
     setShowPaidResult(true)
   }

   const [showShippingResult, setShowShippingResult] = useState(false)
   const viewShipping =() =>{
    setShowShippingResult(true)
  }


  //for the table pagination
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };
   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(parseInt(event.target.value, 10));
     setPage(0);
   };

  return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }}
    >
      <div className={classes.section}>
        <h2 className={classes.title} style={{color: "black"}}>{user.name}'s Profile</h2>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card className={classes[cardAnimaton]}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <img src={user.avatar} alt="avatar" style={{ height: 150, width: 150 , borderRadius: 70}} />
              </CardHeader>
              <CardBody>
                <p className={classes.description} style={{color:"#484646"}}>
                  Name : {user.name}
                  <br />
                  Address : {user.address}
                  <br />
                 Email :  {user.email}
                  <br />
                 
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                  <h4>Upload Your Profile Image</h4>
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={uploadAvatar}
                  />
                  <Fab color="primary" size="small" component="span" aria-label="add">
                    <AddIcon />
                  </Fab>
                </label>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader style={{background: "linear-gradient(#1530ed, #2cd6af)", color:"white" }}>
              <Typography>Update My Account Profile</Typography>
            </CardHeader>
            <CardBody>
              <Button  onClick={edit}>Edit My Profile</Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader style={{background: "linear-gradient(rgb(221 147 61), #e53535)", color:"white" }}>
              <Typography>Total Saved Items</Typography>
            </CardHeader>
            <CardBody>
            <h3 className={classes.cardTitle} style={{textAlign:"center"}}>{uniqueProducts.length}</h3>
            </CardBody>
          </Card>
        </GridItem>
  
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader style={{background: "linear-gradient(#733ddd, #e53535)", color:"white" }}>
              <Typography>Total Questions Asked</Typography>
            </CardHeader>
            <CardBody>
            <h3 className={classes.cardTitle} style={{textAlign:"center"}}>{faqs.length}</h3>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader style={{background: "linear-gradient(#18d7bc, rgb(67 140 160))" , color:"white"}}>
              <Typography>Purchased Items</Typography>
            </CardHeader>
            <CardBody>
                <h3 className={classes.cardTitle} style={{textAlign:"center"}}>{paidCarts.length}</h3>

                {
                  paidCarts.length > 0
                  ?
                  <Button onClick={veiwPaidDetails}>View my purchsed items</Button>
                  :
                  null
              }
            </CardBody>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
            <Card>
            <CardHeader  style={{background: "linear-gradient(#e66465, #9198e5)", color:"white" }}>
              <Typography>View Shipping address</Typography>
            </CardHeader>
            <CardBody>
              <h3 className={classes.cardTitle} style={{textAlign:"center"}}>{shipping.length}</h3>
              {
                  shipping.length > 0
                  ?
                  <Button onClick={viewShipping}>View Shipping Details</Button>
                  :
                  null
              }
            </CardBody>

          </Card>
        </GridItem>
    
      
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader style={{background: "linear-gradient(#18d7bc, #43a047)" , color:"white"}}>
              <Typography>Total Payments Done</Typography>
            </CardHeader>
            <CardBody>
                <h3 className={classes.cardTitle} style={{textAlign:"center"}}>{payment.length}</h3>

                {
                  payment.length > 0
                  ?
                  <Button onClick={veiwPaymentDetails}>View my payment activity</Button>
                  :
                  null
              }
            </CardBody>

          </Card>
        </GridItem>
        <br/>
        <br/>
        {/* for showing payment table */}
        {
        showResult
        ?
        <>
        <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
        headerColor="danger"
        tabs={[
        {
        tabName: `All Payments (${payment.length})`,
        tabContent: (
       <>
       
       <Table aria-label="simple table" style={{borderCollapse:"collapse", border:"1px solid black", padding:"10px"}}>
            <Thead style={{ border:"1px solid black"}}>
                <Tr>
                    <Th >PAYMENT ID</Th>
                    <Th>CARD NUMBER</Th>
                    <Th>EXPIRY DATE</Th>
                    <Th>AMOUNT</Th>
                    <Th>PAYMENT DATE</Th>
                </Tr>
            </Thead>
            <Tbody>
              {
            
           payment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pay,index)=>

           <Tr key={pay.id}>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{pay.id} </Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>*****{pay.cardNumber.substr(-4)} </Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{pay.expiryDate}</Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{pay.amount}</Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{pay.paymentDate}</Td>
          </Tr>
             
       )}
     </Tbody>
      </Table>
    <TablePagination
      component="div"
      count={items.length}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      color="primary"
    />
     <Button onClick={()=>setShowResult(false)}>Hide</Button>
</>
        ) }
    ]}
    />
   </GridItem>
  </GridContainer> 
        
        </>
        :
        null
        }
{/* //for showing paid carts table */}
      {
        showPaidResult
        ?
        <>
    <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
        headerColor="info"
        tabs={[
        {
        tabName: `All Purchased products (${paidCarts.length})`,
        tabContent: (
       <>
        <Table aria-label="simple table" style={{borderCollapse:"collapse", border:"1px solid black"}}>
            <Thead style={{ border:"1px solid black"}}>
                <Tr>
                    <Th>CART ID</Th>
                    <Th>PRODUCT ID</Th>
                    <Th>PRODUCT IMAGE</Th>
                    <Th>QUANTITY</Th>
                    <Th>ORDER DATE</Th>
                </Tr>
            </Thead>
            <Tbody>
              {
           paidCarts.map((paid,index)=>
           <Tr key={paid.id}>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{paid.id} </Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{paid.productId} </Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}><img src={paid.image} width="150px" height="150px" alt="img"/></Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{paid.quantity}</Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{paid.orderDate}</Td>
          </Tr> 
       )}
     </Tbody>
      </Table>
    <TablePagination
      component="div"
      count={items.length}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      color="primary"
    />
     <Button onClick={()=>setShowPaidResult(false)}>Hide</Button>
  </>
        ) }
    ]}
    />
   </GridItem>
  </GridContainer> 
        </>
        :
        null
        }
{/* //for showing shipping table */}
{
        showShippingResult
        ?
        <>
    <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
        headerColor="warning"
        tabs={[
        {
        tabName: `Shipping Address (${shipping.length})`,
        tabContent: (
       <>
        <Table aria-label="simple table" style={{borderCollapse:"collapse", border:"1px solid black"}}>
            <Thead style={{ border:"1px solid black"}}>
                <Tr>
                    <Th>CUSTOMER NAME</Th>
                    <Th>ADDRESS</Th>
                    <Th>COUNTRY</Th>
                    <Th>PHONE</Th>
                    <Th>SHIPPED DATE</Th>
                </Tr>
            </Thead>
            <Tbody>
              {
           shipping.map((ship,index)=>
           <Tr key={ship.id}>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{ship.customerName} </Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{ship.shipmentAddress}</Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{ship.country}</Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{ship.phone}</Td>
            <Td style={{borderCollapse:"collapse", border:"1px solid black"}}>{ship.shipmentDate}</Td>
          </Tr> 
       )}
     </Tbody>
      </Table>
    <TablePagination
      component="div"
      count={shipping.length}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      color="primary"
    />
     <Button onClick={()=>setShowShippingResult(false)}>Hide</Button>
  </>
        ) }
    ]}
    />
   </GridItem>
  </GridContainer> 
        </>
        :
        null
        }
      </GridContainer>
      </div>




       {/* Diaglog box for edit profile */}
            <Dialog
                classes={{
                    root: classes.center,
                    paper: classes.modal
                }}
                open={classicModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setClassicModal(false)}
                aria-labelledby="classic-modal-slide-title"
                aria-describedby="classic-modal-slide-description"
            >
                <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setClassicModal(false)}
                    >
                        <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>Edit My Profile</h4>
                </DialogTitle>
                <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                >
                <br/>
                <TextField
                          label="UserName"
                          id="name"
                          fullWidth= {true}
                          inputProps={{
                          onChange: event => setName(event.target.value),
                          value: name,
                          type: 'text',
                          autoComplete: "off"
                          }}
                        /> 
                        <br/>
                        <br/>
                        <br/>
                        Address:
                        <br/>
                          <CountryDropdown
                        id="country"
                        value={address}
                        onChange={(val) => setAddress(val)} 
                        />
                        <br/>
                        <br/>
                         <TextField
                          label="Email"
                          id="email"
                          fullWidth= {true}
                          InputProps={{
                            onChange: event => setEmail(event.target.value),
                            value: email,
                            type: 'email',
                            autoComplete: "off",
                            endAdornment: (
                                <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
                                </InputAdornment>
                            ),
                           }}
                        />
                </DialogContent>
               <DialogActions className={classes.modalFooter}>
                    <Button
                        onClick={() => setClassicModal(false)}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button color="secondary"  onClick={()=>save(user.id)} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog> 
    </div>
  );
}


// {
            
//   items.map((cartitem,index)=>
//   <React.Fragment key={cartitem.id}>
//     {
//       cartitem.status === "paid"
//        ?
//   <Tr >
//    <Td style={{ minWidth: 100 }}>{cartitem.id} </Td>
//    <Td>{cartitem.productId} </Td>
//    <Td>{cartitem.totalPrice}</Td>
//    <Td>{cartitem.orderDate}</Td>
//    <Td></Td>
//  </Tr>
//  :
//  null
//     }