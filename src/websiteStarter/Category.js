import React,{useState, useEffect} from "react";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import categorystyle from "./Css/homepage.module.css"

import db from 'db';

const useStyles =  makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    }
  }));
  

export default function Category({id,categoryName,categoryDescription,categoryImage,select }){

    const classes = useStyles();
    const [text, setText] = useState({display: 'none',border: '1px solid gray'});

       //listen to one Category
   const [categoryproduct, setCategoryProduct] = useState({ id: "" })
   useEffect(() => db.Category.listenOne(setCategoryProduct, id), [id])

    return(
      <>
            <div className={classes.categoryContainer}> 
            <div
            onMouseEnter={e => {
                setText({display: 'block'});
            }}
            onMouseLeave={e => {
                setText({display: 'none'})
            }}>
              <div className={categorystyle.container}>
            <Button component={Link} to={`/category/${categoryproduct.categoryName}`}>
                <img  width="400px" height="400px" alt="ctgry" className={categorystyle.image} src={categoryImage}  />
                <div className={categorystyle.overlay} style={text}>{categoryName}
                <p>{categoryDescription}</p>
                </div>
            </Button>
              </div>
            </div>
        </div>   
        </>
    )
}