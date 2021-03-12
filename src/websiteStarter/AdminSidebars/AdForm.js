import React, { useState } from "react";
import db from 'db'
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Icon } from "@material-ui/core";
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import fb from "fb"
import "firebase/storage"
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(styles);

export default function AdForm() {

    const classes = useStyles();

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

   
    const valid = () =>
        adName !== "" &&
        adImage !== ""

    const create = async() =>{
        await db.Ads.create({ adName : adName, adImage: adImage })
        setAdName("")
        setAdImage("")
    }
    return (
        <GridItem xs={12} sm={12} md={6}>
            <Card >
                <CardHeader color="info" className={classes.cardHeader}>
                    Create a new Add
                </CardHeader>
                <CardBody>
                    <CustomInput
                        labelText="Ad Name"
                        id="adname"
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