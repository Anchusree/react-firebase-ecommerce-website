import React, { useState, useEffect } from "react";
import Product from "./Product";
import { makeStyles } from "@material-ui/core/styles";
//import styles from "../assets/jss/material-kit-react/views/categoryProductPage/categoryproductStyle.js"
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import db from 'db';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import { Typography } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid, Icon, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import CustomInput from "components/CustomInput/CustomInput";
//import Button from "components/CustomButtons/Button.js";
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles =  makeStyles(styles);

export default function AllProducts(){

   const classes = useStyles();
//listen to all products
    const [allproduct, setAllProduct] = useState([]);
    useEffect( ()=> db.Products.listenAll(setAllProduct),[])
//to search brand products
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
      };
    useEffect(() => {
        const results = allproduct.filter(cmt =>
          cmt.categoryId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [allproduct,searchTerm]);
    
   //to search color 
    const [searchColorResults, setColorResults] = useState([]);
    const handleColorChange = event => {
        setColor(event.target.value);
      };

  //function for removing the duplicate color  value from dropdown list
function getUnique(arr, comp) {
   const unique =  arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the false indexes & return unique objects
          .filter((e) => arr[e]).map(e => arr[e]);
   return unique;
}
    const [color, setColor] =useState("")
      useEffect(() => {
        const results = allproduct.filter(function(result) {
            return result.color === color
        })
        setColorResults(results);
    }, [allproduct,color]);
    
    const uniquecolor = getUnique(allproduct,'color')

  
         //to search size 
    const [size, setSize] = useState("")
    const [searchSizeResults, setSizeResults] = useState([]);
    const handleSizeChange = event => {
          setSize(event.target.value);
      };
    useEffect(() => {
        const results = allproduct.filter(function(result) {
            return result.size === size
        })
        setSizeResults(results);
    }, [allproduct,size]);
    const uniquesize = getUnique(allproduct,'size')

    return(
        <>
      
        <div>
        <style>@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@605&display=swap');</style>
        </div>
     
   
         <div style={{backgroundColor:"white"}}>
         <br/>
         <br/>
             
       <GridContainer justify="center" >
        <GridItem >
            <h2 style={{padding:"20px", textAlign:"center", fontFamily:"'Amita', cursive"}}>BAGS {`(${allproduct.length})`}</h2>
            <hr style={{marginLeft:"auto", marginRight:"auto", width:"80%"}}/>
            <br/>
            <br/>
            <Grid container>
            <Grid item xs={2}>
            <div style={{margin:"10px"}}>
              <h3 style={{fontFamily:"sans-serif"}}>Filter<FilterListIcon/></h3>
              <div>
              <CustomInput
                  inputProps={{
                    placeholder: "Search Brand Name",
                    onChange: handleChange,
                    value: searchTerm,
                    inputProps: {
                      "aria-label": "Search",
                      className: classes.searchInput
                    },
                    endAdornment:(
                      <InputAdornment position="end">
                      <Icon>
                        <Search className={classes.searchIcon} />
                      </Icon>
                      </InputAdornment>
                        )  
                  }}
                />
              </div>
              
            <div>
            <FormControl>
              <InputLabel id="category">Select Color</InputLabel>
              <Select
                labelId="Sort by Color"
                id="allcorors"
                value={color}
                style={{ width: "200px" }}
                onChange={handleColorChange}
              >
                <MenuItem value={""}>All</MenuItem>
                {
                  uniquecolor.map(item => <MenuItem key={item.id} value={item.color}>
                    {item.color}
                  </MenuItem>)
                }
              </Select>
            </FormControl>
          </div>
          <br/>
          <div>
        <FormControl component="fieldset">
         <FormLabel component="legend">Size</FormLabel>
      <RadioGroup aria-label="position" name="position" value={size} onChange={handleSizeChange} defaultValue="top" row>
                <FormControlLabel value={""} control={<Radio color="primary" />} label="All" />
      </RadioGroup> 
      {
              uniquesize.map(pr=>
                <RadioGroup key={pr.id} row aria-label="position" name="position" value={size} onChange={handleSizeChange} defaultValue="top">
                <FormControlLabel value={pr.size} control={<Radio color="primary" />} label={pr.size} />
              </RadioGroup>                      
            )
      }
    
    </FormControl>
    </div>
    </div>
      </Grid>
            <Grid item xs={10}>

            <GridContainer justify="center">


      {
       searchTerm
       ?

     searchResults.map(product => (
        <Product
        key={product.id}
        product={product}
        {...product} />
     ))
         :
 
    color
    ?

    searchColorResults.map(product => (
        <Product
        key={product.id}
        product={product}
        {...product} />
     ))
     :
     size
     ?
     searchSizeResults.map(product => (
      <Product
      key={product.id}
      product={product}
      {...product} />
   ))
   :
     allproduct.map(product => (
        <Product
        key={product.id}
        product={product}
        {...product} />
     ))
         
}
</GridContainer>
            </Grid>
             </Grid>
          
            <br/>
            
       
        </GridItem>

    </GridContainer>
    </div>


        </>
    )
}
