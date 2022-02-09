import React, { useContext, useState } from "react";
import { withStyles,makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { TextField } from "@material-ui/core";
import { AuthContext } from "./context/AuthContext";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) =>({
    submitBtn:{
        transition:'all 0.5s',
        '&:hover':{
            paddingRight:'30px',
            paddingLeft:"30px",
            backgroundColor:'#fe0000 !important',
            color:'#FFF',
            transition:'0.5s'
        },
    },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AuthenticationForm(props) {
    debugger
    const { open, handleClose, setIsAuth, isAuth } = props
    const classes = useStyles();
    const[toPage,setToPage]=useState("");
    const initialFormValue = {
        initialtoken:"1A2B5E",
        token:""
    };
    const [formValue, setFormValue] = useState(initialFormValue);
    const [tokenError, setTokenError] = useState("");

    // const {setIsAuth} = useContext(AuthContext);
 

    const submitBtnHandler = () =>{
        
        if(formValue.initialtoken !== formValue.token){
            notify();
            setToPage("");
           
        }
    }
    const tokenHandler = (e)=>{
        let tokenValue = e.target.value;
      if(e){
          e.preventDefault();
          setFormValue({...formValue, token:tokenValue})
          setTokenError("Enter a valid token");
      }
      if(tokenValue === (formValue.initialtoken)){
        // setIsAuth(true)
         setToPage("/applicants");
         setTokenError('Token is valid')
         console.log(isAuth)
        
      }
   
    }
    const notify = () => toast.error("Unrecognised Authentication Token!");


  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Token
        </DialogTitle>
        <DialogContent dividers>
          <TextField
          type="password"
            style={{width:500}}
            color="secondary"
            label="Enter a token"
            helperText={tokenError}
            variant="outlined"
            onChange={(event)=>{tokenHandler(event)}}
            fullWidth
          ></TextField>
        
        </DialogContent>
        <DialogActions>
        <Link to={toPage} style={{textDecoration:'none'}}>
        <Button className={classes.submitBtn}onClick={submitBtnHandler}style={{backgroundColor:"#FFD6D6",}} color="primary">
            SUBMIT
          </Button>
         </Link>
         <ToastContainer  />
        </DialogActions>
      </Dialog>

             
    </div>
  );
}
