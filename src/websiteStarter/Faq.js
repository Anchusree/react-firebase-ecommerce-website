import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import db from '../db'
import styles from "../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import UserContext from '../UserContext';
import Faqs from "./Faqs.js";
import Button from "components/CustomButtons/Button.js";
import { useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import CustomInput from "../components/CustomInput/CustomInput.js";
import { Slide } from "@material-ui/core";
import faqstyle from './Css/faq.module.css'



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

const useStyles = makeStyles(styles);

export default function Faq() {
    const { user } = useContext(UserContext)

    const classes = useStyles();

    const [classicModal, setClassicModal] = useState(false);

    const [faqs, setfaqs] = useState([])
    useEffect(() => db.Faq.listenAll(setfaqs), [])

    const attemptQuestion=()=>{
        if(user){
            history.push("/faq")
        }
        else{
            history.push("/login")
        }
    }

    const createQuestion =() =>{
        setClassicModal(true)
    }

    const history = useHistory()

    const [question, setquestion] = useState("")

    const addQuestion = () => {
        db.Faq.create({userId : user.id , question , status : "pending", answer : "" })
        setClassicModal(false)
    }
    const valid = () =>
    question !== "" 

    return (
        <div style={{backgroundColor:"white"}}>
            <img src="https://luminvision.com/wp-content/uploads/2018/12/FAQ-banner.jpg" width="100%" alt=""/>  

                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8}>
                        <h2 style={{ color: " black",textAlign:"center" }} className={classes.title}>Frequently Asked Questions</h2>
                        <br/>
                        {
                    user
                    ?
                    <>
                    <button onClick={createQuestion} className={faqstyle.btn}>Ask your Question</button>
                     </>
                    :
                    <>
                    <button  onClick={attemptQuestion} className={faqstyle.btn}>Ask your Question</button>
                    </>
                }
                    </GridItem>
                   
               
                </GridContainer>
              
                <GridContainer justify="flex-start">
                    <>
                    {
                            faqs.map(faq =>
                                <Faqs key={faq.id}  {...faq} />
                            )
                    }
                    </>
                </GridContainer>


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
                    <h3 className={classes.modalTitle} style={{fontFamily:"'Dancing Script', cursive"}}>Ask your Question</h3>
                </DialogTitle>
                <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                >
                <CustomInput
                        labelText="Your Question"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => setquestion(event.target.value),
                            value: question,
                            type: "text"
                        }}
                    /> 
                </DialogContent>
               <DialogActions className={classes.modalFooter}>
                    <Button
                        onClick={() => setClassicModal(false)}
                        color="primary"
                        simple
                    >
                        Cancel
                    </Button>
                    <Button color="success" disabled={!valid()} simple  onClick={addQuestion} >
                        Send
                    </Button>
                </DialogActions>
            </Dialog> 
     
            <br/>
          <br/>
          <br/>
          <br/>

        </div>

        
    )

}







