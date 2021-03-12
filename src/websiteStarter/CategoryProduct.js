import React, { useState, useEffect } from "react";
//import { Button } from "@material-ui/core";
//import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/categoryProductPage/categoryproductStyle.js"
import { useParams } from "react-router-dom";
import db from 'db';
import Product from "./Product.js";
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
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import { Grid } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import { Icon, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import CustomInput from "components/CustomInput/CustomInput";

const useStyles = makeStyles(styles);

export default function CategoryProduct() {

  const classes = useStyles();
  const { categoryName } = useParams();
  const [category, setCategory] = useState({
    categoryId: ""
  })
  //const { categoryId } = category
  const history = useHistory()
  console.log(category)

  //listen to the selected category id
  useEffect(() => db.Category.listenOne(setCategory, categoryName), [categoryName])
  //console.log(categoryId)

  //listen to the selected categoryId id in comment
  const [products, setProducts] = useState([]);
  useEffect(() => db.Products.listenByCategoryId(setProducts, categoryName), [categoryName])

  //to search color 
  const [searchColorResults, setColorResults] = useState([]);
  const handleColorChange = event => {
    setColor(event.target.value);
  };
  //function for removing the duplicate color  value from dropdown list
  function getUnique(arr, comp) {
    const unique = arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e]).map(e => arr[e]);
    return unique;
  }
  const uniquecolor = getUnique(products, 'color')
  const [color, setColor] = useState("")
  useEffect(() => {
    const results = products.filter(function (result) {
      return result.color === color
    })
    setColorResults(results);
  }, [products, color]);


  //to search size 
  const [size, setSize] = useState("")
  const [searchSizeResults, setSizeResults] = useState([]);
  const handleSizeChange = event => {
    setSize(event.target.value);
  };
  useEffect(() => {
    const results = products.filter(function (result) {
      return result.size === size
    })
    setSizeResults(results);
  }, [products, size]);
  const uniquesize = getUnique(products, 'size')

  //to search products
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
      };
    useEffect(() => {
        const results = products.filter(cmt =>
          cmt.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [products,searchTerm]);


  const handleClickCategory = () => {
    history.push("/categories")
  }

  const handleClickHome = () => {
    history.push("/")
  }


  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cookie&family=Dancing+Script:wght@605&family=El+Messiri:wght@600;700&display=swap');
</style>


<div style={{backgroundColor:"white"}}>
         <br/>
         <br/>
         <br/>
             
       <GridContainer justify="center" >
        <GridItem >
        <h2 style={{ fontFamily: "'El Messiri', sans-serif", textTransform: "uppercase", opacity: "0.9", textAlign:"center" }}>{categoryName} {" BAGS"}{`(${products.length})`}</h2>
            <hr style={{marginLeft:"auto", marginRight:"auto", width:"80%"}}/>
            <br/>
             {/* go back button */}
             <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" onClick={handleClickHome}>
                Home
              </Link>
              <Link color="inherit" onClick={handleClickCategory}>
                Category
              </Link>
              <Link
                color="textPrimary"
                aria-current="page"
              >
                {categoryName} &nbsp; Products
              </Link>
            </Breadcrumbs>

            <br />
            <br />
            <br/>
            <Grid container>
            <Grid item xs={2}>
            <div style={{margin:"10px"}}>
              <h3 style={{fontFamily:"sans-serif"}}>Filter<FilterListIcon/></h3>
              <div>
              <CustomInput
                  inputProps={{
                    placeholder: "Search Product",
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
                <InputLabel id="category">Sort By Color</InputLabel>
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
              <br/> <br/>
              <FormControl component="fieldset">
                <FormLabel component="legend">Size</FormLabel>
                <RadioGroup aria-label="position" name="position" value={size} onChange={handleSizeChange} defaultValue="top" row>
                <FormControlLabel value={""} control={<Radio color="primary" />} label="All" />
                </RadioGroup> 
                {
                  uniquesize.map(pr =>
                    <RadioGroup key={pr.id} row aria-label="position" name="position" value={size} onChange={handleSizeChange} defaultValue="top">
                      <FormControlLabel value={pr.size} control={<Radio color="primary" />} label={pr.size} />
                    </RadioGroup>
                  )
                }
              </FormControl>
              </div>
          <br/>
         
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
                    products.map(
                      product =>
                        <Product
                          key={product.id}
                          product={product}
                          {...product} />
                    )
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