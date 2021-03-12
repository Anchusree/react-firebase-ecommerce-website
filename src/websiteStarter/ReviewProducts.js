import React, { useState, useEffect } from "react";
import GridItem from "../components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/categoryProductPage/categoryproductStyle.js"
import db from 'db';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import bttnstyle from './Css/myButton.module.css'
import { Button, Slide } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import CustomInput from "../components/CustomInput/CustomInput.js";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Datetime from "react-datetime";
import rating1 from "../assets/img/ratings/rate1.JPG";
import rating2 from "../assets/img/ratings/rate2.JPG";
import rating3 from "../assets/img/ratings/rate3.JPG";
import rating4 from "../assets/img/ratings/rate4.JPG";
import rating5 from "../assets/img/ratings/rate5.JPG";
import StarRatings from 'react-star-ratings';

//const useStyles = makeStyles(styles);
const usenewStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    margin: 'auto',
    maxWidth: 500,
    maxHeight: 700
  },
  image: {
    width: 178,
    height: 138,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '150',
    maxHeight: '150',
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
 });
 Transition.displayName = "Transition";
 const useStyles =  makeStyles(styles);
 
export default function ReviewProducts({ userId, comment, id, customerId,rating,description,reviewDate,productId}) {

  const classes = useStyles();
  const newclasses = usenewStyles()
  //const { user } = useContext(UserContext)
  
  const [classicModal, setClassicModal] = React.useState(false);

  //state for edit
  const [desc, setDesc] = useState("")
  const [starRating, setRating] = useState(5)
  const [datePosted, setDatePosted] = useState(new Date())

  //removes the product
  const remove = (productId, reviewId) => {
    db.Products.Review.removeProductReview(productId, reviewId)
  }
  //to get product details
  const [prdct, setPrdct] = useState({
    productName: ""
  })
  const { productName} = prdct
  //listen to the current selected product Id
  useEffect(() => db.Products.listenOne(setPrdct, productId), [productId])


  const [custName, setCustName] = useState({
      name:""
  })
  const { name } = custName
  useEffect(() => db.Users.listenOne(setCustName, comment.customerId), [comment.customerId])

  const ratings = [
    {id:1, img:rating1},
    {id:2, img:rating2},
    {id:3, img:rating3},
    {id:4, img:rating4},
    {id:5, img:rating5}
]

const edit = () =>{
    setClassicModal(true)
    setDesc(description)
    setRating(rating)
    setDatePosted(new Date())
}
const save = () =>{
    db.Products.Review.updateComment(productId, { id:id,rating:starRating,description:desc,reviewDate:datePosted, customerId:userId,productId:productId})
    setClassicModal(false)
}

  return (
    <GridItem xs={6} sm={6} md={6}>

      <Paper className={newclasses.paper} style={{backgroundColor:"white"}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={3}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                Review: {description}
                </Typography>
               
                Rating: <StarRatings
                           rating={rating}
                          starRatedColor="blue"
                          numberOfStars={5}
                          name='rating'
                          starDimension="23px"
                        />
             
                <Typography variant="body2" color="textSecondary">
                  Date Posted: {reviewDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Commented By: {name}
                </Typography>  
              </Grid>
            </Grid>
            <Grid item>
             
                { 
                comment.customerId === userId 
                ?
                <>
            <Button style={{color:"blue"}} onClick={edit}>Edit</Button>
            <button  className={bttnstyle.button3} onClick={() => remove(productId, id)} style={{ cursor: 'pointer' }}>
                 <Typography variant="subtitle1"><DeleteIcon/></Typography> 
              </button>
            </>
            :
             null} 
            </Grid>
            
          </Grid>
        </Grid>
      </Paper>
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
                    <h4 className={classes.modalTitle}>Edit Review</h4>
                </DialogTitle>
                <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                >
                 Product Id:  {id}
                    <br/>
                    <br/>
                    {productName}
                    
                    <CustomInput
                        labelText="Description"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => setDesc(event.target.value),
                            value: desc,
                            type: "text"
                        }}
                    />
                    <br />
                    <FormControl>
                        <Datetime
                            value={datePosted}
                            onChange={date => setDatePosted(date ==="undefined" ?  "" : date.toDate().Date )}
                            inputProps={{
                                placeholder: "Date Posted",
                                disabled: true

                            }}
                        />
                    </FormControl>
                    <br/>


                    <FormControl>
                        <InputLabel>Ratings</InputLabel>
                        <Select
                            labelId="rating"
                            value={starRating}
                            onChange={event => setRating(event.target.value)}>
                           
                            {
                                ratings.map(rate => 
                                <MenuItem key={rate.id} value={rate.id}>
                                    <img width="95px" height="80px" alt="images" src={rate.img}></img>
                                </MenuItem>)
                            }
                 
                        </Select>
                    </FormControl>
                </DialogContent>
               <DialogActions className={classes.modalFooter}>
                    <Button
                        onClick={() => setClassicModal(false)}
                        color="primary"
                        simple="true"
                    >
                        Cancel
                    </Button>
                    <Button color="primary"  onClick={save} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog> 
    </GridItem>
  )
}