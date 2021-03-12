import React, { useEffect, useState,useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import db from "../db"
import UserContext from '../UserContext'
import Carousel from "react-slick";
import landingstyle from './Css/homepage.module.css'
//import ContactUs from "./ContactUs.js";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Category from "./Category.js";
import CategoryProduct from "./CategoryProduct.js";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


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
//for saved items style
const usenewStyles = makeStyles((theme) => ({
    root: {
      display: 'contents',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));

export default function UserHomepage() {

  const classes = useStyles();
  const newclasses = usenewStyles();
  const { user } = useContext(UserContext)
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


  //to get number of cart items
  const [items,setItems] = useState([]);
  useEffect( ()=> db.Users.Carts.listenToOneUserAllCartItems(setItems,user.id ),[user.id])

  const [saved,setSaved] = useState([]);
    useEffect( ()=> db.Users.Wishlist.listenToOneUserAllWishlist(setSaved,user.id ),[user.id])

 function getUnique(arr, comp) {
    const unique =  arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i)
          .filter((e) => arr[e]).map(e => arr[e]);
    
    return unique;
    }


    const uniqueProducts = getUnique(saved,'productId')

    const uniqueCarts = getUnique(items,'productId')
    //to get all paid products
    const paidCarts = uniqueCarts.filter(element => element.status === "paid");



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
          <h2 style={{margin:"50px", fontFamily:"'Amita', cursive"}}>Recent saved items</h2>

          <div className={newclasses.root}>
        <GridList className={newclasses.gridList} cols={2.5} >
        {paidCarts.map((tile) => (
          <GridListTile key={tile.id}>
            <img src={tile.image} alt={tile.image} height="150px" width="200px" />
            <GridListTileBar
            //   title={tile.title}
              classes={{
                root: newclasses.titleBar,
                title: newclasses.title,
              }}
            //   actionIcon={
                // <IconButton aria-label={`star ${tile.title}`}>
                //   <StarBorderIcon className={newclasses.title} />
                // </IconButton>
            //   }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
         
      </Grid>
      </Grid>
    </GridContainer>

    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {uniqueProducts.map((tile) => (
          <GridListTile key={tile.id}>
            {/* <img src={tile.img} alt={tile.title} /> */}
            <GridListTileBar
              title={tile.productId}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>




     
          <GridContainer>  
          <Grid container className={classes.root} spacing={3}>
                  
          <Grid item >
          <h3 style={{margin:"50px", fontFamily:"'Amita', cursive"}}>Our Popular Brands</h3>
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
