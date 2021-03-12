import React, { useEffect, useState } from "react";
import db from 'db'
import fb from "fb"
import "firebase/storage"
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { FormControl, Icon, InputLabel, MenuItem, Select } from "@material-ui/core";
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
 

const useStyles = makeStyles(styles);

export default function ProductForm() {

    const classes = useStyles();

    const [productName, setProductName] = useState("")
    const [productDesc, setProductDesc] = useState("")
    const [productImage, setProductImage] = useState("")
    const [price, setPrice] = useState(0)
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const [modelImage, setModelImage] = useState("")
    const [categoryId, setCategoryId] = useState("")
    //const [reviewId, setReviewId] = useState("")


    const uploadimg = async event => {
        const filenameRef = fb.storage().ref().child(`products/img${productName}`)
        //console.log(filenameRef)
        const snapshot = await filenameRef.put(event.target.files[0])
        // put file url in category object and upload to db
        const picture1 = await snapshot.ref.getDownloadURL()
        setProductImage(picture1)
    }

    const uploadimg1 = async event => {
     const filenameRef1 = fb.storage().ref().child(`products/model${productName}`)
        const snapshot1 = await filenameRef1.put(event.target.files[0])
        const picture2 = await snapshot1.ref.getDownloadURL()    
        setModelImage(picture2)
    }


    const [categories, setCategories] = useState([])
    useEffect(() => db.Category.listenAll(setCategories), [])

   
    const valid = () =>
        productName !== "" &&
        productDesc !== "" &&
        productImage !== "" &&
        price !== "" &&
        color !== "" &&
        size !== "" &&
        modelImage !== "" &&
        categoryId !== "" 



    const create = async() =>{
         await db.Products.create({ productName : productName, productDescription : productDesc, 
            productImage: productImage, price: price,color: color, size:size,modelImage:modelImage, categoryId:categoryId })
         setProductName("")
         setProductDesc("")
         setProductImage("")
         setPrice(0)
         setColor("")
         setSize("")
         setModelImage("")
         setCategoryId("")
    }
    return (
        <GridItem xs={12} sm={12} md={6}>
            <Card >
                <CardHeader color="primary" className={classes.cardHeader}>
                    Create new Product
                </CardHeader>
                <CardBody>
                    <CustomInput
                        labelText="Product Name"
                        id="productname"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => setProductName(event.target.value),
                            value: productName,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        labelText="Product Description"
                        id="productdescription"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => setProductDesc(event.target.value),
                            value: productDesc,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        labelText="Upload-product-image"
                        id="Upload-product-image"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: uploadimg,
                            type: "file",
                            endAdornment: (
                                <InputAdornment position="start">
                                   <IconButton>
                                        <InsertPhotoIcon />
                                    </IconButton>
                                </InputAdornment>
                              ),
                        }}
                    />
                    <br/>
                    <CustomInput
                        labelText="Price"
                        id="price"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => setPrice(event.target.value),
                            value: price,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        labelText="Color"
                        id="color"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => setColor(event.target.value),
                            value: color,
                            type: "text"
                        }}
                    />
                     <FormControl>
                        <InputLabel>Size</InputLabel>
                        <Select
                            labelId="size"
                            value={size}
                            onChange={event => setSize(event.target.value)}>
                              <MenuItem key={1} value={"Small"}>Small</MenuItem>
                               <MenuItem key={2} value={"Medium"}>Medium</MenuItem>
                               <MenuItem key={3} value={"Large"}>Large</MenuItem>
                        </Select>
                    </FormControl>
                    <CustomInput
                        labelText="Upload-model-image"
                        id="upload-model-image"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: uploadimg1,
                            type: "file",
                            endAdornment: (
                                <InputAdornment position="start">
                                   <Icon>
                                        <InsertPhotoIcon />
                                    </Icon>
                                </InputAdornment>
                              ),
                        }}
                    />
                    <br/>
                        <FormControl>
                        <InputLabel id="brandId">Brand</InputLabel>
                        <Select
                            labelId="brandId"
                            id="brandId"
                            value={categoryId}
                            onChange={event => setCategoryId(event.target.value)}
                        >
                            {
                                categories.map(brand => 
                                <MenuItem key={brand.id} value={brand.categoryName}>
                                    {brand.categoryName}<img width="60px" height="70px" alt="images" src={brand.categoryImage}></img>
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>

                </CardBody>
                <CardFooter className={classes.cardFooter}>
                    <Button simple disabled={!valid()} color="primary" size="lg" onClick={create}>
                        Add
                    </Button>

                     
                </CardFooter>
            </Card>
        </GridItem>
    )
}