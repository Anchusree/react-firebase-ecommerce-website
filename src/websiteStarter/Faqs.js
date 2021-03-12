import React from "react";

//import UserContext from '../UserContext'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Grid } from "@material-ui/core";





export default function Faqs({ id ,faq, userId, question, status  , answer}) {
//size to display 
  

    //new values for the edit 
   // const { user } = useContext(UserContext)
 
    //const [questionBy, setquestionBy] = useState({ name: "" })
    //useEffect(() => user && db.Users.listenOne(setquestionBy, userId), [userId, user])
 

    
    return  (
        <>

        {
          status === "answerd"
            ?
            
            <div >
            <Grid container>
              <Grid item xs={10}>
              <ul style={{listStyleType:"square", fontSize:"25px"}}>
            <li >
               <h3 style={{fontFamily:"'Dancing Script', cursive", color:"black"}}>{question}</h3>
               <h4 style={{fontFamily:"'Dancing Script', cursive"}}><ArrowForwardIcon/> {answer}</h4>
               <hr/>
            </li>
            </ul>
              </Grid>
            </Grid>
           
            </div>
            :
          null
          }
          <br/>
          <br/>
          <br/>
          <br/>
        </>
             

    )
        
       
     
}