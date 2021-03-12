import React, { useState, useEffect, useContext } from "react";
import UserContext from '../UserContext'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import db from "db";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Paper } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import image from "assets/img/simplebcg.jpg"


const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(800 + theme.spacing(3) * 3)]: {
        width: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

export default function Reciept() {
  const classes = useStyles();
  const { user } = useContext(UserContext)
  const history = useHistory()
  const { id } = useParams();


  const steps = ['Shipping address', 'Payment details', 'Review your order'];

  const [activeStep, setActiveStep] = React.useState(2);

//listen to display cartitem details
const [carts,setItems] = useState([]);
useEffect( ()=> db.Users.Carts.listenToOneUserAllCartItems(setItems,user.id ),[user.id])

//to total the cartitem products
const newtotal = carts.reduce((total,item)=> total + item.totalPrice,0).toFixed(2)

//to get the shipping details of the user
const [shipment, setShipment] = useState([])
useEffect(() => db.Shipping.listenByUserId(setShipment, user.id), [user.id])

//to get the payment details of the user
const [payments, setPayment] = useState([])
useEffect(() => db.Payment.listenByUserId(setPayment, user.id), [user.id])



  
const handleNext = async() => {
  setActiveStep(activeStep + 1);
  //update cart and change status to paid
  carts.map(crt=>
    db.Users.Carts.updateCartItem(user.id,{id:crt.id,productId:crt.productId,quantity:crt.quantity,totalPrice:0,image:crt.image,
      orderDate: new Date(),status:"paid"}))
};

const handleBack = async() => {
  setActiveStep(activeStep - 1);
 
    // delete remove payment id
        payments.map(
            async shp => {
                await db.Payment.remove(shp.id)
            }
        )
     // delete remove shipping id
        shipment.map(
             async shp => {
                 await db.Shipping.remove(shp.id)
             }
         )
      history.push("/cartitem/:id/")
     
}

  return (

    <div
    className = {classes.pageHeader}
    style={{
        backgroundImage:"url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition:"top center",
    }}>
    <main className={classes.layout}>
   <Paper className={classes.paper}>
     <Typography component="h1" variant="h4" align="center">
       Checkout
     </Typography>
     <hr style={{borderColor:" #385cd3",borderWidth: "thin"}}/>
     <Stepper activeStep={activeStep} className={classes.stepper}>
       {steps.map((label) => (
         <Step key={label}>
           <StepLabel>{label}</StepLabel>
         </Step>
       ))}
     </Stepper>

     <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {carts.map((item) => (
          item.totalPrice>0
          ?
          <ListItem className={classes.listItem} key={item.id}>
            <ListItemText primary="Cart Id" secondary={item.id} />
            <ListItemText primary="Product Id" secondary={item.productId} />
            <img width="100px" height="100px" alt="" src={item.image}/>
            <ListItemText primary="Quantity" secondary={item.quantity} />
            <ListItemText primary="Total Price" secondary={item.totalPrice} />
          </ListItem>
          :
          null
        ))}
        <Typography variant="h6" gutterBottom>
       Total Amount:   QAR&nbsp;{`${newtotal}`}
      </Typography>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Details
          </Typography>
          {
              shipment.map((ship)=>(
                  <React.Fragment key={ship.id}>
                <Typography gutterBottom>{ship.customerName}</Typography>
                <Typography gutterBottom>{ship.shipmentAddress}</Typography>
                <Typography gutterBottom>{ship.country}</Typography>
                </React.Fragment>
              ))
          }
         
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.id}>
              
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Number: *****{payment.cardNumber.substr(-4)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Payment Date :<br/> {payment.paymentDate}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <React.Fragment>
              <React.Fragment>
                   <div className={classes.buttons}>
               <Button onClick={handleBack} className={classes.button}>
                   Cancel
               </Button>
             
               <Button
                 variant="contained"
                 color="primary"
                 onClick={handleNext}
                 className={classes.button}
                 component={Link} to={`/paymentsubmission/${id}`}
               >
                 Place Order
               </Button>
            </div>
              </React.Fragment>
     
          </React.Fragment>
    </React.Fragment>
   </Paper>
 </main>
</div>
  );
}