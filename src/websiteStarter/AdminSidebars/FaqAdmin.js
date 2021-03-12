
import React, { useState, useEffect , useContext } from "react";
import { makeStyles , withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import db from 'db'

//new imports

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


//for slider


const useStyles = makeStyles(styles);
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default function FaqAdmin({ id ,faq, userId, question, status , answer}) {
//size to display 
    

    return  (
        <>
         
          
    
       
          
          </>
             

    )
        
       
     
}