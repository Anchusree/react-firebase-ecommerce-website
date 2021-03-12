import React, { useState } from "react";
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
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { Icon } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(styles);

export default function CategoryForm() {

    const classes = useStyles();

    const [categoryName, setCategoryName] = useState("")
    const [categoryDesc, setCategoryDesc] = useState("")
    const [categoryImage, setCategoryImage] = useState("")

    const uploadimg = async event => {
        const filenameRef = fb.storage().ref().child(`category/img${categoryName}`)
        //console.log(filenameRef)
        const snapshot = await filenameRef.put(event.target.files[0])
        // put file url in category object and upload to db
        const picture1 = await snapshot.ref.getDownloadURL()
        setCategoryImage(picture1)
    }

   
    const valid = () =>
        categoryName !== "" &&
        categoryDesc !== "" &&
        categoryImage !== ""

    const create = () =>{
        db.Category.create({ categoryName : categoryName, categoryDescription : categoryDesc, categoryImage: categoryImage })
        setCategoryName("")
        setCategoryDesc("")
        setCategoryImage("")
    }
    return (
        <GridItem xs={12} sm={12} md={6}>
            <Card >
                <CardHeader color="info" className={classes.cardHeader}>
                    Create a new Category
                </CardHeader>
                <CardBody>
                    <CustomInput
                        labelText="Brand Name"
                        id="categoryname"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => setCategoryName(event.target.value),
                            value: categoryName,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        labelText="Description"
                        id="categorydescription"
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
                                   <Icon>
                                        <InsertPhotoIcon />
                                    </Icon>
                                </InputAdornment>
                              ),
                        }}
                    />
                    <br/>
                    <br/>
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                    <Button simple disabled={!valid()} color="primary" size="lg" onClick={create}>
                        Add Category
                    </Button>

                     
                </CardFooter>
            </Card>
        </GridItem>
    )
}