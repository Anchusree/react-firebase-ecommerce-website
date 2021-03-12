import emailjs from "emailjs-com";
import React from 'react';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Parallax from "../components/Parallax/Parallax.js";
import styles from "../assets/jss/material-kit-react/views/landingPage.js";
import contactstyle from './Css/contact.module.css'
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(styles);
export default function ContactUs() {
    const classes = useStyles();
  //function to send to the admin's email
    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('service_9593mfc', 'template_r2n4s1k', e.target, 'user_o3VSz2CTLhwtp0AI1VTF1')
          .then((result) => {
             alert("Your message has been send")
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset()
      }

    return(
        <div>
      <Parallax filter image="https://simility.com/wp-content/themes/simility/assets/img/contact-us-banner.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Contact Us</h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
      <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <br/><br/> <br/>
        <span className={contactstyle.contact1formtitle}>
					Get In Touch With Us!
				</span>
      
        <form onSubmit={sendEmail} >
                        <div className={contactstyle.wrapinput1}>
                            <input type="text" required className={contactstyle.input1} placeholder="Name" name="name"/>
                        </div>
                        <div className={contactstyle.wrapinput1}>
                            <input type="email" required className={contactstyle.input1} placeholder="Email Address" name="email"/>
                        </div>
                        <div className={contactstyle.wrapinput1}>
                            <input type="text" required className={contactstyle.input1} placeholder="Subject" name="subject"/>
                        </div>
                        <div className={contactstyle.wrapinput1}>
                            <textarea className={contactstyle.input1} required id="" cols="30" rows="8" placeholder="Your message here..." name="message"></textarea>
                        </div>
                        <div className={contactstyle.btn}> 
                            <button type="submit" className={contactstyle.contact1formbtn}>Send &nbsp;<SendIcon/></button>
                        </div>
                    </form>
            </GridItem>
            </GridContainer>
        </div>
      </div>
    )
}