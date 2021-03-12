import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/loginPage.js";
import image from '../assets/img/signbg.jpg'
import { useHistory } from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import IconButton from '@material-ui/core/IconButton';
import CardFooter from "components/Card/CardFooter.js";
import Button from "../components/CustomButtons/Button.js";
import fb from '../fb'
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Login(){

    const classes = useStyles()
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    useEffect(() => {
        const clear = setTimeout(() => setCardAnimation(""), 700)
        return () => clearTimeout(clear) // function that cancels the timeout
    }, [])

    const history = useHistory()

    const [email,setEmail] = useState("");
    const [password1,setPassword1] = useState("");
    const [showPassword1,setShowPassword1] = useState(false);

    const handleTogglePassword1 = () => setShowPassword1(showPassword1 => !showPassword1);

    const login = async()=>{
        await fb.auth().signInWithEmailAndPassword(email, password1).then((userCredential) => {
            // Signed in
            //var user = userCredential.user;
            history.push("/")
          })
          .catch((error) => {
            alert(error)
          });
    }
    const register=()=>{
        history.push("/register")
    }

    const valid = ()=>
        email !== "" &&
        password1 !== "" 
       
    return(
        <>
         <div className = {classes.pageHeader}
        style={{
            backgroundImage:"url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition:"top center",
            height:"100%"
        }}
        >
            
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                    <Card className={classes[cardAnimaton]}>
                        <CardHeader color="primary" className={classes.cardHeader}>
                            <h4>SIGN IN</h4>
                        </CardHeader>
                        <CardBody>
                         <TextField
                          label="Email"
                          id="loginemail"
                          fullWidth= {true}
                          autoComplete="off"
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
                         <br/>
                         <br/>
                         <TextField
                          label="Password"
                          id="loginpassword1"
                          fullWidth= {true}
                          autoComplete="off"
                          InputProps={{
                            onChange: event => setPassword1(event.target.value),
                          value: password1,
                          type: showPassword1 ? 'text' : 'password',
                          autoComplete: "off",
                          endAdornment: (
                          <InputAdornment position="end">
                          <IconButton
                           onClick={handleTogglePassword1}
                          >
                          {showPassword1 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                          </InputAdornment>
                            ),
                           }}
                        />        
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            <Button disabled={!valid()} simple color="primary" size="lg" onClick={login}>
                                Sign In
                            </Button>
                            <br/>
                            <Button simple color="primary" size="lg" onClick={register}>
                                 Don't have an account yet? | Sign Up
                            </Button>
                        </CardFooter>
                    </Card>
                    <br/> <br/><br/> <br/><br/><br/>
                </GridItem>
               
            </GridContainer>
        </div>
    </div>
    </>
    )

}