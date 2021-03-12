import React, { useContext } from "react";
import UserContext from '../UserContext'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Paper } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import image from "assets/img/simplebcg.jpg"


const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(700 + theme.spacing(2) * 2)]: {
        width: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
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

export default function PaymentSubmission() {
  const classes = useStyles();
  const { user } = useContext(UserContext)
  const history = useHistory()

  

//to get back back to homepage
const handleNext = async() => {
  history.push("/")
};

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
     <br/>
     <br/>
      <React.Fragment>
           
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your payment is succesfull. Thank you {user.name} for purchasing with us. 
                </Typography>
              </React.Fragment>
        
               <Button
                 variant="contained"
                 color="primary"
                 onClick={handleNext}
                 className={classes.button}
               >
                 Go Back to Homepage
               </Button>
          </React.Fragment>
   </Paper>
 </main>
</div>


















    
  );
}