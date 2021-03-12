import GridContainer from 'components/Grid/GridContainer'
import React, { useEffect, useState, useContext } from 'react';
import UserContext from 'UserContext'
import ProductForm from './ProductForm'
import GridItem from "components/Grid/GridItem";
import { Dialog, Slide,TablePagination } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import "firebase/storage"
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import { makeStyles } from "@material-ui/core/styles";
import db from 'db';
import fb from 'fb';
import "firebase/storage"
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { FormControl, InputLabel, MenuItem, Select,IconButton,Icon } from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput.js";
import Close from "@material-ui/icons/Close";
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
 });
 Transition.displayName = "Transition";
export default function ManageProducts(){

    const classes = useStyles();
    const { user } = useContext(UserContext)

    const [classicModal, setClassicModal] = React.useState(false);

    const [productId, setProductId] = useState("")
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
        const snapshot = await filenameRef.put(event.target.files[0])
        // put file url in product object and upload to db
        const picture1 = await snapshot.ref.getDownloadURL()
        setProductImage(picture1)
    }

    const uploadimg1 = async event => {
     const filenameRef1 = fb.storage().ref().child(`products/model${productName}`)
        const snapshot1 = await filenameRef1.put(event.target.files[0])
        const picture2 = await snapshot1.ref.getDownloadURL()    
        setModelImage(picture2)
    }

    const [allproducts, setAllProducts] = useState([]);
    useEffect(()=> {db.Products.listenAll(setAllProducts)},[user])

    const [categories, setCategories] = useState([])
    useEffect(() => db.Category.listenAll(setCategories), [])

    const remove = (productId)=>{
        db.Products.remove(productId)
    }
    const edit = (product) =>{
        setClassicModal(true)
        setProductId(product.id)
        setProductName(product.productName)
         setProductDesc(product.productDescription)
         setProductImage(product.productImage)
         setPrice(product.price)
         setColor(product.color)
         setSize(product.size)
         setModelImage(product.modelImage)
         setCategoryId(product.categoryId)
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage,allproducts.length - page * rowsPerPage)

    const save = () =>{
        db.Products.update({ id: productId, productName : productName, productDescription : productDesc, 
           productImage: productImage, price: price,color: color, size:size,modelImage:modelImage, categoryId:categoryId })
        setClassicModal(false)
   }
     //function for removing the duplicate color  value from dropdown list
    function getUnique(arr, comp) {
    const unique =  arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i)
         // eliminate the false indexes & return unique objects
           .filter((e) => arr[e]).map(e => arr[e]);
    return unique;
    }
          //to search size 
          const [allsize, setAllSize] = useState("")
          const [searchSizeResults, setSizeResults] = useState([]);
          const handleSizeChange = event => {
                setAllSize(event.target.value);
            };
          useEffect(() => {
              const results = allproducts.filter(function(result) {
                  return result.size === allsize
              })
              setSizeResults(results);
          }, [allproducts,allsize]);
          const uniquesize = getUnique(allproducts,'size')

          // all colors dropdownlist
          const [allcolor, setAllColor] =useState("")
          useEffect(() => {
            const results = allproducts.filter(function(result) {
                return result.color === allcolor
            })
            setColorResults(results);
        }, [allproducts,allcolor]);
        
           //to search color 
        const [searchColorResults, setColorResults] = useState([]);
        const handleColorChange = event => {
        setAllColor(event.target.value);
        };
        const uniquecolor = getUnique(allproducts,'color')

  

    return(
        <>
        <GridContainer>
             <ProductForm/>
        </GridContainer>

        <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
     
        <CustomTabs
        headerColor="info"
        tabs={[
        {
        tabName: `All Products (${allproducts.length})`,
        tabContent: (
       <>

            <FormControl>
              <InputLabel id="category">Select Color</InputLabel>
              <Select
                labelId="Sort by Color"
                id="allcorors"
                value={allcolor}
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
            <FormControl component="fieldset">
            <FormLabel component="legend">Size</FormLabel>

              <RadioGroup aria-label="position" name="position" value={allsize} onChange={handleSizeChange} defaultValue="top" row>
                <FormControlLabel value={""} control={<Radio color="primary" />} label="All" />
              </RadioGroup> 
           
             {
              uniquesize.map(pr=>
                <RadioGroup key={pr.id} aria-label="position" name="position" value={allsize} onChange={handleSizeChange} defaultValue="top" row>
                <FormControlLabel value={pr.size} control={<Radio color="primary" />} label={pr.size} />
              </RadioGroup>                      
            )
            }
        </FormControl>
            <hr/>
       
        <Table aria-label="simple table">
            <Thead  style={{ border:"1px solid black"}}>
                <Tr>
                    <Th>Product Name</Th>
                    <Th>Price</Th>
                    <Th>Image</Th>
                    <Th>Brand</Th>
                    <Th>ModelImage</Th>
                    <Th>Actions</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
              {
               allcolor
               ?
   
               searchColorResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product => (
                <Tr key={product.id}>
                <Td style={{ minWidth: 100 }}>{product.productName} </Td>
                <Td>{product.price} </Td>
                <Td><img width="130px" height="130px" alt="images1" src={product.productImage}></img> </Td>
                <Td>{product.categoryId} </Td>
                <Td><img width="130px" height="130px" alt="image2" src={product.modelImage}></img> </Td>
              <Td>
              <Button variant="contained" color="primary" onClick={() => remove(product.id)}>X</Button>
              <Button variant="contained" color="primary" onClick={() => edit(product)}>Edit</Button>
              </Td>
              </Tr>
                )))
                :
                allsize
                ?
    
                searchSizeResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product => (
                 <Tr key={product.id}>
                 <Td style={{ minWidth: 100 }}>{product.productName} </Td>
                 <Td>{product.price} </Td>
                 <Td><img width="130px" height="130px" alt="images1" src={product.productImage}></img> </Td>
                 <Td>{product.categoryId} </Td>
                 <Td><img width="130px" height="130px" alt="image2" src={product.modelImage}></img> </Td>
               <Td>
               <Button variant="contained" color="primary" onClick={() => remove(product.id)}>X</Button>
               <Button variant="contained" color="primary" onClick={() => edit(product)}>Edit</Button>
               </Td>
               </Tr>
                 )))
                 :
           allproducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product,index)=>
           <Tr key={product.id}>
            <Td style={{ minWidth: 100 }}>{product.productName} </Td>
            <Td>{product.price} </Td>
            <Td><img width="130px" height="130px" alt="images1" src={product.productImage}></img> </Td>
            <Td>{product.categoryId} </Td>
            <Td><img width="130px" height="130px" alt="image2" src={product.modelImage}></img> </Td>
          <Td>
          <Button variant="contained" color="primary" onClick={() => remove(product.id)}>X</Button>
          <Button variant="contained" color="primary" onClick={() => edit(product)}>Edit</Button>
          </Td>
          </Tr>
            )}
       
       {
         emptyRows > 0 && (
           <Tr style={{height:53 * emptyRows}}>
             <Td colSpan={6}/>
           </Tr>
         )
       }
     </Tbody>
      </Table>
    <TablePagination
      component="div"
      count={allproducts.length}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      color="primary"
    />
</>
        ) }
    ]}
    />
   </GridItem>
  </GridContainer> 

    {/* Diaglog box for edit category */}
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
                    <h4 className={classes.modalTitle}>Edit Product</h4>
                </DialogTitle>
                <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                >
                <br/>
                <CustomInput
                        labelText="Product Name"
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
                        labelText="Description"
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
                        id="productprice"
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
                            labelId="productsize"
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
                        <InputLabel id="brand_Id">Brand</InputLabel>
                        <Select
                            labelId="brand_Id"
                            id="brand_Id"
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
                </DialogContent>
               <DialogActions className={classes.modalFooter}>
                    <Button
                        onClick={() => setClassicModal(false)}
                        color="primary"
                        simple
                    >
                        Cancel
                    </Button>
                    <Button color="success" simple  onClick={save} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog> 
        </>
    )
}