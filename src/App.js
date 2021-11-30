import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import validators from "./utils/Validators";
// import {useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";
import { SetIsRequiredError } from "./utils/ErrorHandler";
// import {toastr} from 'react-redux-toastr';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
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
import { SettingsRemoteSharp } from "@material-ui/icons";
import DescriptionIcon from "@material-ui/icons/Description";

axios.defaults.baseURL = "http://jmtechcentre.azurewebsites.net/api/Applicant/";

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
  forms: {
    margin: "30px",
  },
  homePage: {
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  grids: {
    [theme.breakpoints.down("xs")]: {
      marginRight: "0px",
    },
  },
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
  // const dispatch = useDispatch();

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
      value: "1",
      label: "HND",
    },
    {
      value: "2",
      label: "1st Degree",
    },
    {
      value: "3",
      label: "Master",
    },
    {
      value: "4",
      label: "PHD",
    },
    {
      value: "5",
      label: "Others",
    },
  ];
  const states = [
    {
      value: "1",
      label: "Abuja",
    },
    {
      value: "2",
      label: "Lagos",
    },
    {
      value: "3",
      label: "Kaduna",
    },
    {
      value: "4",
      label: "Kano",
    },
    {
      value: "5",
      label: "Enugu",
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
    city: "",
    cityid: "",
    sex: "",
    highestQualification: "",
    courseOfStudy: "",
    courseChoice: "",
    passport: "",
    cv: "",
  };

  const [formStates, setFormStates] = React.useState({
    firstNameError: false,
    firstNameErrorMsg: "",
    middleNameError: false,
    middleNameErrorMsg: "",
    lastNameError: false,
    lastNameErrorMsg: "",
    emailAddressError: false,
    emailAddressErrorMsg: "",
    phoneNumberError: false,
    phoneNumberErrorMsg: "",
    stateError: false,
    stateErrorMsg: "",
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
  });

  const [repo, setRepo] = useState([]);
  const [file, setFile] = useState(null);
  const [fileCV, setFileCV] = useState(null);
  const [displayPicture, setDisplayPicture] = useState("");
  const [displayCV, setDisplayCV] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gender, setGender] = useState("");
  const [theState, setTheState] = useState([]);
  const [theCity, setTheCity] = useState([]);
  const [disable, setDisable] = useState(true);
  const [submit, setSubmit] = useState([]);
  const [highestQualification, setHighestQualification] = useState("");
  const [picture, setPicture] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
    debugger;
    if (!validators.isRequired(value, len, max, select)) {
      setFormStates({
        ...formStates,
        [stateError]: true,
        [stateErrorMsg]: errorMsg,
      });
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

  const [dataDropDown, setDataDropDown] = useState([]);
  const fetchData = () => {
    debugger;
    axios
      .post(
        `http://jmtechcentre.azurewebsites.net/api/Applicant/GetCoursePrograms`
      )
      .then(function (response) {
        debugger;
        // handle success
        setDataDropDown(response.data.data);
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
  const fetchStates = () => {
    debugger;
    axios
      .post(`http://jmtechcentre.azurewebsites.net/api/Applicant/GetStates`)
      .then(function (response) {
        debugger;
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
    debugger;
    axios
      .post(
        `http://jmtechcentre.azurewebsites.net/api/Applicant/GetLGAByStateId?stateId=${stateIds}`
      )
      .then(function (response) {
        debugger;
        // handle success
        setTheCity(response.data.data);
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
  const genderHandler = (e) => {
    if (e) {
      let genderValue = e.target.value;
      let genderName = e.currentTarget.textContent;
      e.preventDefault();

      setFormValues({ ...formValues, sex: genderValue });
      return SetIsRequiredError(genderValue, "genderError", "genderErrorMsg");
    }
  };
  const QualificationHandler = (e) => {
    if (e) {
      let qualificationValue = e.target.value;
      let qualificationName = e.currentTarget.textContent;
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
    debugger;
    const stateIds = e.target.value;
    setFormValues({ ...formValues, states: stateIds });
    fetchLGA(stateIds);
  };
  const classes = useStyles();
  const [currency, setCurrency] = React.useState("1");

  const handleChange = (e) => {
    setDisable(false);
    setFormValues({ ...formValues, courseChoice: e.target.value });
  };

  const applicationForm = React.useRef();

  const applicationDiv = () => {
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
  };

  const CancelBtnHandler = () => {
    var HomePageArea = document.getElementById("HomePage");
    var applicationForms = document.getElementById("forms");
    var applyhere = document.getElementById("ApplyHereBtn");
    applyhere.style = "display:block";
    HomePageArea.style = "display:flex";
    applicationForms.style = "display:none";
    setDisable(true);
  };

  const passportUploadHandler = (e) => {};

  const onInputChange = (e) => {
    debugger;
    console.log(e.target.files);
    let uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setDisplayPicture(URL.createObjectURL(uploadedFile));
    // let formData = new FormData();
    // formData.append ("passportFilePath" , file);
  };
  const onInputCVChange = (e) => {
    debugger;
    console.log(e.target.files);
    let uploadedCVFile = e.target.files[0];
    setFileCV(uploadedCVFile);
    setDisplayCV(URL.createObjectURL(uploadedCVFile));
    // let formData = new FormData();
    // formData.append ("passportFilePath" , file);
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
      debugger;
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
      debugger;
      e.preventDefault();
      let middleNameValue = e.target.value;
      setFormValues({ ...formValues, middleName: middleNameValue });
      return SetIsRequiredError(
        middleNameValue,
        "middleNameError",
        "middleNameErrorMsg"
      );
    }
  };
  const lastNameHandler = (e) => {
    if (e) {
      debugger;
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

    if (emailAddressValue === "") {
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
    if (e) {
      debugger;
      e.preventDefault();
      let phoneNumberValue = e.target.value;
      setFormValues({ ...formValues, phoneNumber: phoneNumberValue });
      return SetIsRequiredError(
        phoneNumberValue,
        "phoneNumberError",
        "phoneNumberErrorMsg"
      );
    }
  };
  const cityHandler = (e) => {
    if (e) {
      debugger;
      e.preventDefault();
      let cityNameValue = e.target.value;
      setFormValues({ ...formValues, city: cityNameValue });
      return SetIsRequiredError(cityNameValue, "cityError", "cityErrorMsg");
    }
  };
  const courseOfStudyHandler = (e) => {
    if (e) {
      debugger;
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
    debugger;
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
    formData.append("CityId", formValues.city);
    formData.append("passportFilePath", file);
    formData.append("resumeFilePath", fileCV);

    // let submitData = {
    //   FirstName: formValues.firstName,
    //   LastName:formValues.lastName,
    //   MiddleName: formValues.middleName,
    //   EmailAddress: formValues.emailAddress,
    //   PhoneNumber: formValues.phoneNumber,
    //   StateId: formValues.stateId,
    //   Gender:formValues.gender,
    //   HighestQualification:formValues.highestQualification,
    //   CourseOfHighestQualification: formValues.courseOfStudy,
    //   CourseofChoiceId: formValues.courseChoice,
    //   CityId: formValues.cityId,
    //   passportFilePath: setDisplayPicture("data:image/jpeg;base64," + formValues.passport),
    //   resumeFilePath: formValues.cv,
    // }

    if (
      (formStates.firstNameError !== true ||
        formStates.middleNameError !== true ||
        formStates.lastNameError !== true,
      formStates.emailAddressError !== true ||
        formStates.phoneNumberError !== true ||
        formStates.stateError !== true,
      formStates.cityError !== true ||
        formStates.highestQualificationError !== true ||
        formStates.courseOfStudyError !== true,
      formStates.genderError !== true ||
        formStates.uploadPassportError !== true ||
        formStates.uploadCVError !== true)
    ) {
      axios
        .post(
          `http://jmtechcentre.azurewebsites.net/api/Applicant/RegisterApplicant`,
          formData
        )
        .then(function (response) {
          debugger;
          // handle success
          setSubmit(response.data.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          // alert('Error occured in loading All Data');
        })
        .then(function () {
          // always executed
        });
      setIsSubmitted(true);
      var HomePageArea = document.getElementById("HomePage");
      HomePageArea.style = "display:none";
    } else {
      alert("error");
    }
  };
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
                  style={{ display: "flex" }}
                >
                  <Grid
                    className={classes.grids}
                    item
                    xs={12}
                    sm={6}
                    style={{ marginRight: "20px", display: "flex" }}
                  >
                    <Paper className={classes.paper}>
                      <img src={image} alt="Home Page Image" />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <h1 style={{ fontSize: "3em" }}>
                        {isSubmitted == false
                          ? "Welcome to JM Tech Learning Cente"
                          : "Thank you for applying"}
                      </h1>
                      <h2>We offer a range of courses: </h2>
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
                          disabled={disable}
                          onClick={() => applicationDiv(applicationForm)}
                          style={{ marginTop: "20px" }}
                          disableElevation
                          variant="contained"
                          color="secondary"
                        >
                          Apply Now
                        </Button>
                      </FormControl>
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
                      <h2>
                        Application Form For Microsoft Skilling Initiative
                      </h2>
                      <h2 style={{ color: "#545454" }}>
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
                        <span style={{ color: "#fe000067" }}>Note: </span>All
                        Fields are required
                      </h4>
                      <div style={{ marginBottom: "20px" }}>
                        <img
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            // marginLeft: "5rem",
                            // marginTop: "2rem",
                            // marginBottom: "1rem",
                          }}
                          src={displayPicture}
                          alt={pictureName}
                        />
                        <Button
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
                            accept="image/*"
                          />
                          {/* <label accept="image/*"></label> */}
                        </Button>
                        {openPictureSection ? (
                          <Grid item xs={12}>
                            <DescriptionIcon /> <small> {pictureName} </small>
                          </Grid>
                        ) : (
                          ""
                        )}
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

                        {openCVSection ? (
                          <Grid item xs={12}>
                            <DescriptionIcon /> <small> {CVName} </small>
                          </Grid>
                        ) : (
                          ""
                        )}
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
                        value={formValues.firstName}
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
                        value={formValues.middleName}
                        error={formStates.middleNameError}
                        helperText={formStates.middleNameErrorMsg}
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
                        value={formValues.lastName}
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
                        value={formValues.emailAddress}
                        error={formStates.emailAddressError}
                        helperText={formStates.emailAddressErrorMsg}
                        onChange={(event) => {
                          emailAddressHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <TextField
                        color="secondary"
                        id="outlined-disabled"
                        label="Phone Number"
                        value={formValues.phoneNumber}
                        error={formStates.phoneNumberError}
                        helperText={formStates.phoneNumberErrorMsg}
                        onChange={(event) => {
                          phoneNumberHandler(event);
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
                        label="State"
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
                        color="secondary"
                        style={{ textAlign: "left" }}
                        id="outlined-select-currency"
                        select
                        label="City"
                        value={formValues.city}
                        error={formStates.cityError}
                        helperText={formStates.cityErrorMsg}
                        onChange={(e) => {
                          cityHandler(e);
                        }}
                        variant="outlined"
                      >
                        {theCity.map((option) => (
                          <MenuItem key={option.lgaId} value={option.lgaId}>
                            {option.lgaName}
                          </MenuItem>
                        ))}
                      </TextField>

                      <br />

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
                          Submit
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
    </React.Fragment>
  );
}
