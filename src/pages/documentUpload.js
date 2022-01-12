import React, { useState, useEffect, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles,createTheme, MuiThemeProvider  } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import newlogo from "../assets/newlogo.png";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import image from "../assets/image.gif";
import DescriptionIcon from "@material-ui/icons/Description";
import { CircularProgress } from '@material-ui/core';
import validators from "../utils/Validators";
import {toastr} from 'react-redux-toastr'
import swal from 'sweetalert';









const getMuiTheme = createTheme({
    palette: {
      secondary: { main: "#1a1a1a" },
      primary: { main: "#fe0000" },
    },
    overrides: {
      MuiToolbar: {
        regular: {
          justifyContent: "space-between",
        },
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      transition:'all easein 1s', 
      display: "flex",
      alignItems:"center",
      justifyContent:"center"
    },
    papers:{
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      transition:'all easein 1s', 
      [theme.breakpoints.only('xs')]:{
       marginTop:'0px !important',
       fontSize:'9px',
       padding: '0px',
      }
    },
    ApplyHereBtn: {
      textTransform: "capitalize",
    },
    forms: {
      margin: "30px",
    },
    homePage: {
      transition:'all easein 1s',
      [theme.breakpoints.down("xs")]: {
        flexWrap: "wrap",
      },
    },
    grids: {
       marginRight: "20px", 
       transition:'all easein 1s',
      [theme.breakpoints.only("xs")]: {
        marginRight: "0px !important",
     
      },
    },
    theImage:{
      [theme.breakpoints.only("xs")]:{
        width:'300px',
        height:'auto'
     
      },
    },
    applyNow:{
      marginBottom:'10px'
    },
    buttonUploadPhoto:{
      [theme.breakpoints.only('xs')]:{
        padding:'10px',
        marginBottom:'10px'
      },
    },
    formText:{
      [theme.breakpoints.only('xs')]:{
       fontSize:'1.4em'
      },
    },
    programText:{
      [theme.breakpoints.only('xs')]:{
        fontSize:'1em'
      },
    },
    cvformatError:{
      color:'#fe0000',
      [theme.breakpoints.only('xs')]:{
        fontSize:'1em'
      },
    },
    Logo:{
      '&:hover':{
        cursor:'pointer'
      }
    },
   
    
  }));

const DocumentUpload = props => {
    const classes = useStyles();
    const [openCVSection, setOpenCVSection] = useState(false);
    const [fileCV, setFileCV] = useState(null);
    const [CVName, setCVName] = useState("");
    const[cvFormatMsg, setCvFormatMsg]=useState("");
    const[submitLoader, setSubmitLoader]= useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [disabled,setDisabled] = useState(true)

    const [generalErrorMsg,setGeneralErrorMsg]=useState("");


    
  const initialFormValues = {
    registrationCode: "",
  }

  const [formValues, setFormValues] = useState(initialFormValues);
 
  const initialFormState = {

    registrationCodeError: false,
    registrationCodeErrorMsg: "",
    uploadCVError: false,
    uploadCVErrorMsg: "",

}
const [formStates, setFormStates] = React.useState(initialFormState);


  const SetIsRequiredError = (
    value,
    stateError,
    stateErrorMsg,
    len = 1,
    errorMsg = "Field is required",
    max = 0,
    select = false
  ) => {
    if (!validators.isRequired(value, len, max, select)) {
      setFormStates(prevState => [{
        ...prevState,
        [stateError]: true,
        [stateErrorMsg]: errorMsg,
      }]);
      return false;
    }

    setFormStates({ ...formStates, [stateError]: false, [stateErrorMsg]: "" });
    return true;
  };

  const registrationCodeHandler = (e) => {
   
    if (e) {
      let code = e.target.value;
      
      e.preventDefault();

      setFormValues({ ...formValues, registrationCode: code });
      return SetIsRequiredError(code, "registrationCodeError", "registrationCodeErrorMsg");
    }
  };

 


    useEffect(() => {
        if (fileCV !== null && fileCV !== undefined) {
          setCVName(fileCV.name);
          setOpenCVSection(true);
        }
    
        return () => {
          setCVName("");
          setOpenCVSection(false);
        };
      }, [fileCV]);

      useEffect(() => {

        if(formValues.registrationCode !== "" && fileCV !== null){
            setDisabled(false)

        }
    

      }, [formValues.registrationCode, fileCV])


      const registerHandler = () => {
          debugger
        setSubmitLoader(true);
        setGeneralErrorMsg('');
        let formData = new FormData();
        formData.append("registrationCode", formValues.registrationCode);
        formData.append("resumeFilePath", fileCV);
    
        
        if(fileCV === null){
          setSubmitLoader(false);
          setGeneralErrorMsg('*All necessary documents must be uploaded');
          return true
        }
        if (
          (formValues.registrationCode !== "" )
        ) {
         
    
          axios.post(`https://www.waeconline.org.ng/JMTechAPI/api/Applicant/UploadCV`,formData)
            .then(function (response) {
         
                console.log(response.data) 

                if(response){
                    setIsSubmitted(true);
                    setSubmitLoader(false);
                    toastFunctionSuccess();

                }else{

               

                }
       
              
            })
            .catch(function (error) {
                if (error.response.status === 404) {
                    console.log(error.response.status);
                    setIsSubmitted(false);
                    setSubmitLoader(false)
                    toastFunctionError()
                }
            })
            .then(function () {
             
             
            });
           
        
         
        } else {
          setSubmitLoader(false);
          setGeneralErrorMsg('*All fields except are required')
        }
    
        
      };

      const toastFunctionError = () =>{swal("Oops!", "Something went wrong! We couldnt submit your details Please try check your Registration Code and ensure your CV is not more that 1MB ", "error")}
      const toastFunctionSuccess = () =>{swal("Success!", "Your details was successfully submitted", "success")}




      const validateCV = (e) =>{
        setCVName(null)
        setFileCV(null);
        const NewCV = e.target.files[0];
        if(NewCV  && NewCV != null){
              if (!NewCV.name.match(/\.(pdf|doc|docx)$/)) {
                setCvFormatMsg("CV format must be in pdf, doc or docx")
                return false;
              }else{
                setCvFormatMsg("")
              }
              if (NewCV.size > 1024000) {
                setCvFormatMsg("File too large", "Size must be less than one megabyte" );
                return false;
              }else{
                setCvFormatMsg("")
              }
           setFileCV(NewCV);
           setCVName(URL.createObjectURL(NewCV))
        }else{
            setFileCV(null)
        }
      }
      const onInputCVChange = (e) => {
       validateCV(e);
      };

    return(
        <React.Fragment>
            <MuiThemeProvider theme={getMuiTheme}>
                <AppBar
                    position="sticky"
                    style={{
                        backgroundColor: "#fff",
                        height: "90px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Toolbar>
                        <img className={classes.Logo}  src={newlogo} alt="JM Tech Centre" width="130px" height="70px" />
                    </Toolbar>
                </AppBar>
                <Toolbar id="back-to-top-anchor" />
                <Container>
                    <Box my={2}>
                        <Grid container spacing={3}>
                            <Grid style={{ border: "1px solid #dddddd" }} id="forms" item xs={12} sm={12}>
                            <Paper className={classes.paper}>
                                 
                                        <img className={classes.theImage} src={image} alt="Home Page"  width="200px" height="200px" />
                                            {
                                                isSubmitted === true ? (
                                                    
                                                    <h4 className={classes.formText}>
                                                   your CV was successfully submitted
                                                </h4>

                                                ):(
                                                    
                                                    <div>
                                                    <h4 className={classes.formText}>
                                                        CV Upload For Microsoft Skilling Initiative Application
                                                    </h4>
                                                    
                                                    <h6 style={{ fontStyle: "italic" }}><span style={{ color: "#fe000067" }}>Note: </span>All fields are required and CV should not more than 1MB</h6>
                
                                                    <div style = {{display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1rem"}}>
                
                                                    <TextField
                                                            style = {{marginRight:"1rem"}}
                                                            color="secondary"
                                                            id="outlined-disabled"
                                                            label="Registration Code"
                                                             value={formValues.registrationCode}
                                                             error={formStates.registrationCodeError}
                                                            helperText={formStates.registrationCodeErrorMsg}
                                                             onChange={(event) => {
                                                                registrationCodeHandler(event);
                                                            }}
                                                            variant="outlined"
                                                        />
                                                        <br />
                
                                                        <div style = {{display:"block" }}>
                
                                                                <Button
                                
                                                                    disableElevation
                                                                    variant="contained"
                                                                    component="label"
                                                                    color="secondary"
                                                                    startIcon={<CloudUploadIcon />}
                                                                    style = {{marginBottom : ".5rem", marginRight:"1rem"}}
                                                                // style={{ backgroundColor: 'transparent', color: "white", border: "none" }}
                                                                >
                                                                    <small>Upload CV</small>
                                                                    <input
                                                                        
                                                                        type="file"
                                                                        hidden
                                                                        onChange={onInputCVChange}
                                                                        accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                    />
                                                                    {/* <label accept="/*"></label> */}
                                                                </Button>
                
                                                                <span className={classes.cvformatError}>{cvFormatMsg}</span>
                                                                {openCVSection ? (
                                                                    <Grid item xs={12}>
                
                
                                                                        <span style={{ padding: '5px' }}><DescriptionIcon /> <small> {CVName} </small></span>
                
                
                                                                    </Grid>
                                                                ) : (
                                                                    ""
                                                                )}
                
                                                            </div>
                
                                                           
                
                                                    </div>
                
                                                                    
                
                                                    <Button
                                                            onClick={registerHandler}
                                                            disableElevation
                                                            // style={{ flexGrow: "1", width:"100%", backgroundColor:"green" ,color:"white" }}
                                                            variant="contained"
                                                            color="secondary"
                                                            disabled = {disabled}
                                                        >
                                                            {submitLoader === true ? <CircularProgress /> :
                                                                'Submit'}
                                                         
                                                        </Button>
                                                      
                
                                                   
                                                    </div>            


                                                )
                                            }
                                  
                            </Paper>
                            </Grid>
                        </Grid>
                    </Box>

                </Container>
            </MuiThemeProvider>
        </React.Fragment>
    )


}


export default DocumentUpload;