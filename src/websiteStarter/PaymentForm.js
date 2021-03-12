import React, { useState,  useContext, useEffect } from "react";
import UserContext from '../UserContext'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Datetime from "react-datetime";
import db from "db";
import { Link } from "react-router-dom";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Paper } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import image from "assets/img/simplebcg.jpg"



const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
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
export default function PaymentForm() {

    const classes = useStyles();
    const { user } = useContext(UserContext)
    const steps = ['Shipping address', 'Payment details', 'Review your order'];
    const [activeStep, setActiveStep] = React.useState(1);
    const history = useHistory()

    //to get the payment details of the user
    const [payments, setPayment] = useState([])
    useEffect(() => db.Payment.listenByUserId(setPayment, user.id), [user.id])

    
   //to get the shipping details of the user
   const [shipment, setShipment] = useState([])
   useEffect(() => db.Shipping.listenByUserId(setShipment, user.id), [user.id])

   //listen to display cartitem details
  const [carts,setItems] = useState([]);
  useEffect( ()=> db.Users.Carts.listenToOneUserAllCartItems(setItems,user.id ),[user.id])

  //to total price from the cartitem products
  const newtotal = carts.reduce((total,item)=> total + item.totalPrice,0).toFixed(2)

  //fields and state 
    const [cardNumber, setCardNumber] = useState(0);
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [paymentDate, setPaymentDate] = useState(new Date())
    const [cvv, setCvv] = useState(0)

    //validation
    const valid=()=>
    cardName !== "" &&
    cardNumber !== "" &&
    expiryDate >= new Date() &&
    cvv !== "" &&
    cvv.length >= 3  &&
    cardNumber >=10
  
    //adding payment to database
    const handleNext = () => {
      setActiveStep(activeStep + 1);
      db.Payment.create({userId:user.id,cardNumber:cardNumber,cardName:cardName,expiryDate:expiryDate,cvv:cvv,paymentDate:paymentDate, amount:newtotal})
  
    };
  
    const handleBack = async() => {
      setActiveStep(activeStep - 1);
      payments.map(
        async shp => {
            await db.Payment.remove(shp.id)
        }
      )
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
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name" fullWidth autoComplete="cc-name" 
           inputProps={{
            onChange: event => setCardName(event.target.value),
            value: cardName,
            type: 'text'
            }}
      />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="off"
            inputProps={{
                onChange: event => setCardNumber(event.target.value),
                value: cardNumber,
                type: 'number'
                }}
                helperText="Mobile must have 10 characters"
          />
        </Grid>
        <Grid item xs={12} md={6}>
         Expiry Date
          <br/>
        <FormControl>
            <Datetime
                value={expiryDate}
                onChange={date => setExpiryDate(date ? date.toDate() : null)}
                inputProps={{
                placeholder: "Expiry Date",
              }}
            />
        </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="off"
            inputProps={{
                onChange: event => setCvv(event.target.value),
                value: cvv,
                type: 'number'
                }}
          />
        </Grid>
        
        <Grid item xs={12}>
        <h5 style={{fontFamily:"'El Messiri', sans-serif"}}>Date of Payment</h5>
          <br/>
        <FormControl>
            <Datetime
                value={paymentDate}
                onChange={date => setPaymentDate(date ==="undefined" ?  "" : date.toDate().Date )}
                inputProps={{
                placeholder: "Payment Date",
                disabled: true
              }}
            />
        </FormControl>
        </Grid>
      
      </Grid>
      <div className={classes.buttons}>
               <Button onClick={handleBack} className={classes.button}>
                   Cancel
               </Button>
             
               <Button
                 variant="contained"
                 color="primary"
                 onClick={handleNext}
                 disabled={!valid()}
                 className={classes.button}
                 component={Link} to={`/reciept/${user.id}`}
               >
                 Next
               </Button>
        </div>
    </React.Fragment>
   </Paper>
  
 </main>
</div>









    
  );
}