import React, { useState, useContext, useEffect } from "react";
import UserContext from '../UserContext'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { CountryDropdown } from "react-country-region-selector";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Datetime from "react-datetime";
import db from "db";
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
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

export default function ShippingForm() {

  const { user } = useContext(UserContext)
  const classes = useStyles();
  const history = useHistory()

  const steps = ['Shipping address', 'Payment details', 'Review your order'];

  const [activeStep, setActiveStep] = React.useState(0);
  //listen to user shipping
  const [shipment, setShipment] = useState([])
  useEffect(() => db.Shipping.listenByUserId(setShipment, user.id), [user.id])

  //fileds and state
  const [fullName,setFullName] = useState("");
  const [address,setAddress] = useState("");
  const [country,setCountry] = useState("");
  const [phone,setPhone] = useState(0);
  const [shipmentDate,setShipmentDate] = useState(new Date());
  
  // when customer clicks next, shipoing details will be added to databse
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    db.Shipping.create({userId:user.id,customerName:fullName,shipmentAddress:address,country:country,phone:phone,shipmentDate:shipmentDate})

  };
  //when canceled checkout it takes back to cart item page and deletes the shipping address added
  const handleBack = async() => {
    setActiveStep(activeStep - 1);
    shipment.map(
      async shp => {
          await db.Shipping.remove(shp.id)
      }
  )
    history.push("/cartitem/:id/")
    
  }
  const valid=()=>
    fullName !== "" &&
    address !== "" &&
    country !== "" &&
    phone !== "" &&
    phone.length >= 8 
    
  
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
          <Typography component="h1" variant="h4" align="center" style={{fontFamily:"serif"}}>
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
       
          <br/>
      <h4 style={{fontFamily:"'El Messiri', sans-serif"}}>CustomerId: {user.id}</h4>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Full Name"
            fullWidth
            autoComplete="off"
            inputProps={{
              onChange: event => setFullName(event.target.value),
              value: fullName,
              type: 'text'
              }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address"
            fullWidth
            autoComplete="off"
            inputProps={{
              onChange: event => setAddress(event.target.value),
              value: address,
              type: 'text'
              }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <CountryDropdown
            id="country"
            value={country}
            onChange={(val) => setCountry(val)} 
          />
        </Grid>
 
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            autoComplete="off"
            inputProps={{
              onChange: event => setPhone(event.target.value),
              value: phone,
              type: 'number'
              }}
              helperText="Mobile must have 8 characters"
          />
        </Grid>
        <Grid>
        <Grid item xs={12}>
          <h5 style={{fontFamily:"'El Messiri', sans-serif"}}>Shipment Date</h5>
        <FormControl>
            <Datetime
                value={shipmentDate}
                onChange={date => setShipmentDate(date ==="undefined" ?  "" : date.toDate().Date )}
                inputProps={{
                placeholder: "Shipment Date",
                disabled: true
              }}
            />
        </FormControl>
        </Grid>
        
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
                    component={Link} to={`/payment/${user.id}`}
                  >
                    Next
                  </Button>
                </div>
                </Paper>
       </main>



          </div>

       
  );
}