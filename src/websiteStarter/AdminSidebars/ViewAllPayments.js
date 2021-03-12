import GridContainer from 'components/Grid/GridContainer'
import React, { useEffect, useState} from 'react';
//import UserContext from 'UserContext'
import GridItem from "components/Grid/GridItem";
import { Slide,TablePagination } from '@material-ui/core';
import "firebase/storage"
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import { makeStyles } from "@material-ui/core/styles";
import db from 'db';
import styles from "assets/jss/material-kit-react/views/dashboardStyles.js";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Store from "@material-ui/icons/Store";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import DateRange from "@material-ui/icons/DateRange";


const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
 });
 Transition.displayName = "Transition";
export default function ViewAllPayments(){

    const classes = useStyles();
    //const { user } = useContext(UserContext)

   
    //to get payment by user
    const [payment, setPayment] = useState([])
    useEffect(()=>db.Payment.listenAll(setPayment),[])



    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage,payment.length - page * rowsPerPage)

    //to get the total profit 
    const stars = []
     payment.map(rate => (
       stars.push(rate.amount)
    ))
    stars.forEach((rating,index,array)=>{array[index] = Number(rating) })
 
    const alltotal = stars.reduce((total,item)=> total + item,0).toFixed(2)
  
    
    return(
        <>
        <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader >
              <CardIcon color="success">
                <Store />
              </CardIcon>
           
            </CardHeader>
            <CardBody>
            <h2 className={classes.cardCategory}>TOTAL AMOUNT</h2>
              <h3 className={classes.cardTitle}>QAR {alltotal}</h3>
            </CardBody>
            <CardFooter>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        </GridContainer>
        <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
     
        <CustomTabs
        headerColor="info"
        tabs={[
        {
        tabName: `All Payments (${payment.length})`,
        tabContent: (
       <>
       
        <Table aria-label="simple table">
            <Thead>
                <Tr>
                    <Th>PAYMENT ID</Th>
                    <Th>CARD HOLDER</Th>
                    <Th>CARD NUMBER</Th>
                    <Th>AMOUNT</Th>
                    <Th>PAYMENT DATE</Th>
                    <Th>USERID</Th>
                </Tr>
            </Thead>
            <Tbody>
            {
              payment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                 pay =>
          
           <Tr key={pay.id}>
            <Td  style={{fontFamily:"fangsong"}}>{pay.id} </Td>
            <Td  style={{fontFamily:"fangsong"}}>{pay.cardName} </Td>
            <Td  style={{fontFamily:"fangsong"}}>*****{pay.cardNumber.substr(-4)} </Td>
            <Td  style={{fontFamily:"fangsong"}}>{pay.amount}</Td>
            <Td  style={{fontFamily:"fangsong"}}>{pay.paymentDate}</Td>
            <Td  style={{fontFamily:"fangsong"}}>{pay.userId}</Td>
          </Tr>
             )
            }
         
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
      count={payment.length}
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