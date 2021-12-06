import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import validators from "./utils/Validators";
import Toolbar from "@material-ui/core/Toolbar";
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles,createTheme, MuiThemeProvider  } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import logo from "./assets/logo.png";
import image from "./assets/image.gif";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DescriptionIcon from "@material-ui/icons/Description";
import { CircularProgress } from '@material-ui/core';

// axios.defaults.baseURL = "http://jmtechcentre.azurewebsites.net/api/Applicant/";
// axios.defaults.baseURL = "https://www.waeconline.org.ng/JMTechAPI/swagger/index.html";


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
  
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function BackToTop(props) {
  // const dispatch = useDispatch();

  const genders = [
    {
      value: "1",
      label: "Male",
    },
    {
      value: "2",
      label: "Female",
    },
  ];
  const qualifications = [
    {
      value: "HND",
      label: "HND",
    },
    {
      value: "1st Degree",
      label: "1st Degree",
    },
    {
      value: "Master",
      label: "Master",
    },
    {
      value: "PHD",
      label: "PHD",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];
  

  const initialFormValues = {
    userid: "",
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    states: "",
    lga:"",
    city: "",
    cityid: "",
    sex: "",
    highestQualification: "",
    courseOfStudy: "",
    courseChoice: "",
    passport: "",
    cv: "",
  };

  const initialFormState = {
    firstNameError: false,
    firstNameErrorMsg: "",
    lastNameError: false,
    lastNameErrorMsg: "",
    emailAddressError: false,
    emailAddressErrorMsg: "",
    phoneNumberError: false,
    phoneNumberErrorMsg: "",
    stateError: false,
    stateErrorMsg: "",
    lgaError:false,
    lgaErrorMsg:"Select a state before choosing LGA",
    cityError: false,
    cityErrorMsg: "",
    highestQualificationError: false,
    highestQualificationErrorMsg: "",
    courseOfStudyError: false,
    courseOfStudyErrorMsg: "",
    genderError: false,
    genderErrorMsg: "",
    uploadPassportError: false,
    uploadPassportErrorMsg: "",
    uploadCVError: false,
    uploadCVErrorMsg: "",
  }

  const [responseFirstName, setResponseFirstName] = useState("");
  const [responseRegistrationCode, setResponseRegistrationCode] = useState("");
  const [formStates, setFormStates] = React.useState(initialFormState);
  const [lgaDisable, setLgaDisable] = useState(true);
  const[loader,setLoader] = useState(true);
  const[submitLoader, setSubmitLoader]= useState(false);
  const[imageFormatMsg, setImageFormatMsg] = useState("");
  const[cvFormatMsg, setCvFormatMsg]=useState("");
  const [generalErrorMsg,setGeneralErrorMsg]=useState("");
  const [file, setFile] = useState(null);
  const [fileCV, setFileCV] = useState(null);
  const [displayPicture, setDisplayPicture] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [theState, setTheState] = useState([]);
  const[theLga, setTheLga] = useState([]);
  const [disable, setDisable] = useState(true);
  
  // Form Values
  const [formValues, setFormValues] = useState(initialFormValues);

  const [pictureName, setPictureName] = useState("");
  const [CVName, setCVName] = useState("");
  const [openPictureSection, setOpenPictureSection] = useState(false);
  const [openCVSection, setOpenCVSection] = useState(false);
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

  // useEffect(()=>{
  //   const getRepo = async ()=>{
  //     try{
  //       const response = await axios.post('http://jmtechcentre.azurewebsites.net/api/Applicant/GetCoursePrograms');
  //       const myRepo = response.data;
  //       setRepo(myRepo);
  //     }
  //     catch(error){
  //       console.log(error)
  //     }
  //   }
  // },[])

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  const [dataDropDown, setDataDropDown] = useState([]);
  const fetchData = () => {
    axios
      .post(
        `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/GetCoursePrograms`
      )
      .then(function (response) {
        
        // handle success
        setDataDropDown(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // alert('Error occured in loading All Data');
      })
      .then(function () {
        setLoader(false)
      });
  };
  const fetchStates = () => {
    
    axios
      .post(`https://www.waeconline.org.ng/JMTechAPI/api/Applicant/GetStates`)
      .then(function (response) {
        
        // handle success
        setTheState(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // alert('Error occured in loading All Data');
      })
      .then(function () {
        // always executed
      });
  };

  const fetchLGA = (stateIds) => {
    axios
      .post(
        `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/GetLGAByStateId?stateId=${stateIds}`
      )
      .then(function (response) {
        
        // handle success
        setLgaDisable(false)
        setTheLga(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // alert('Error occured in loading All Data');
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    fetchData();
    fetchStates();
  }, []);
  const logoFunction = ()=>{
    var HomePageArea = document.getElementById("HomePage");
    HomePageArea.style = "display:flex";
    var applicationForms = document.getElementById("forms");
    applicationForms.style="display:none";
    CancelBtnHandler();
  }
  const genderHandler = (e) => {
    if (e) {
      let genderValue = e.target.value;
      // let genderName = e.currentTarget.textContent;
      e.preventDefault();

      setFormValues({ ...formValues, sex: genderValue });
      return SetIsRequiredError(genderValue, "genderError", "genderErrorMsg");
    }
  };
  const QualificationHandler = (e) => {
    if (e) {
      let qualificationValue = e.target.value
      // let qualificationName = e.currentTarget.textContent;
      e.preventDefault();

      setFormValues({
        ...formValues,
        highestQualification: qualificationValue,
      });
      return SetIsRequiredError(
        qualificationValue,
        "highestQualificationError",
        "highestQualificationErrorMsg"
      );
    }
  };
  const StateHandler = (e) => {
    
    const stateIds = e.target.value;
    setFormValues({ ...formValues, states: stateIds });
    fetchLGA(stateIds);
  };
  const classes = useStyles();

  const handleChange = (e) => {
    setDisable(false);
    setFormValues({ ...formValues, courseChoice: e.target.value });
    
  };

  const applicationForm = React.useRef();

  const applicationDiv = () => {
   
    if(dataDropDown.length !== [""]){
       var applicationForms = document.getElementById("forms");
    var coursechoice = document.getElementById("CourseChoice");
    var applyhere = document.getElementById("ApplyHereBtn");
    applyhere.style = "display:none";
    coursechoice.style = "display:none";
    applicationForms.style = "display:block";
    // if (!ref.current) return;
    // ref.current.scrollIntoView({ behavior: "smooth" });
    var HomePageArea = document.getElementById("HomePage");
    HomePageArea.style = "display:none";
    setSubmitLoader(false);
    // setFormValues({})
    }
  };
  const submitBtnHandler = () => {
    var HomePageArea = document.getElementById("HomePage");
    var applicationForms = document.getElementById("forms");
    var applyhere = document.getElementById("ApplyHereBtn");
    applyhere.style = "display:block";
    HomePageArea.style = "display:flex";
    applicationForms.style = "display:none";
  }

  const CancelBtnHandler = () => {
    var HomePageArea = document.getElementById("HomePage");
    var applicationForms = document.getElementById("forms");
    var applyhere = document.getElementById("ApplyHereBtn");
    applyhere.style = "display:block";
    HomePageArea.style = "display:flex";
    applicationForms.style = "display:none";
    setDisable(true);
    setFormStates({...initialFormState});
    setFormValues({...initialFormValues});
    setFileCV(null);
    setFile(null)
    setIsSubmitted(false);
    setGeneralErrorMsg('');
    setCvFormatMsg('');
    setImageFormatMsg('');
  };
  const backToHomeHandler = () => {
    var HomePageArea = document.getElementById("HomePage");
    var applicationForms = document.getElementById("forms");
    var applyhere = document.getElementById("ApplyHereBtn");
    applyhere.style = "display:block";
    HomePageArea.style = "display:flex";
    applicationForms.style = "display:none";
    setDisable(true);
    setFormStates({...initialFormState});
    setFormValues({...initialFormValues})
    setIsSubmitted(false);
    setFileCV(null);
    setFile(null)
  };

  const validateImage = (e) =>{
    setDisplayPicture(null)
    setFile(null);
    const NewImage = e.target.files[0];
    if(NewImage  && NewImage !== null){
          if (!NewImage.name.match(/\.(jpg|jpeg|png)$/)) {
            setImageFormatMsg("Image format must be in jpg, jpeg or png")
            return false;
          }else{
            setImageFormatMsg("")
          }
          if (NewImage.size > 1024000) {
          setImageFormatMsg("*File is too large, Size must be less than 1MB" );
            return false;
          }else{
            setImageFormatMsg("")
          }
       setFile(NewImage);
       setDisplayPicture(URL.createObjectURL(NewImage))
    }else{
        setFile(null)
    }
  }

  const passportUploadHandler = (e) => {};

  const onInputChange = (e) => {
    validateImage(e);
  };

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
        setFile(null)
    }
  }
  const onInputCVChange = (e) => {
   validateCV(e);
  };

  useEffect(() => {
    if (file !== null && file !== undefined) {
      setPictureName(file.name);
      setOpenPictureSection(true);
    }

    return () => {
      setPictureName("");
      setOpenPictureSection(false);
    };
  }, [file]);

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

  const applicationDivWithCourse = (ref) => {
    applicationDiv();
    var coursechoice = document.getElementById("CourseChoice");
    coursechoice.style = "display:block";
    var HomePageArea = document.getElementById("HomePage");
    HomePageArea.style = "display:none";
    var applicationForms = document.getElementById("forms");
    applicationForms.style = "display:block";
  };

  const firstNameHandler = (e) => {
    if (e) {
      
      e.preventDefault();
      let firstNameValue = e.target.value;
      setFormValues({ ...formValues, firstName: firstNameValue });
      return SetIsRequiredError(
        firstNameValue,
        "firstNameError",
        "firstNameErrorMsg"
      );
    }
  };
  const middleNameHandler = (e) => {
    if (e) {
      
      e.preventDefault();
      let middleNameValue = e.target.value;
      setFormValues({ ...formValues, middleName: middleNameValue });
    }
  };
  const lastNameHandler = (e) => {
    if (e) {
      
      e.preventDefault();
      let lastNameValue = e.target.value;
      setFormValues({ ...formValues, lastName: lastNameValue });
      return SetIsRequiredError(
        lastNameValue,
        "lastNameError",
        "lastNameErrorMsg"
      );
    }
  };
  const emailAddressHandler = (e) => {
    let emailAddressValue = e.target.value.trim();
    if (e) {
      e.preventDefault();
      setFormValues({ ...formValues, emailAddress: emailAddressValue });
    }

    if (emailAddressValue === "" || emailAddressValue === undefined) {
      setFormStates({
        ...formStates,
        emailAddressError: false,
        emailAddressErrorMsg: "",
      });
      return true;
    }

    if (!validators.isValidEmail(emailAddressValue)) {
      setFormStates({
        ...formStates,
        emailAddressError: true,
        emailAddressErrorMsg:
          "Please enter a valid email or clear your selection",
      });
      return false;
    }

    setFormStates({
      ...formStates,
      emailAddressError: false,
      emailAddressErrorMsg: "",
    });
    return true;
  };
  const phoneNumberHandler = (e) => {
    let phoneNumberValue = e.target.value;   
    if (e) {
      e.preventDefault();
      setFormValues({ ...formValues, phoneNumber: phoneNumberValue });
      if (phoneNumberValue.charAt(0)=== "0") {
        phoneNumberValue = phoneNumberValue.substring(1)
        setFormValues({ ...formValues, phoneNumber: phoneNumberValue });
       
      }else{
        setFormValues({ ...formValues, phoneNumber: phoneNumberValue });
      }
    }
      if (!validators.isPhoneLength(phoneNumberValue)) {
        setFormStates({
          ...formStates,
          phoneNumberError: true,
          phoneNumberErrorMsg:
            "Please enter a valid phone number or clear your selection",
        });
        
        return false;
      }
      setFormStates({
        ...formStates,
        phoneNumberError: false,
        phoneNumberErrorMsg: "",
      });
      return true;
      
     
    
  };
  const lgaHandler = (e) => {
    if (e) {
      
      e.preventDefault();
      let lgaNameValue = e.target.value;
      setFormValues({ ...formValues, lga: lgaNameValue });
      return SetIsRequiredError(lgaNameValue, "lgaError", "lgaErrorMsg");
    }
  };
  const cityHandler = (e) => {
    if (e) {
      
      e.preventDefault();
      let cityNameValue = e.target.value;
      setFormValues({ ...formValues, city: cityNameValue });
    }
  };
  const courseOfStudyHandler = (e) => {
    if (e) {
      
      e.preventDefault();
      let courseOfStudyValue = e.target.value;
      setFormValues({ ...formValues, courseOfStudy: courseOfStudyValue });
      return SetIsRequiredError(
        courseOfStudyValue,
        "courseOfStudyError",
        "courseOfStudyErrorMsg"
      );
    }
  };



  const registerHandler = () => {
    setSubmitLoader(true);
    setGeneralErrorMsg('');
     setIsSubmitted(true);
    let formData = new FormData();
    formData.append("FirstName", formValues.firstName);
    formData.append("LastName", formValues.lastName);
    formData.append("MiddleName", formValues.middleName);
    formData.append("PhoneNumber", formValues.phoneNumber);
    formData.append("StateId", formValues.states);
    formData.append("Gender", formValues.sex);
    formData.append("EmailAddress", formValues.emailAddress);
    formData.append("HighestQualification", formValues.highestQualification);
    formData.append("CourseOfHighestQualification", formValues.courseOfStudy);
    formData.append("CourseofChoiceId", formValues.courseChoice);
    formData.append("LGaId", formValues.lga);
    formData.append("City", formValues.city);
    formData.append("passportFilePath", file);
    formData.append("resumeFilePath", fileCV);

    
    if(file === null || fileCV === null){
      setSubmitLoader(false);
      setGeneralErrorMsg('*All necessary documents must be uploaded');
      return true
    }
    if (
      (formValues.firstName !== "" &&
        formValues.lastName !== "" &&
        formValues.emailAddress !== "" &&
        formValues.phoneNumber !== "" &&
        formValues.states !== "" &&
        formValues.lga !== "" &&
        formValues.highestQualification !== "" &&
        formValues.courseOfStudy !== "" &&
        formValues.sex !== "" &&
        formValues.courseChoice !== "" &&
        formValues.city !== ""
        )
    ) {
     

      axios
        .post(
          `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/RegisterApplicant`,
          formData
        )
        .then(function (response) {
          debugger
          setResponseFirstName(response.data.data.firstName)
          setResponseRegistrationCode(response.data.data.registrationCode)
          setSubmitLoader(false);
          submitBtnHandler();
          isSubmitted(true);
          // setSubmit(response.data.data);
          // setFile(null);
          // setFileCV(null);
          
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
         
         
        });
       
    
     
    } else {
      setSubmitLoader(false);
      setGeneralErrorMsg('*All fields except the middle name are required')
    }

    
  };
  return (
    <React.Fragment>
      <CssBaseline />
      {loader === true ?
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
     
      <CircularProgress color="secondary" />
      </Box>
      :(
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
            <img onClick={logoFunction}src={logo} alt="JM Tech Center" width="130px" height="130px" />
            <Button
              id="ApplyHereBtn"
              onClick={() => applicationDivWithCourse(applicationForm)}
              className={classes.ApplyHereBtn}
              disableElevation
              variant="outlined"
              color="primary"
            >
              Apply Here
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <Container>
          <Box my={2}>
            {[...new Array(1)].map(() => (
              <Grid container spacing={3}>
                <Box
                  className={classes.homePage}
                  id="HomePage"
                  style={{ display: "flex", transition:'all easein 1s' }}
                >
                  <Grid
                    className={classes.grids}
                    item
                    xs={12}
                    sm={6}
                    
                   
                  >
                    <Paper className={classes.papers}>
                      <img className={classes.theImage} src={image} alt="Home Page" />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} >
                    <Paper className={classes.papers}>
                      <h1  style={{ fontSize: "3em", margin:'0px'}}>
                        {isSubmitted === false
                          ? "Welcome to JM Tech Learning Center"
                          : (
                            <>
                          <span style={{color:'#FF5C5C', margin:'5px 15px'}}>Thank you for applying</span>
                            <p style={{fontSize:'25px', margin:'20px 0px', fontWeight:'lighter'}}>Hello {responseFirstName}, your registration code is <b>{responseRegistrationCode}</b></p>
                          </>
                          )}
                      </h1>
                     
                      <h2 style={{margin:'10px', fontSize:'1.3em'}}>{isSubmitted === true ? 'A confirmation mail has been sent to your email':""}</h2>
                      {isSubmitted === false ?
                      (
                        <>
                      <h2>We offer a range of courses</h2>
                     
                      <p style={{ fontStyle: "italic", color: "#949494" }}>
                        Data Science & AI, Cloud Development, Business
                        Application, Backend Software Development, Frontend
                        Software Development, or Cyber Security
                      </p>
                      <FormControl className={classes.margin}>
                        <TextField
                          color="secondary"
                          style={{ width: "100%" }}
                          fullWidth
                          id="outlined-select-currency"
                          select
                          label="Choose a course"
                          value={formValues.courseChoice}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          helperText="Please your course of interest"
                          variant="outlined"
                        >
                          {dataDropDown.map((option) => (
                            <MenuItem
                              key={option.courseId}
                              value={option.courseId}
                            >
                              {option.courseName}
                            </MenuItem>
                          ))}
                        </TextField>
                       
                        <Button
                          className={classes.applyNow}
                          disabled={disable}
                          onClick={() => applicationDiv(applicationForm)}
                          style={{ marginTop: "20px" }}
                          disableElevation
                          variant="contained"
                          color="secondary"
                        >
                          {/* {!loadingForms && <CircularProgress/>} */}
                          {/* {loadingForms && 'Apply Now'}  */}
                         Apply Now
                        </Button>
                      </FormControl>
                      </>
                        )
                        : <Button
                        onClick={backToHomeHandler}
                        style={{ margin: "20px 0px", textTransform:'capitalize' }}
                        disableElevation
                        variant="contained"
                        color="secondary"
                      >
                        {/* {!loadingForms && <CircularProgress/>} */}
                        {/* {loadingForms && 'Apply Now'}  */}
                       Go Back to Home
                      </Button>}
                    </Paper>
                  </Grid>
                </Box>

                <Grid
                  style={{ display: "none" }}
                  id="forms"
                  item
                  xs={12}
                  sm={12}
                >
                  <Paper className={classes.paper}>
                    <FormControl
                      className={classes.forms}
                      noValidate
                      autoComplete="off"
                    >
                      <h2 className={classes.formText}>
                        Application Form For Microsoft Skilling Initiative
                      </h2>
                      <h2 className={classes.programText}style={{ color: "#545454" }}>
                        Program:{" "}
                        <span>
                          {formValues.courseChoice === 1
                            ? "Data Science & AI"
                            : formValues.courseChoice === 2
                            ? "Cloud Development"
                            : formValues.courseChoice === 3
                            ? "Business Application"
                            : formValues.courseChoice === 4
                            ? "Backend Software Development"
                            : formValues.courseChoice === 5
                            ? "Frontend Software Development"
                            : formValues.courseChoice === 6
                            ? "Cyber Security"
                            : formValues.courseChoice === 7
                            ? "Data Science"
                            : "Choose a course"}
                        </span>
                      </h2>
                      <h4 style={{ fontStyle: "italic" }}>
                        <span style={{ color: "#fe000067" }}>Note: </span>All fields
                        except the Middle Name are required
                      </h4>
                      <div>
                      <span style={{color:'#fe0000'}}>{imageFormatMsg}</span>
                      {openPictureSection?(
                      <img
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "20%",
                            border:'4px solid #4c4c4c'
                          }}
                          src={displayPicture}
                          alt={pictureName}
                        />):""}
                        {/* {openPictureSection ? (
                          <Grid item xs={12}>
                            <DescriptionIcon /> <small> {pictureName} </small>
                          </Grid>
                        ) : (
                          ""
                        )} */}
                          <span className={classes.cvformatError}>{cvFormatMsg}</span>
                          {openCVSection ? (
                          <Grid item xs={12}>
                            <div style={{backgroundColor:'#949494', display:"flex", 
                            justifyContent:'flex-start', padding:'0px 0px',
                            borderRadius:'5px', color:'#fff', marginBottom:'10px'
                            }}>
                            <span style={{margin:'0px 10px 0px 0px', backgroundColor:'#4c4c4c',
                             borderRadius:'5px 0px 0px 5px', padding:'10px 20px',
                          }}>CV File :</span>
                            <span style={{padding:'5px'}}><DescriptionIcon /> <small> {CVName} </small></span>
                            </div>
              
                          </Grid>
                        ) : (
                          ""
                        )}
                      </div>
                     
                      <div style={{ marginBottom: "20px" }}>
                        
                        <Button
                        className={classes.buttonUploadPhoto}
                          onClick={passportUploadHandler()}
                          disableElevation
                          style={{ marginRight: "15px" }}
                          variant="contained"
                          component="label"
                          color="primary"
                          startIcon={<PhotoCameraIcon />}
                          // style={{ backgroundColor: 'transparent', color: "white", border: "none" }}
                        >
                          <small>Upload Passport Photo</small>
                          <input
                            type="file"
                          
                            hidden
                            onChange={onInputChange}
                            accept="image/x-png,image/gif,image/jpeg" 
                          />
                          {/* <label accept="image/*"></label> */}
                        </Button>
                        
                        <Button
                          disableElevation
                          variant="contained"
                          component="label"
                          color="secondary"
                          startIcon={<CloudUploadIcon />}
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

                      
                      </div>
                      <div id="CourseChoice" style={{ display: "none" }}>
                        <TextField
                          color="secondary"
                          style={{
                            width: "100%",
                            marginBottom: "20px",
                            textAlign: "left",
                          }}
                          fullWidth
                          id="outlined-select-currency"
                          select
                          label="Choose a course"
                          value={formValues.courseChoice}
                          onChange={handleChange}
                          variant="outlined"
                        >
                          {dataDropDown.map((option) => (
                            <MenuItem
                              key={option.courseId}
                              value={option.courseId}
                            >
                              {option.courseName}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>

                      <TextField
                        
                        color="secondary"
                        id="outlined-disabled"
                        label="First Name"
                        value={toTitleCase(formValues.firstName)}
                        error={formStates.firstNameError}
                        helperText={formStates.firstNameErrorMsg}
                        onChange={(event) => {
                          firstNameHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <TextField
                        color="secondary"
                        id="outlined-disabled"
                        label="Middle Name"
                        value={toTitleCase(formValues.middleName)}
                        onChange={(event) => {
                          middleNameHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <TextField
                        color="secondary"
                        id="outlined-disabled"
                        label="Last Name"
                        value={toTitleCase(formValues.lastName)}
                        error={formStates.lastNameError}
                        helperText={formStates.lastNameErrorMsg}
                        onChange={(event) => {
                          lastNameHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <TextField
                        color="secondary"
                        id="outlined-disabled"
                        label="Email Address"
                        value={(formValues.emailAddress).toLowerCase()}
                        error={formStates.emailAddressError}
                        helperText={formStates.emailAddressErrorMsg}
                        onChange={(event) => {
                          emailAddressHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <TextField
                      type="number"
                        color="secondary"
                        id="outlined-disabled"
                        label="Phone Number"
                        value={(formValues.phoneNumber)}
                        error={formStates.phoneNumberError}
                        helperText={formStates.phoneNumberErrorMsg}
                        onChange={(event) => {
                          phoneNumberHandler(event);
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">+234</InputAdornment>,
                        }}
              
                        variant="outlined"
                      />
                      <br />
                      <TextField
                        color="secondary"
                        style={{ textAlign: "left" }}
                        id="outlined-select-currency"
                        select
                        label="Gender"
                        value={formValues.sex}
                        error={formStates.genderError}
                        helperText={formStates.genderErrorMsg}
                        onChange={(event) => {
                          genderHandler(event);
                        }}
                        variant="outlined"
                      >
                        {genders.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <br />
                      <TextField
                        color="secondary"
                        style={{ textAlign: "left" }}
                        id="outlined-select-currency"
                        select
                        label="State Of Residence"
                        value={formValues.states}
                        onChange={(e) => {
                          StateHandler(e);
                        }}
                        variant="outlined"
                      >
                        {theState.map((option) => (
                          <MenuItem key={option.stateId} value={option.stateId}>
                            {option.stateName}
                          </MenuItem>
                        ))}
                      </TextField>
                      <br />
                      <TextField
                        disabled={lgaDisable}
                        color="secondary"
                        style={{ textAlign: "left" }}
                        id="outlined-select-currency"
                        select
                        label="LGA Of Residence"
                        value={formValues.lga}
                        error={formStates.lgaError}
                        helperText={formStates.lgaErrorMsg}
                        onChange={(e) => {
                          lgaHandler(e);
                        }}
                        variant="outlined"
                      >
                        {theLga.map((option) => (
                          <MenuItem key={option.lgaId} value={option.lgaId}>
                            {option.lgaName}
                          </MenuItem>
                        ))}
                      </TextField>

                      <br />
                      <TextField
                        color="secondary"
                        id="outlined-disabled"
                        label="City Of Residence"
                        value={formValues.city}
                        onChange={(event) => {
                          cityHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br/>

                      <TextField
                        color="secondary"
                        style={{ textAlign: "left" }}
                        id="outlined-select-currency"
                        select
                        label="Highest Qualification"
                        value={formValues.highestQualification}
                        onChange={(event) => {
                          QualificationHandler(event);
                        }}
                        variant="outlined"
                      >
                        {qualifications.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <br />
                      <TextField
                        color="secondary"
                        id="outlined-disabled"
                        label="Course of Highest Qualification"
                        value={formValues.courseOfStudy}
                        error={formStates.courseOfStudyError}
                        helperText={formStates.courseOfStudyErrorMsg}
                        onChange={(event) => {
                          courseOfStudyHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <span style={{color:'#fe0000'}}>{generalErrorMsg}</span>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          onClick={CancelBtnHandler}
                          style={{ marginRight: "20px" }}
                          variant="outlined"
                          color="primary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={registerHandler}
                          style={{ flexGrow: "1" }}
                          variant="contained"
                          color="secondary"
                        >
                          {submitLoader === true ? <CircularProgress/>:
                          'Submit'}
                          {/* Submit */}
                        </Button>
                      </div>
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Container>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </MuiThemeProvider>
      )}
    </React.Fragment>
  );
}
