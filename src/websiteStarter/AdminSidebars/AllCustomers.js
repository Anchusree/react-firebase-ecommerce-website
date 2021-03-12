import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import db from 'db';
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
//import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import "firebase/storage"
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Slide from "@material-ui/core/Slide";
import Card from "components/Card/Card.js";
import TablePagination from '@material-ui/core/TablePagination'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
 });
 Transition.displayName = "Transition";
 
const useStyles = makeStyles(styles);

const usenewstyle=makeStyles((theme) => ({
  thstyle:{
    fontSize:"20px",
    fontWeight:"90px"
    
  },
  tdstyle: {
   fontSize:"20px",
   color:"black",
   fontWeight:"900px",
   fontFamily:"sanserif"
  }
}));



export default function AllCustomers(){

    
    const classes = useStyles();
    const newclass = usenewstyle();

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);

    const [customers, setAllCustomers] = useState([])
    useEffect(() => db.Users.listenToCustomerCount(setAllCustomers,"user"), [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage,customers.length - page * rowsPerPage)

    return(
        <>
         <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
        headerColor="danger"
        tabs={[
        {
        tabName: `All Customers (${customers.length})`,
        tabContent: (
        <div className={classes.textCenter}>
        <GridItem xs={12} sm={12} md={12}>
        <Card className={classes[cardAnimaton]}>
      
        <Table aria-label="simple table">
            <Thead>
                <Tr>
                  
                    <Th className={newclass.thstyle}>Customer Id</Th>
                    <Th className={newclass.thstyle}>Customer Name</Th>
                    <Th className={newclass.thstyle}>Country</Th>
                    <Th className={newclass.thstyle}>Email</Th>
                    <Th className={newclass.thstyle}></Th>
                </Tr>
            </Thead>
            <Tbody>
              { 
           customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer,index)=>
           <Tr key={customer.id}>
            <Td className={newclass.tdstyle}>{customer.id} </Td>
            <Td className={newclass.tdstyle}>{customer.name} </Td>
            <Td className={newclass.tdstyle}>{customer.address} </Td>
            <Td className={newclass.tdstyle}>{customer.email} </Td>
            <Td className={newclass.tdstyle}></Td>
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
      
        </Card>
        <TablePagination
      component="div"
      count={customers.length}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      color="primary"
    />
        </GridItem>
        </div>
        ) }
    ]}
    />
  
   </GridItem>
  </GridContainer> 

        </>
    )
}