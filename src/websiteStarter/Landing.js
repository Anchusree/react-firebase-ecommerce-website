import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import db from "../db"
//import UserContext from '../UserContext'
import Carousel from "react-slick";
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


export default function LandingPage() {

  const classes = useStyles();
  //const { user } = useContext(UserContext)
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows:false,
    swipe:true
    };
    //listen to all ads
    const [allads, setAllAds] = useState([]);
    useEffect(()=> db.Ads.listenAll(setAllAds),[])   

    //listen to all categories
    const [categories, setCategories] = useState([]);
    useEffect(()=> db.Category.listenAll(setCategories),[])    
    
    const [spacing] = React.useState(5);
  
    const [selected, setSelected] = useState(null)
    const select = onecategory =>{
      setSelected(onecategory)
    }
  //  const [offers, setOffers] = useState([])
  //  useEffect(()=>db.Offers.listenAll(setOffers),[])

  return (
    <div className={landingstyle.homeContainer}>
       
          <GridContainer>
            <GridItem>
            <Carousel {...settings}>      
                  {
                   allads.map(ad =>  
                       <img key={ad.id} width="100%" height="500px" alt="adslides" src={ad.adImage} className={landingstyle.slideimage} />     
                    )
                  }
              </Carousel>
            </GridItem>
          </GridContainer>
     
          <GridContainer>  
          <Grid container className={classes.root} spacing={3}>
                  
          <Grid item >
          <h2 style={{margin:"50px", fontFamily:"'Amita', cursive"}}>Our Popular Brands</h2>
          <Grid container justify="center" spacing={spacing}>
          
          {
          categories.map((value) => (
            <Grid key={value.id} item>
              <Paper className={classes.paper}>
                <Category {...value}  id={value.id} select={select}/>
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
