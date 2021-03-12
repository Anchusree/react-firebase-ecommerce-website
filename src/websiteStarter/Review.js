import React, { useState, useEffect, useContext } from "react";
import UserContext from '../UserContext'
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/categoryProductPage/categoryproductStyle.js"
import { useHistory, useParams } from "react-router-dom";
import db from 'db';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import ReviewProducts from "./ReviewProducts";
import Linkpath from '@material-ui/core/Link';
import { Breadcrumbs, Grid } from "@material-ui/core";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";


const useStyles =  makeStyles(styles);


export default function Review(){
    
    const classes = useStyles();
    const { user } = useContext(UserContext)
    const history = useHistory()

    const { id } = useParams();
    //console.log(id)
    const [product, setProduct] = useState({
         productName:"",productImage:""
    })
    //const { productName,productDescription, productImage,price,color,size,modelImage,categoryId} = product

    //listen to the selected product id
    useEffect( ()=> db.Products.listenOne(setProduct,id ),[id])

    //listen to display comments of the selected product
    const [comments,setComments] = useState([]);
    useEffect( ()=> db.Products.Review.listenToOneProductAllComments(setComments,id ),[id])
    //console.log(comments)

    const handleClickProducts = ()=>{
      history.push("/products")
    }
       //function for removing the duplicate prodruct id  value from dropdown list
       function getUnique(arr, comp) {
        const unique =  arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i)
             // eliminate the false indexes & return unique objects
               .filter((e) => arr[e]).map(e => arr[e]);
        return unique;
        }
           

      //to search rating 
      const [allratings, setAllRatings] = useState("")
      const [searchRatingResults, setRatingResults] = useState([]);
      const handleRatingChange = event => {
            setAllRatings(event.target.value);
        };
      useEffect(() => {
          const results = comments.filter(function(result) {
              return result.rating === allratings
          })
          setRatingResults(results);
      }, [comments,allratings]);
      const uniquerating = getUnique(comments,'rating')

        //to search review dates
        const [allratingdates, setAllRatingDates] = useState('')
        const [searchRatingDatesResults, setRatingDatesResults] = useState([]);
        const handleRatingDateChange = event => {
              setAllRatingDates(event.target.value);
          };
        useEffect(() => {
            const results = comments.filter(function(result) {
                return result.reviewDate === allratingdates
            })
            setRatingDatesResults(results);
        }, [comments,allratingdates]);
        const uniqueratingdate = getUnique(comments,'reviewDate')
   
    return(
     <>

      <div >
         <img src="https://blog.zoom.us/wp-content/uploads/2016/09/shutterstock_373081525.jpg" alt="review" style={{
         backgroundSize: "cover",
         backgroundPosition: "top center"}} width="100%" height="350px"/>
         <br/><br/>
         <Breadcrumbs aria-label="breadcrumb">
        <Linkpath color="inherit" onClick={handleClickProducts} style={{cursor:"pointer"}}>
        Products
        </Linkpath>
        <Linkpath
        color="textPrimary"
         aria-current="page"
        >
        Review
        </Linkpath>
        </Breadcrumbs>
         <div className={classes.detailgrid}>
            <div style={{flexDirection:"row"}}>
                <GridContainer justify-content="center">
                    <GridItem>
                    <div className={classes.categoryHeader}>
                        <h2 style={{fontFamily:"amita", opacity:"0.8"}}>
                        <img  alt="complex" src={product.productImage} style={{ height: "150px", width: "150px" , borderRadius:"12px"}}/>
                        {product.productName} Reviews ({`${comments.length}`})</h2>
                    </div>

            <Grid item xs={2}>
            <div>
            <div>
                    <FormControl>
              <InputLabel id="category">Sort By Rating</InputLabel>
              <Select
                labelId="Sort by Rating"
                id="allprductratings"
                value={allratings}
                style={{ width: "200px" }}
                onChange={handleRatingChange}
              >
                <MenuItem value={""}>All</MenuItem>
                {
                  
                  uniquerating.map(item => <MenuItem key={item.id} value={item.rating}>
                    {item.rating}
                  </MenuItem>)
                }
              </Select>
            </FormControl>
            </div>
            <div>
            <FormControl>
              <InputLabel id="category">Sort By Review Date</InputLabel>
              <Select
                labelId="Sort by Rating"
                id="allprductratingdates"
                value={allratingdates}
                style={{ width: "200px" }}
                onChange={handleRatingDateChange}
              >
                <MenuItem value={''}>All</MenuItem>
                {
                  uniqueratingdate.map(item => <MenuItem key={item.id} value={item.reviewDate}>
                    {item.reviewDate}
                  </MenuItem>)
                }
              </Select>
            </FormControl>
            </div>
      
          <br/>
        
        </div>
      </Grid>
            <Grid item xs={10}>

            <GridContainer justify="center">


            {
                     allratings
                     ?
        
                 searchRatingResults.map(comment =>
                    <ReviewProducts key={comment.id} userId={user.id} comment={comment} {...comment} />
                  )
                  :
                  allratingdates
                     ?
        
                 searchRatingDatesResults.map(comment =>
                    <ReviewProducts key={comment.id} userId={user.id} comment={comment} {...comment} />
                  )
                  :
                 comments.map(comment =>
                    <ReviewProducts key={comment.id} userId={user.id} comment={comment} {...comment} />
                  )
                  }   
            </GridContainer>
            </Grid>
 
                    <br/>
                    <br/>
                    <br/>
                    </GridItem>
                    <br/>
            
              </GridContainer>
            </div>
         </div>
     </div>

     </>
    )
}