import React, { useState, useEffect, useContext } from "react";
import UserContext from '../UserContext'
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/categoryProductPage/categoryproductStyle.js"
import { Link, useParams } from "react-router-dom";
import db from 'db';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Breadcrumbs, Slide, Typography } from "@material-ui/core";
import Carousel from "react-slick";
import Button from "../components/CustomButtons/Button.js";
import ReactImageMagnify from 'react-image-magnify';
import { useHistory } from 'react-router-dom';
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
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Chat } from "@material-ui/icons";
import CustomTabs from "components/CustomTabs/CustomTabs";
import StarRatings from 'react-star-ratings';
import Linkpath from '@material-ui/core/Link';

const useStyles =  makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";



export default function Productdetails(){
    
    const classes = useStyles();
    const { user } = useContext(UserContext)


    const [disablecartbtn,setDisableCartBtn] = useState(false)


    const [disableWishlistbtn,setDisableWishlistBtn] = useState(false)
    //const newclasses = usenewStyles()
    
    const { id } = useParams();
    const [product, setProduct] = useState({
         productName:"",productDescription:"", productImage:"",price:0,color:"",size:"",modelImage:"",categoryId:""
    })
    const { productName,productDescription, productImage,price,color,size,modelImage,categoryId} = product

 
    //listen to the selected product id
    useEffect( ()=> db.Products.listenOne(setProduct,id ),[id ])

    const handleClickProducts=()=>{
        history.push("/products")
    }

    const history = useHistory()

    const ratings = [
        {id:1,img:rating1},
        {id:2,img:rating2},
        {id:3,img:rating3},
        {id:4,img:rating4},
        {id:5,img:rating5}
    ]
    
    //for the image carousel 
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        swipe:true
        };
    //to get the image array
    const frontSrcSet = [
            { src: productImage, setting: '500w' }
        ]
            .map(item => `${item.src} ${item.setting}`)
            .join(', ');
            
    const backSrcSet = [
                { src: modelImage, setting: '500w' }
            ]
                .map(item => `${item.src} ${item.setting}`)
                .join(', ');

    const dataSource = [
            {
                srcSet: frontSrcSet,
                small: productImage,
                large: productImage
            },
            {
                srcSet: backSrcSet,
                small: modelImage,
                large: modelImage
            }
        ];

    const rimProps= {
            isHintEnabled: true,
            shouldHideHintAfterFirstActivation: false,
            enlargedImagePosition: 'over'
        }
    //when cliked whishlist
    const attemptWishlist = () => {
           if (user && user.role ==="user") {
                setDisableWishlistBtn(true)
                db.Users.Wishlist.createUserWishlist(user.id,{customerId:user.id,productId:id, dateAdded: new Date()})
           } 
            else {
                setDisableWishlistBtn(false)
               history.push("/login")
            }
        }
    //when clicked add to cart
    const attemptCart = (e) => {
            if(user && user.role === "user"){
                setDisableCartBtn(true)
                db.Users.Carts.createUserCartItem(user.id,{productId:id,quantity:1,totalPrice:totalcost,image:productImage,
                    orderDate:new Date(),status:"pending"})
            }
             else {
                setDisableCartBtn(false)
                history.push("/login")
             }
         }

    //for comments starts here
    const [commentModal, setCommentModal] = useState(false);

    const attemptComment=()=>{
            if(user && user.role ==="user"){
                setCommentModal(true)
            }
            else{
                history.push("/login")
            }
        }

    const [description, setDescription] = useState("")
    const [starRating, setRating] = useState(5)
    const [datePosted, setDatePosted] = useState(new Date())

    const [totalcost ] = useState(0)

    const createComment= ()=>{
            db.Products.Review.createProductReview(id,{customerId:user.id,rating:starRating,description:description,reviewDate:datePosted,productId:id})
            setCommentModal(false)
        }

    const validComment = () =>
        starRating !== "" &&
        description !== "" 
    
    //listen to display comments of the selected product
    const [comments,setComments] = useState([]);
    useEffect( ()=> db.Products.Review.listenToOneProductAllComments(setComments,id ),[id])
   
    return(
     <>
     <div style={{padding:"50px", backgroundColor:"white"}}>
         <br/><br/>

     <Breadcrumbs aria-label="breadcrumb">
        
              <Linkpath color="inherit" onClick={handleClickProducts} style={{cursor:"pointer"}}>
                Products
              </Linkpath>
              <Linkpath
                color="textPrimary"
                aria-current="page"
              >
                {productName}
              </Linkpath>
    </Breadcrumbs>

         <div className={classes.detailgrid}>
            <div style={{flexDirection:"row"}}>
                <GridContainer justify-content="center">
                    <GridItem xs={6}>
                       
                      <Carousel {...settings}>
                      {             
                          dataSource.map((src, index) => (
                              <div key={index}>
                                  <ReactImageMagnify
                                      {...{
                                          smallImage: {
                                              alt: 'ladiesbags',
                                              isFluidWidth: true,
                                              src: src.small,
                                              srcSet: src.srcSet,
                                              sizes: '(max-width: 480px) 10vw, (max-width: 120px) 10vw, 460px'
                                          },
                                          largeImage: {
                                              src: src.large,
                                              width: 1626,
                                              height: 2000,
                                              
                                          },
                                          lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
                                      }}
                                      {...rimProps}
                                  />
                                      </div>
                          ))  
                        }
                      </Carousel>
                    </GridItem>
                    <GridItem xs={6}>
                       <div>
                           <h4 style={{fontFamily: 'Roboto Slab', textTransform: "uppercase"}}>{categoryId}</h4>
                           <h3 style={{fontFamily: 'Roboto Slab'}}>{productName}</h3>
                           <h4 style={{fontFamily: 'Roboto Slab'}}>QR {price}</h4>
                           <h3 style={{fontFamily: 'Roboto Slab'}}>Description</h3>
                           <h4 style={{fontFamily: 'Roboto Slab'}}>{productDescription}</h4>
                           <h4 style={{fontFamily: 'Roboto Slab'}}>Color - {color}</h4>
                           <h4 style={{fontFamily: 'Roboto Slab'}}>Size - {size}</h4>
                           <div>
                               {
                                   user
                                   ?
                                   <>
                                    <Button disabled={disablecartbtn} onClick={attemptCart} component={Link} to={`/cartitem/${id}`} simple color="primary" size="lg">
                                        Add To Cart <AddShoppingCartIcon/></Button>
                                    <Button disabled={disableWishlistbtn} onClick={attemptWishlist} component={Link} to={`/wishlist/${id}`} simple color="primary" size="lg">
                                        Add To Wishlist <FavoriteIcon/></Button>
                                    <Button onClick={attemptComment}  simple color="primary" size="lg">Write A Review <CommentIcon/></Button>

                                   </>
                                   :
                                  <>
                                   <Button onClick={attemptCart} simple color="primary" size="lg">Add To Cart <AddShoppingCartIcon/></Button>
                                    <Button onClick={attemptWishlist} simple color="primary" size="lg">Add To Wishlist <FavoriteIcon/></Button>
                                    <Button onClick={attemptComment} simple color="primary" size="lg">Write A Review <CommentIcon/></Button>
                                  </>
                               }
                           </div>
                           <br/>
                           <br/>
                           <br/>


              <CustomTabs
                headerColor="rose"
                tabs={[
                  {
                    tabName: `Reviews(${comments.length})`,
                    tabIcon: Chat,
                    tabContent: (
                      <div>
                          {
                              comments.length > 0
                              ?
                              comments.map(comment=>
                                <React.Fragment key={comment.id}>
                                    <Typography gutterBottom variant="subtitle1">
                                        Comment: {comment.description}
                                    </Typography>
                                        Rating:
                                        <StarRatings
                                        rating={comment.rating}
                                        starRatedColor="yellow"
                                         numberOfStars={5}
                                         name='rating'
                                         starDimension="20px"
                                         />
                              
                                    <Typography variant="body2" color="textSecondary">
                                         Date Posted: {comment.reviewDate}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Commented By: {comment.customerId}
                                      
                                    </Typography>  
                                <hr/>
                                    </React.Fragment>
                                )
                                :
                                <h5 style={{fontFamily:"'Amita', cursive"}}>Be the first one to review this product!!</h5>
                          }
                       
                      </div>
                    )
                  }
                ]}
              />
  
         </div>
         </GridItem>
                </GridContainer>
            </div>
         </div>
     </div>

      {/* for comment dialog box */}
      <Dialog
                classes={{
                    root: classes.center,
                    paper: classes.modal
                }}
                open={commentModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setCommentModal(false)}
                aria-labelledby="comment-modal-slide-title"
                aria-describedby="comment-modal-slide-description"
            >
                <DialogTitle
                    id="comment-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setCommentModal(false)}
                    >
                        <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>Write a Review</h4>
                </DialogTitle>
                <DialogContent
                    id="comment-modal-slide-description"
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
                            onChange: event => setDescription(event.target.value),
                            value: description,
                            type: "text"
                        }}
                    />
                    <br />
                    <FormControl>
                        <Datetime
                            value={datePosted}
                            onChange={date => setDatePosted(date ? date.toDate().Date : null)}
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
                    <br />
                </DialogContent>
                <DialogActions className={classes.modalFooter}>
                    <Button
                        onClick={() => setCommentModal(false)}
                        color="primary"
                        
                    >
                        Cancel
                    </Button>
                    <Button color="primary" size="lg" component={Link} to={`/review/${id}`} disabled={!validComment()} onClick={createComment}>
                        Add Your Comment
                    </Button>
                </DialogActions>
            </Dialog>

     </>
    )
}


// #bc4747, #8e24aa);