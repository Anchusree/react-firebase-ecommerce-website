import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect} from "react";
//import UserContext from '../UserContext'
import styles from "../assets/jss/material-kit-react/views/loginPage.js";
import image from '../assets/img/signbg.jpg'
import defaultavatar from '../assets/img/defaultavatar.JPG'
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
import db from '../db'
import { CountryDropdown } from "react-country-region-selector";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Register(){

    const classes = useStyles()
   //const { user } = useContext(UserContext)
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    useEffect(() => {
        const clear = setTimeout(() => setCardAnimation(""), 700)
        return () => clearTimeout(clear) // function that cancels the timeout
    }, [])

    const history = useHistory()

    const [email,setEmail] = useState("");
    const [password1,setPassword1] = useState("");
    const [password2,setPassword2] = useState("");
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [showPassword1,setShowPassword1] = useState(false);
    const [showPassword2,setShowPassword2] = useState(false);

    const handleTogglePassword1 = () => setShowPassword1(showPassword1 => !showPassword1);
    const handleTogglePassword2 = () => setShowPassword2(showPassword2 => !showPassword2);

    const register = async() =>{
        if (password1 === password2) {
            try {
                await fb.auth().createUserWithEmailAndPassword(email, password1)
                console.log(fb.auth().currentUser.uid)
                await db.Users.update({ id: fb.auth().currentUser.uid, name,address,email, role: "user", avatar:defaultavatar })
                history.push("/")
                
            } catch (error) {
                alert(error.message)
            }
        } else {
            alert('passwords don\'t match')
        }
    }
    const signin=()=>{
        history.push("/login")
    }

    const valid = ()=>
        email !== "" &&
        password1 !== "" &&
        password1.length >= 6 &&
        password2 !== "" &&
        password2.length >= 6 &&
        name !== "" &&
        address !== "" 
    
    

    return(
        <div>
        <div className = {classes.pageHeader}
        style={{
            backgroundImage:"url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition:"top center"
        }}
        >
            
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                    <Card className={classes[cardAnimaton]}>
                        <CardHeader color="primary" className={classes.cardHeader}>
                            <h4>Register</h4>
                        </CardHeader>
                        <CardBody>

                        <TextField
                          label="UserName"
                          id="name"
                          required
                          fullWidth= {true}
                          autoComplete="off"
                          inputProps={{
                          onChange: event => setName(event.target.value),
                          value: name,
                          type: 'text',
                          autoComplete: "off"
                          }}
                        /> 
                        <br/>
                        <br/>
                         <TextField
                          label="Email"
                          id="email"
                          required
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
                          id="password1"
                          required
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
                          helperText="Password must have atleast 6 characters."
                        /> 
                         <br/>
                         <br/>
                        <TextField
                          label="Confirm Password"
                          id="password2"
                          required
                          fullWidth= {true}
                          autoComplete="off"
                          InputProps={{
                          onChange: event => setPassword2(event.target.value),
                          value: password2,
                          type: showPassword2 ? 'text' : 'password',
                          autoComplete: "off",
                          endAdornment: (
                          <InputAdornment position="end">
                          <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleTogglePassword2}
                          >
                          {showPassword2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                          </InputAdornment>
                          )
                          }}
                          helperText="Password must match!"
                        /> 
                         <br/>
                         <br/>
                        <CountryDropdown
                        id="country"
                        value={address}
                        onChange={(val) => setAddress(val)} 
                        />
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            <Button disabled={!valid()} simple color="primary" size="lg" onClick={register}>
                                 Register
                            </Button>
                            <Button simple color="primary" size="lg" onClick={signin}>
                                 Already have an account? | Sign In
                            </Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    </div>
</div>

    )
}