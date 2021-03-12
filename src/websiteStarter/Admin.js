import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/adminStyle.js";
import bgImage from '../assets/img/sidebarbcg.jpeg'
import { Switch, Route, Redirect} from "react-router-dom";
import adminroutes from './AdminRoutes'
import logo from '../assets/img/logo.png'
import Sidebar from "components/SideBar/Sidebar.js";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Navbar from "components/Navbars/Navbar.js";
import image from "../assets/img/simplebcg.jpg"

let ps;

const useStyles = makeStyles(styles);

const switchRoutes = (
  <Switch>
    {adminroutes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            key={key}
            path={prop.layout + prop.path}
            component={prop.component}
          
          />
        );
      }
      return null;
    })}
     <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

export default function Admin({ ...rest }) {

  const classes = useStyles();
  const mainPanel = React.createRef();
 //state and functions
 const [color] = React.useState("blue");
 const [mobileOpen, setMobileOpen] = React.useState(false);

const handleDrawerToggle = () => {
  setMobileOpen(!mobileOpen);
};

const resizeFunction = () => {
  if (window.innerWidth >= 960) {
    setMobileOpen(false);
  }
};

// initialize and destroy the PerfectScrollbar plugin
React.useEffect(() => {
  if (navigator.platform.indexOf("Win") > -1) {
    ps = new PerfectScrollbar(mainPanel.current, {
      suppressScrollX: true,
      suppressScrollY: false
    });
    document.body.style.overflow = "hidden";
  }
  window.addEventListener("resize", resizeFunction);
  // Specify how to clean up after this effect:
  return function cleanup() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", resizeFunction);
  };
}, [mainPanel]);

  return (
    <div >
      <h2 style={{textAlign:"center",justifyContent:"center", fontFamily:"'Amita',cursive"}}>ADMIN DASHBOARD</h2>
      <div className={classes.wrapper}>
      <Sidebar
        routes={adminroutes}
        logoText={"CLASSIQUE BAGS"}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}
      style={{
        backgroundImage:"url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition:"top center"
        }}>
        
      <Navbar
          routes={adminroutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
         <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <br/><br/> <br/><br/>
        </div>
      </div>
  </div>
  
  );
}
