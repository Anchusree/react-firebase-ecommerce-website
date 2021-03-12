
import { container, title } from "assets/jss/material-kit-react.js";

const landingPageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "white",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "450px",
    width: "450px",
  },
  control: {
    padding: 5
  },

  imgDescription:{
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  color: "red",
  opacity: 0
  },
  middle:{
    transition: ".5s ease",
    opacity: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
    textAlign: "center",
    "&:hover":{
      opacity:1
  },
  },
  image:{
    opacity:1,
    display:"block",
    transition: ".5s ease",
    backfaceVisibility: "hidden",
    transitition: ".1s ease-in-out",
    "&:hover":{
        transform:"scale(1.05)",
        opacity:"0.5"
    },
    categoryText:{
      backgroundColor: "#4CAF50",
      color: "white",
      fontSize: "18px",
      padding: "16px 32px",
      "&:hover":{
        color: "#ed1212",
        opacity:"0.3"
      }
    },
    categoryContainer:{
      position: "relative",
      width: "50%",
      
    }

  }
};

export default landingPageStyle;
