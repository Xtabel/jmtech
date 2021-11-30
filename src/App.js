import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import "./app.css";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import logo from "./assets/logo.png";
import image from "./assets/image.gif";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

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
  },
  ApplyHereBtn: {
    textTransform: "capitalize",
  },
  forms:{
    margin:'30px'
  },
  homePage:{
    [theme.breakpoints.down("xs")]: {
      flexWrap:'wrap'
        },
  },
  grids:{
    [theme.breakpoints.down("xs")]: {
    marginRight:'0px'
        },
  }

}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);
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
 
  const currencies = [
    {
      value: "1",
      label: "Data Science & AI",
    },
    {
      value: "2",
      label: "Cloud Development",
    },
    {
      value: "3",
      label: "Business Application",
    },
    {
      value: "4",
      label: "Backend Software Development",
    },
    {
      value: "5",
      label: "Frontend Software Development",
    },
    {
      value: "6",
      label: "Cyber Security",
    },
  ];
  const genders = [
    {
      value:"1",
      label:"Male",
    },
    {
      value:"2",
      label:"Female",
    },
  ];
  const qualifications = [
    {
      value:"1",
      label:"HND",
    },
    {
      value:"2",
      label:"1st Degree",
    },
    {
      value:"3",
      label:"Master",
    },
    {
      value:"4",
      label:"PHD",
    },
    {
      value:"5",
      label:"Others",
    },
  ];
  const states = [
    {
      value:"1",
      label:"Abuja",
    },
    {
      value:"2",
      label:"Lagos",
    },
    {
      value:"3",
      label:"Kaduna",
    },
    {
      value:"4",
      label:"Kano",
    },
    {
      value:"5",
      label:"Enugu",
    },
  ];
  const [file, setFile] = useState(null);
  const [displayPicture, setDisplayPicture] = useState("");
  const [gender, setGender] = useState("");
  const [theState, setTheState] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const genderHandler = (event) =>{
    setGender(event.target.value)
  }
  const QualificationHandler = (event) =>{
    setHighestQualification(event.target.value)
  }
  const StateHandler =(event)=>{
    setTheState(event.target.value)
  }
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("1");

  const handleChange = (event) => {
    setCurrency(event.target.value);
    applicationDiv(applicationForm);

  };

  const applicationForm = React.useRef();
 
  const applicationDiv = () =>{
    var applicationForms = document.getElementById("forms");
    var coursechoice =  document.getElementById("CourseChoice");
    coursechoice.style = "display:none";
    applicationForms.style = "display:block"
    // if (!ref.current) return;
    // ref.current.scrollIntoView({ behavior: "smooth" });
    var HomePageArea = document.getElementById("HomePage");
    HomePageArea.style="display:none";
  
  };

  const CancelBtnHandler = () =>{
    var HomePageArea = document.getElementById("HomePage");
    var applicationForms = document.getElementById("forms");
    HomePageArea.style="display:flex";
    applicationForms.style = "display:none";

  }
 
  const onInputChange = (e) => {
        
    console.log(e.target.files);
    let uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setDisplayPicture(URL.createObjectURL(uploadedFile));
  
  
    // setFormValues({
    //     type: "file",
    //     payload: uploadedFile,
    // });
  }
  useEffect(() => {
    //debugger
  
        
        let imageBase = "data:image/jpeg;base64,";
        setDisplayPicture(imageBase);
    
  }, [file]);

  const applicationDivWithCourse = (ref) =>{
   applicationDiv()
    var coursechoice =  document.getElementById("CourseChoice");
    coursechoice.style = "display:block";
    var HomePageArea = document.getElementById("HomePage");
    HomePageArea.style="display:none";
  
  }
  return (
    <React.Fragment>
      <CssBaseline />
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
            <img src={logo} alt="JM Tech Center" width="130px" height="130px" />
            <Button
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
                <Box className={classes.homePage} id="HomePage" style={{display:"flex"}}>
                <Grid className={classes.grids} item xs={12} sm={6} style={{marginRight:'20px', display:'flex'}} >
                  <Paper className={classes.paper}>
                    <img src={image} alt="Home Page Image" />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <h1 style={{ fontSize: "3em" }}>
                      Welcome to JM Tech Learning Center
                    </h1>
                    <h2>We offer a range of courses: </h2>
                    <p style={{ fontStyle: "italic", color: "#949494" }}>
                      Data Science & AI, Cloud Development, Business
                      Application, Backend Software Development, Frontend
                      Software Development, or Cyber Security
                    </p>
                    <FormControl className={classes.margin}>
                      <TextField
                        style={{ width: "100%" }}
                        fullWidth
                        id="outlined-select-currency"
                        select
                        label="Choose a course"
                        value={currency}
                        onChange={handleChange}
                        helperText="Please your course of interest"
                        variant="outlined"
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <Button 
                      onClick = {()=>applicationDiv(applicationForm)}
                      style={{marginTop:'20px'}}
                      disableElevation variant="contained" color="secondary">Apply Now</Button>
                    </FormControl>
                  </Paper>
                </Grid>
                </Box>
               
                
                <Grid style={{display:"none"}} id="forms" item xs={12} sm={12} ref={applicationForm}>
                  <Paper className={classes.paper}>
                    <FormControl className={classes.forms} noValidate autoComplete="off">
                      <h2>Application Form For Microsoft Skilling Initiative</h2>
                      <h2 style={{color:'#545454'}}>Program: <span>Backend Software Development</span></h2>
                      <h4 style={{fontStyle:"italic"}}><span style={{color:'#fe000067'}}>Note: </span>All Fields are required</h4>
                     <div style={{marginBottom:'20px'}}>
                     <Button
                     disableElevation
                     style={{marginRight:'15px'}}
                      variant="contained"
                      component="label"
                      color="primary"
                      startIcon={ <PhotoCameraIcon />}
                      // style={{ backgroundColor: 'transparent', color: "white", border: "none" }}
                    >
                      <small>Upload Passport Photo</small>
                      <input
                        type="file"
                        hidden
                        onChange={onInputChange}
                      />
                      <label accept="image/*" ></label>
                    </Button>
                    <Button
                    disableElevation
                      variant="contained"
                      component="label"
                      color="secondary"
                      startIcon={ <CloudUploadIcon />}
                      // style={{ backgroundColor: 'transparent', color: "white", border: "none" }}
                    >
                      <small>Upload CV</small>
                      <input
                        type="file"
                        hidden
                        onChange={onInputChange}
                      />
                    </Button>
                     </div>
                     <div id="CourseChoice" style={{display:'none'}}>
                     <TextField
                     
                     style={{ width: "100%", marginBottom:'20px', textAlign:'left'}}
                     fullWidth
                     id="outlined-select-currency"
                     select
                     label="Choose a course"
                     value={currency}
                     onChange={handleChange}
                     variant="outlined"
                   >
                     {currencies.map((option) => (
                       <MenuItem key={option.value} value={option.value}>
                         {option.label}
                       </MenuItem>
                     ))}
                   </TextField>
                     </div>
                     
                    <TextField
                      id="outlined-disabled"
                      label="First Name"
                      value="FirstName"
                      variant="outlined"
                    />
                    <br/>
                     <TextField
                      id="outlined-disabled"
                      label="Middle Name"
                      value="MiddleName"
                      variant="outlined"
                    />
                        <br/>
                     <TextField
                      id="outlined-disabled"
                      label="Last Name"
                      value="LastName"
                      variant="outlined"
                    />
                        <br/>
                     <TextField
                      id="outlined-disabled"
                      label="Email Address"
                      value="EmailAddress"
                      variant="outlined"
                    />
                        <br/>
                     <TextField
                      id="outlined-disabled"
                      label="Phone Number"
                      value="PhoneNumber"
                      variant="outlined"
                    />
                        <br/>
                        <TextField
                      style={{textAlign:'left'}}
                        id="outlined-select-currency"
                        select
                        label="Gender"
                        value={gender}
                        onChange={genderHandler}
                        helperText="Your Sex"
                        variant="outlined"
                      >
                        {genders.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                        <br/>
                        <TextField
                      style={{textAlign:'left'}}
                        id="outlined-select-currency"
                        select
                        label="State"
                        value={theState}
                        onChange={StateHandler}
                        helperText="State"
                        variant="outlined"
                      >
                        {states.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                        <br/>
                     <TextField
                      id="outlined-disabled"
                      label="City"
                      value="city"
                      variant="outlined"
                    />
                        <br/>
                    
                        <TextField
                      style={{textAlign:'left'}}
                        id="outlined-select-currency"
                        select
                        label="Highest Qualification"
                        value={highestQualification}
                        onChange={QualificationHandler}
                        helperText="Your Highest Qualification"
                        variant="outlined"
                      >
                        {qualifications.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                        <br/>
                     <TextField
                      id="outlined-disabled"
                      label="Course of Highest Qualification"
                      value="courseofHighestQualification"
                      variant="outlined"
                    />
                        <br/>
                    
                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <Button onClick={CancelBtnHandler} style={{marginRight:"20px"}} variant="outlined" color="primary">Cancel</Button>
                        <Button style={{flexGrow:'1'}} variant="contained" color="secondary">Submit</Button>
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
    </React.Fragment>
  );
  
}
