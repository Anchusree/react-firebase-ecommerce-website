import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import db from 'db';
import fb from "fb"
import "firebase/storage"
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
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
import AdForm from './AdForm';
import {  Icon } from "@material-ui/core";
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
 });
 Transition.displayName = "Transition";
 
const useStyles = makeStyles(styles);


export default function ManageAds(){

    
    const classes = useStyles();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const [adId, setAdId] = useState("")
    const [adName, setAdName] = useState("")
    const [adImage, setAdImage] = useState("")

    const uploadimg = async event => {
        const filenameRef = fb.storage().ref().child(`ads/img${adName}`)
        //console.log(filenameRef)
        const snapshot = await filenameRef.put(event.target.files[0])
        // put file url in category object and upload to db
        const picture1 = await snapshot.ref.getDownloadURL()
        setAdImage(picture1)
    }


    const [classicModal, setClassicModal] = React.useState(false);
    
    const [allads, setAllAds] = useState([]);
    useEffect(()=> {db.Ads.listenAll(setAllAds)},[])        

    const remove = (categoryId)=>{
        db.Ads.remove(categoryId)
    }
    const edit = (category) =>{
        setClassicModal(true)
        setAdId(category.id)
        setAdName(category.adName)
        setAdImage(category.adImage)
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
    const emptyRows = rowsPerPage - Math.min(rowsPerPage,allads.length - page * rowsPerPage)
    
    const save =  () =>{
        db.Ads.update({ id: adId,adName : adName , adImage:adImage}) 
        setClassicModal(false)
    }
    return(
        <>
        <GridContainer>
             <AdForm />
        </GridContainer>
        <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
     
        <CustomTabs
        headerColor="primary"
        tabs={[
        {
        tabName: `All Ads (${allads.length})`,
        tabContent: (
        <div className={classes.textCenter}>

      
        <Card className={classes[cardAnimaton]}>
        
        <Table aria-label="simple table">
        <Thead  style={{ border:"1px solid black"}}>
                <Tr>
                    <Th>AD ID</Th>
                    <Th>AD NAME</Th>
                    <Th>IMAGE</Th>
                    <Th>ACTIONS</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
              {
           allads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ad,index)=>
           <Tr key={ad.id}>
            <Td>{ad.id} </Td>
            <Td>{ad.adName} </Td>
            <Td><img width="190px" height="160px" alt="images" src={ad.adImage}></img> </Td>
          <Td>
          <Button variant="contained" color="primary" onClick={() => remove(ad.id)}>X</Button>
           <Button variant="contained" color="primary" onClick={() => edit(ad)}>Edit</Button>
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
      count={allads.length}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      color="primary"
    />
        </div>
        ) }
    ]}
    />
   </GridItem>
  </GridContainer> 

   {/* Diaglog box for edit ads */}
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
                    <h4 className={classes.modalTitle}>Edit Ad</h4>
                </DialogTitle>
                <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                >
                <br/>
                <CustomInput
                        labelText="Ad Name"
                        id="adsname"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => setAdName(event.target.value),
                            value: adName,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        labelText="Upload-ad-image"
                        id="Upload-ad-image"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: uploadimg,
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