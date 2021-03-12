import React, { useState, useEffect } from "react";
import Register from 'websiteStarter/Register';
import Login from './Login';
import fb from '../fb'
import db from '../db'
import UserContext from "UserContext";
import Header from "./Header";
import HeaderLinksLeft from './HeaderLinksLeft'
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HeaderLinksRight from "./HeaderLinksRight";
//import HomePage from "./HomePage";
import Admin from "./Admin";
import Logout from "./Logout";
import logo from '../assets/img/logo.png'
import CategoryProduct from "./CategoryProduct";
import LandingPage from "./Landing";
import Footer from './Footer'
import Productdetails from "./Productdetails";
import Wishlist from "./Wishlist";
import AllProducts from "./AllProducts";
import Faq from "./Faq";
import Review from "./Review";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import Reciept from "./Reciept";
import PaymentSubmission from "./PaymentSubmission";
import Profile from "./Profile";
import Carts from "./Carts";
import AllCategories from "./AllCategories";
import ContactUs from "./ContactUs";
import headingstyle from './Css/homepage.module.css'

function App(){

    const [user, setUser] = useState(null) // store db user, not auth user 
    // run once, set listener to auth user state
    useEffect(() => {
      let unsubscribe = () => { } // initially, do nothing
  
      const findAndSetUser = async user => {
        unsubscribe()
        if (user) {
          unsubscribe = db.Users.listenOne(setUser, user.uid)
        } else {
          unsubscribe = () => { }
          setUser(null)
        }
      }
  
      const authUnsubscribe = fb.auth().onAuthStateChanged(findAndSetUser)
  
      return () => {
        authUnsubscribe()
        unsubscribe()
      }
    }, [])
  

    return(
        <>
    <Router>
    <UserContext.Provider value={{user}}>
      {
       user 
       ?
       <>
       {
        user.role === "user"
        ?
        <>
        <Header
            color="white"
            logo={logo}
            brand="CLASSIQUE BAGS"
            leftLinks = {<HeaderLinksLeft/>}
            rightLinks={<HeaderLinksRight />}
            fixed
            changeColorOnScroll={{
            height: 400,
            color: "dark"
            }}
            className={headingstyle.headertitle}
        />
        <div style={{padding:"37px", backgroundColor:"white"}}></div>
        </>
        :
        null
      }
      </>
      :
      <Header
            color="white"
            logo={logo}
            brand="CLASSIQUE BAGS"
            leftLinks = {<HeaderLinksLeft/>}
            rightLinks={<HeaderLinksRight />}
            fixed
            changeColorOnScroll={{
            height: 400,
            color: "dark"
            }}
        />
        
      }
      
    
        <Switch>
            {
                user
                ?
                <>
                {
                  user.role === "admin"
                    ?
                    <>
                    <Route path="/admin" component={Admin}/>
                    <Redirect from="/" to="/admin/dashboard" />
                    </>
                    :
                    <Route exact path="/">
                      <LandingPage />
                    </Route>
                }
                <Route path="/logout">
                    <Logout />
                </Route>
                  
                <Route path="/category/:categoryName/">
                  <CategoryProduct/>
                </Route>
                <Route path="/details/:id/">
                  <Productdetails/>
                </Route>
                <Route path="/wishlist/:id/">
                  <Wishlist/>
                </Route>
                <Route path="/review/:id/">
                  <Review/>
                </Route>
                <Route path="/cartitem/:id/">
                  <Carts/>
                </Route>
                <Route path="/checkout/:id/">
                  <ShippingForm/>
                </Route>
                <Route path="/products">
                  <AllProducts/>
                </Route>
                <Route path="/faq">
                  <Faq />
                </Route>
                <Route path="/payment/:id/">
                  <PaymentForm/>
                </Route>
                <Route path="/reciept/:id/">
                  <Reciept/>
                </Route>
                <Route path="/paymentsubmission/:id/">
                  <PaymentSubmission/>
                </Route>
                <Route path="/profile">
                  <Profile/>
                </Route>
                <Route path="/categories">
                  <AllCategories/>
                </Route>
                <Route path="/contactus">
                  <ContactUs />
                </Route>
                </>
                :
                <>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route exact path="/">
                  <LandingPage />
                </Route>
                <Route path="/category/:categoryName/">
                  <CategoryProduct/>
                </Route>
                <Route path="/details/:id/">
                  <Productdetails/>
                </Route>
                <Route path="/products">
                  <AllProducts/>
                </Route>
                <Route path="/categories">
                  <AllCategories/>
                </Route>
                <Route path="/faq">
                  <Faq />
                </Route>
                <Route path="/contactus">
                  <ContactUs />
                </Route>
                </>
            }
        </Switch>
       </UserContext.Provider>
    </Router>
    <br/>
<Footer/>

    
        </>
    )
}
export default App;