import React, { useEffect, useState } from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import db from 'db'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
//import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
//import CardFooter from "components/Card/CardFooter.js";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/adminStyle.js";

const useStyles = makeStyles(styles);

export default function DashboardPage(){
    const classes = useStyles();
    //to get all customers
    const [users, setUsers] = useState(0)
    useEffect(() => db.Users.listenToCustomerCount(setUsers,"user"), [])
   // to get all categorylength
    const [categories, setCategories] = useState(0)
    useEffect(() => db.Category.listenToCategoryCount(setCategories), [])
    //to get all productlength
    const [products, setProducts] = useState(0)
    useEffect(() => db.Products.listenAll(setProducts), [])

    //to get all faqlength
    const [faqs, setFaqs] = useState(0)
    useEffect(() => db.Faq.listenAll(setFaqs), [])


     // to get all payment length
     const [payments, setPayments] = useState(0)
     useEffect(() => db.Payment.listenAll(setPayments), [])

     const [comments, setComments] = useState([])
    useEffect(() => db.Products.Review.listenToAllProductsAllReviews(setComments), [])


    return(
      <>      
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="success">
              <Typography>Total Registered Customers</Typography>
            </CardHeader>
            <CardBody>
              <h3 className={classes.cardTitle} style={{textAlign:"center",fontFamily:"amita, cursive"}}>{users.length}</h3>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card >
            <CardHeader color="warning">
            <Typography>Total Products</Typography>
            </CardHeader>
            <CardBody>
            <h3 className={classes.cardTitle} style={{textAlign:"center",fontFamily:"amita, cursive"}}>{products.length}</h3>
            </CardBody>
           
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="danger">
              <Typography>Total Category</Typography>
            </CardHeader>
            <CardBody>
              <h3 className={classes.cardTitle} style={{textAlign:"center",fontFamily:"amita, cursive"}}>{categories}</h3>
            </CardBody>
           
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="info">
              <Typography>Product Comments</Typography>
            </CardHeader>
            <CardBody>
            <h3 className={classes.cardTitle} style={{textAlign:"center",fontFamily:"amita, cursive"}}>{comments.length}</h3>
            </CardBody>
            
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <Typography>Total FAQs</Typography>
            </CardHeader>
            <CardBody>
            <h3 className={classes.cardTitle} style={{textAlign:"center",fontFamily:"amita, cursive"}}>{faqs.length}</h3>
            </CardBody>
           
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="success">
              <Typography>Total Payments</Typography>
            </CardHeader>
            <CardBody>
            <h3 className={classes.cardTitle} style={{textAlign:"center",fontFamily:"amita, cursive"}}>{payments.length}</h3>
            </CardBody>
           
          </Card>
        </GridItem>
        <br/>
        <br/>
      </GridContainer> 
        </>
    )
}