import React, { useEffect, useState } from 'react';
import db from 'db';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
//import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import "firebase/storage"
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import TablePagination from '@material-ui/core/TablePagination'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { FormControl, InputLabel, MenuItem, Select,Button } from "@material-ui/core";
import StarRatings from 'react-star-ratings';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function ViewAllComments(){
    //all products all comments
    const [comments, setComments] = useState([])
    useEffect(() => db.Products.Review.listenToAllProductsAllReviews(setComments), [])

    //for the table setup
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage,comments.length - page * rowsPerPage)

     //function for removing the duplicate prodruct id  value from dropdown list
     function getUnique(arr, comp) {
        const unique =  arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i)
             // eliminate the false indexes & return unique objects
               .filter((e) => arr[e]).map(e => arr[e]);
        return unique;
        }
              //to search productId
              const [productids, setAllProductId] = useState("")
              const [searchProductResults, setProductResults] = useState([]);
              const handleProductChange = event => {
                    setAllProductId(event.target.value);
                };
              useEffect(() => {
                  const results = comments.filter(function(result) {
                      return result.productId === productids
                  })
                  setProductResults(results);
              }, [comments,productids]);
              const uniqueproducts = getUnique(comments,'productId')

              //to search rating 
              const [allratings, setAllRatings] = useState("")
              const [searchRatingResults, setRatingResults] = useState([]);
              const handleRatingChange = event => {
                    setAllRatings(event.target.value);
                };
              useEffect(() => {
                  const results = comments.filter(function(result) {
                      return result.rating === allratings
                  })
                  setRatingResults(results);
              }, [comments,allratings]);
              const uniquerating = getUnique(comments,'rating')

              //to search review dates
              const [allratingdates, setAllRatingDates] = useState('')
              const [searchRatingDatesResults, setRatingDatesResults] = useState([]);
              const handleRatingDateChange = event => {
                    setAllRatingDates(event.target.value);
                };
              useEffect(() => {
                  const results = comments.filter(function(result) {
                      return result.reviewDate === allratingdates
                  })
                  setRatingDatesResults(results);
              }, [comments,allratingdates]);
              const uniqueratingdate = getUnique(comments,'reviewDate')

               //removes the product
  const remove = (productId, reviewId) => {
    db.Products.Review.removeProductReview(productId, reviewId)
  }
    

    return(
        <>
         <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
     
        <CustomTabs
        headerColor="info"
        tabs={[
        {
        tabName: `All Product Reviews (${comments.length})`,
        tabContent: (
       <>
        <FormControl>
              <InputLabel id="category">Sort By ProductId</InputLabel>
              <Select
                labelId="Sort by Product"
                id="allprducts"
                value={productids}
                style={{ width: "200px" }}
                onChange={handleProductChange}
              >
                <MenuItem value={""}>All</MenuItem>
                {
                  uniqueproducts.map(item => <MenuItem key={item.id} value={item.productId}>
                    {item.productId}
                  </MenuItem>)
                }
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="category">Sort By Rating</InputLabel>
              <Select
                labelId="Sort by Rating"
                id="allprductratings"
                value={allratings}
                style={{ width: "200px" }}
                onChange={handleRatingChange}
              >
                <MenuItem value={""}>All</MenuItem>
                {
                  uniquerating.map(item => <MenuItem key={item.id} value={item.rating}>
                    {item.rating}
                  </MenuItem>)
                }
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="category">Sort By Review Date</InputLabel>
              <Select
                labelId="Sort by Rating"
                id="allprductratingdates"
                value={allratingdates}
                style={{ width: "200px" }}
                onChange={handleRatingDateChange}
              >
                <MenuItem value={''}>All</MenuItem>
                {
                  uniqueratingdate.map(item => <MenuItem key={item.id} value={item.reviewDate}>
                    {item.reviewDate}
                  </MenuItem>)
                }
              </Select>
            </FormControl>
   
            <hr/>
       
        <Table aria-label="simple table">
            <Thead>
                <Tr>
                    <Th>REVIEW ID</Th>
                    <Th>CUSTOMERID</Th>
                    <Th>PRODUCT ID</Th>
                    <Th>RATING</Th>
                    <Th>COMMENTS</Th>
                    <Th>REVIEWDATE</Th>
                </Tr>
            </Thead>
            <Tbody>
            {
                productids
                ?

            searchProductResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
            item =>
           <Tr key={item.id}>
            <Td style={{fontFamily:"fangsong"}} >{item.id} </Td>
            <Td style={{fontFamily:"fangsong"}}>{item.customerId} </Td>
            <Td  style={{fontFamily:"fangsong"}}>{item.productId} </Td>
            <Td  style={{fontFamily:"fangsong"}}>
                <StarRatings
                           rating={item.rating}
                          starRatedColor="blue"
                          numberOfStars={5}
                          name='rating'
                          starDimension="15px"
                /> </Td>
             <Td  style={{fontFamily:"fangsong"}}>{item.description} </Td>
            <Td  style={{fontFamily:"fangsong"}}>{item.reviewDate} </Td>
            <Td style={{fontFamily:"fangsong"}}><Button onClick={() => remove(item.productId, item.id)}><DeleteForeverIcon/></Button></Td>
          </Tr>
             )
             :
             allratings
             ?

         searchRatingResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
         item =>
        <Tr key={item.id}>
         <Td  style={{fontFamily:"fangsong"}}>{item.id} </Td>
         <Td  style={{fontFamily:"fangsong"}}>{item.customerId} </Td>
         <Td  style={{fontFamily:"fangsong"}}>{item.productId} </Td>
         <Td> <StarRatings
                           rating={item.rating}
                          starRatedColor="blue"
                          numberOfStars={5}
                          name='rating'
                          starDimension="15px"
                /> </Td>
        <Td style={{fontFamily:"fangsong"}}>{item.description} </Td>
         <Td  style={{fontFamily:"fangsong"}}>{item.reviewDate} </Td>
         <Td  style={{fontFamily:"fangsong"}}><Button onClick={() => remove(item.productId, item.id)}><DeleteForeverIcon/></Button></Td>
       </Tr>
          )
          :
          allratingdates
          ?

      searchRatingDatesResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
      item =>
     <Tr key={item.id}>
      <Td  style={{fontFamily:"fangsong"}}>{item.id} </Td>
      <Td  style={{fontFamily:"fangsong"}}>{item.customerId} </Td>
      <Td  style={{fontFamily:"fangsong"}}>{item.productId} </Td>
      <Td  style={{fontFamily:"fangsong"}}> <StarRatings
                        rating={item.rating}
                       starRatedColor="blue"
                       numberOfStars={5}
                       name='rating'
                       starDimension="15px"
             /> </Td>
    <Td  style={{fontFamily:"fangsong"}}>{item.description} </Td>
      <Td  style={{fontFamily:"fangsong"}}>{item.reviewDate} </Td>
      <Td  style={{fontFamily:"fangsong"}}><Button onClick={() => remove(item.productId, item.id)}><DeleteForeverIcon/></Button></Td>
    </Tr>
       )
          :
          comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
           item =>
          <Tr key={item.id}>
           <Td  style={{fontFamily:"fangsong"}}>{item.id} </Td>
           <Td  style={{fontFamily:"fangsong"}}>{item.customerId} </Td>
           <Td  style={{fontFamily:"fangsong"}}>{item.productId} </Td>
           <Td  style={{fontFamily:"fangsong"}}> <StarRatings
                           rating={item.rating}
                          starRatedColor="blue"
                          numberOfStars={5}
                          name='rating'
                          starDimension="15px"
                /> </Td>
            <Td  style={{fontFamily:"fangsong"}}>{item.description} </Td>
           <Td  style={{fontFamily:"fangsong"}}>{item.reviewDate} </Td>
           <Td  style={{fontFamily:"fangsong"}}><Button onClick={() => remove(item.productId, item.id)}><DeleteForeverIcon/></Button></Td>
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
    <TablePagination
      component="div"
      count={comments.length}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      color="primary"
    />
</>
        ) }
    ]}
    />
   </GridItem>
  </GridContainer> 


        </>
    )
}