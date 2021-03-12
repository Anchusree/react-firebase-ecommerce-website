import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import db from 'db';
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import UserContext from 'UserContext'
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CategoryForm from "./CategoryForm";
import { Dialog } from '@material-ui/core';
import "firebase/storage"
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Slide from "@material-ui/core/Slide";
import Card from "components/Card/Card.js";
import TablePagination from '@material-ui/core/TablePagination'
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import CustomInput from "components/CustomInput/CustomInput.js";
import IconButton from "@material-ui/core/IconButton";
import Button from "components/CustomButtons/Button.js";
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import InputAdornment from "@material-ui/core/InputAdornment";
import fb from "fb"
import "firebase/storage"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
 });
 Transition.displayName = "Transition";
 
const useStyles = makeStyles(styles);


export default function ManageCategory(){

    
    const classes = useStyles();
    const { user } = useContext(UserContext)
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const [catId, setCategoryId] = useState("")
    const [name, setCategoryName] = useState("")
    const [categoryDesc, setCategoryDesc] = useState("")
    const [picture, setCategoryImage] = useState("")

    const uploadimg = async event => {
        const filenameRef = fb.storage().ref().child(`category/img${name}`)
        //console.log(filenameRef)
        const snapshot = await filenameRef.put(event.target.files[0])
        // put file url in category object and upload to db
        const picture1 = await snapshot.ref.getDownloadURL()
        setCategoryImage(picture1)
    }

    const [classicModal, setClassicModal] = React.useState(false);

    const [allcategories, setAllCategories] = useState([]);
    useEffect(()=> {db.Category.listenAll(setAllCategories)},[user])

    const remove = (categoryId)=>{
        db.Category.remove(categoryId)
    }
    const edit = (category) =>{
        setClassicModal(true)
        setCategoryId(category.id)
        setCategoryName(category.categoryName)
        setCategoryDesc(category.categoryDescription)
        setCategoryImage(category.categoryImage)
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
    const emptyRows = rowsPerPage - Math.min(rowsPerPage,allcategories.length - page * rowsPerPage)

    const save =  async() =>{
        await db.Category.update({ id: catId,categoryName : name , categoryDescription : categoryDesc , categoryImage:picture}) 
        setClassicModal(false)
    }
    return(
        <>
        <GridContainer>
             <CategoryForm />
        </GridContainer>
        <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
     
        <CustomTabs
        headerColor="primary"
        tabs={[
        {
        tabName: `All Categories (${allcategories.length})`,
        tabContent: (
        <div className={classes.textCenter}>

        <GridItem xs={12} sm={12} md={12}>
      
        <Card className={classes[cardAnimaton]}>
       
        <Table aria-label="simple table">
            <Thead>
                <Tr>
                    <Th>Category Id</Th>
                    <Th>Category Name</Th>
                    <Th>Category Description</Th>
                    <Th>Image</Th>
                    <Th>Actions</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
              {
              
           allcategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category,index)=>
           <Tr key={category.id}>
            <Td>{category.id} </Td>
            <Td>{category.categoryName} </Td>
            <Td>{category.categoryDescription} </Td>
            <Td><img width="140px" height="140px" alt="images" src={category.categoryImage}></img> </Td>
          <Td>
          <Button variant="contained" color="primary" onClick={() => remove(category.id)}>X</Button>
           <Button variant="contained" color="primary" onClick={() => edit(category)}>Edit</Button>
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

    </Card>
    <TablePagination
      component="div"
      count={allcategories.length}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      color="primary"
    />
            
        </GridItem>
        </div>
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
                    <h4 className={classes.modalTitle}>Edit Category</h4>
                </DialogTitle>
                <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                >
                <br/>
                <CustomInput
                        labelText="Brand Name"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => setCategoryName(event.target.value),
                            value: name,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        labelText="Description"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => setCategoryDesc(event.target.value),
                            value: categoryDesc,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        labelText="upload-photo"
                        id="upload-photo"
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