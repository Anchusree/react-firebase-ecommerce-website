import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import db from 'db'
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
//import UserContext from 'UserContext';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import TablePagination from '@material-ui/core/TablePagination'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import CustomInput from "components/CustomInput/CustomInput.js";
import Slide from "@material-ui/core/Slide";
import { IconButton } from "@material-ui/core";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


export default function ManageFAQ() {
    //const { user } = useContext(UserContext)

    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    useEffect(() => {
        const clear = setTimeout(() => setCardAnimation(""), 700)
        return () => clearTimeout(clear) // function that cancels the timeout
    }, [])
    
    const classes = useStyles();

    //for dialog
    const [classicModal, setClassicModal] = React.useState(false);

    const [faqId , setFaqId] = useState("")
    const [Iuser , setIuser] = useState("")
    const [Iquestion , setquestion] = useState("")
    const [Ianswer , setanswer] = useState("")
    //const [Istatus , setstatus] = useState("")


    const remove = async (  questionId) => {
        await db.Faq.removequestion(questionId)
      }
   
    const save = async() =>{
             await db.Faq.updatefaq(faqId,{question:Iquestion, status : "answerd"  , answer : Ianswer}) 
            setClassicModal(false)
     }
 
    const edit =(faq)=> {
        setClassicModal(true)
        setquestion(faq.question)
        setIuser(faq.userId)
        setFaqId(faq.id)
        console.log(Iuser)
    }

    const [faq, setfaq] = useState([])
    useEffect(() => db.Faq.listenAll(setfaq), [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage,faq.length - page * rowsPerPage)

    const valid = () =>
    Ianswer !== "" 


    return (
        <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
     
        <CustomTabs
        headerColor="primary"
        tabs={[
        {
        tabName: `All FAQs (${faq.length})`,
        tabContent: (
        <div className={classes.textCenter}>

        <GridItem xs={12} sm={12} md={12}>
      
        <Card className={classes[cardAnimaton]}>
    
        <Table aria-label="simple table">
            <Thead>
                <Tr>
                    <Th>Faq Id</Th>
                    <Th>Question</Th>
                    <Th>Answer</Th>
                    <Th>status</Th>
                    <Th>Actions</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
              {
              
           faq.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((faq,index)=>

           <Tr key={faq.id}>
            <Td style={{fontFamily:"sans-Serif"}}>{faq.id} </Td>
            <Td style={{fontFamily:"sans-Serif"}}>{faq.question} </Td>
            <Td style={{fontFamily:"sans-Serif"}}>{faq.answer} </Td>
            <Td style={{fontFamily:"sans-Serif"}}>{faq.status} </Td>
          <Td>
          <Button variant="contained" color="primary" onClick={() => edit(faq)}>Add / update</Button>
          <Button variant="contained" color="primary" onClick={() => remove(faq.id)}>X</Button>
          </Td>
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
      count={faq.length}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      color="warning"
    />
        </GridItem>
        </div>
        ) }
    ]}
    />
   </GridItem>

   {/* Diaglog box for edit faq */}
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
                    <h4 className={classes.modalTitle}>Provide Answer</h4>
                </DialogTitle>
                <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                >
                <br/>
                <CustomInput
                        labelText="Answer"
                        id="question"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: event => setanswer(event.target.value),
                            value: Ianswer,
                            type: "text"
                        }}
                    />
                    <br/>
                </DialogContent>
               <DialogActions className={classes.modalFooter}>
                    <Button
                        onClick={() => setClassicModal(false)}
                        color="primary"
                        simple
                    >
                        Cancel
                    </Button>
                    <Button color="success" simple disabled={!valid()} onClick={save} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog> 
  
  
  </GridContainer> 

  
    )

}







