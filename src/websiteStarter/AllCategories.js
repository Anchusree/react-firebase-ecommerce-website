import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../components/Grid/GridContainer.js";
import db from "../db"
//import UserContext from '../UserContext'
import landingstyle from './Css/homepage.module.css'
//import ContactUs from "./ContactUs.js";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Category from "./Category.js";
import CategoryProduct from "./CategoryProduct.js";


const useStyles =  makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 690,
    height:750,
  }
}));


export default function AllCategories() {

    const classes = useStyles();

    //listen to all categories
    const [categories, setCategories] = useState([]);
    useEffect(()=> db.Category.listenAll(setCategories),[])    
    
    const [spacing] = React.useState(5);
  
    const [selected, setSelected] = useState(null)
    const select = onecategory =>{
      setSelected(onecategory)
    }
  return (
    <div className={landingstyle.homeContainer}>
        <br/>
     
          <GridContainer>  
          <Grid container className={classes.root} spacing={3}>
                  
          <Grid item >
          <h2 style={{margin:"50px", fontFamily:"'Amita', cursive", textAlign:"center"}}>All Brands({categories.length})</h2>
          <hr  style={{marginLeft:"auto", marginRight:"auto", width:"80%"}}/>
          <Grid container justify="center" spacing={spacing}>
          
          {
          categories.map((value) => (
            <Grid key={value.id} item>
              <Paper className={classes.paper}>
                <Category {...value} id={value.id} select={select}/>
              </Paper>
            </Grid>
          ))}
          <br/>
          <br/>
        </Grid>
      </Grid>
      </Grid>
    </GridContainer>

    {
      selected
      ?
      <CategoryProduct
      onecategory={selected}
    {...selected}
    />
    :
    null
    }
        <div>

        </div>

    </div>
  );
}
