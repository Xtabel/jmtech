import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import {
  CircularProgress,
  Box,
  Grid,
  IconButton,
  Button,
} from "@material-ui/core";
import { VisibilityOutlined } from "@material-ui/icons";
import MUIDataTable from "mui-datatables";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import newlogo from "../assets/newlogo.png";
import ViewApplicant from "./ViewApplicant";
import { withRouter } from "react-router";


const getMuiTheme = createTheme({
  palette: {
    secondary: { main: "#1a1a1a" },
    primary: { main: "#fe0000" },
  },
  overrides: {
    MUIDataTableBodyRow: {
      root: {
        "&:nth-child(odd)": {
          backgroundColor: "#FFEBEB49",
        },
      },
    },
    MUIDataTableHeadCell: {
      data: {
        fontWeight: "600",
        color: "#1a1a1a",
      },
      fixedHeader: {
        textAlign: "left",
      },
    },
    MUIDataTableToolbar: {
      titleText: {
        color: "#fe0000",
      },
    },
  },
});

const GetAllApplicantTable = () => {

    const [applicantId, setApplicantId] = useState(0);
    




  const columns = [
    {
      name: "ApplicantId",
      label: "Id",
      options: {
        sort: true,
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return <span>{tableMeta.rowIndex + 1}</span>;
        },
      },
    },
    {
      name: "LastName",
      label: "Last Name",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "100px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" ? "" : value;
        },
      },
    },
    {
      name: "FirstName",
      label: "First Name",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "120px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" ? "" : value;
        },
      },
    },
    {
      name: "MiddleName",
      label: "Middle Name",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "120px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" ? " " : value;
        },
      },
    },
    {
      name: "Gender",
      label: "Gender",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "100px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" ? "" : value;
        },
      },
    },
    {
      name: "EmailAddress",
      label: "Email Address",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "90px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" ? "null" : value;
        },
      },
    },
    {
      name: "PhoneNumber",
      label: "Phone Number",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "130px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" ? "null" : value;
        },
      },
    },
    {
      name: "StateOfResidence",
      label: "State Of Residence",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "180px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" || value === null
            ? "null"
            : value;
        },
      },
    },
    {
      name: "LGAOfResidence",
      label: "LGA Of Residence",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "150px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" || value === null
            ? "null"
            : value;
        },
      },
    },
    {
      name: "City",
      label: "City",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "100px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" || value === null
            ? "null"
            : value;
        },
      },
    },
    {
      name: "HighestQualification",
      label: "Highest Qualification",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "180px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" || value === null
            ? "null"
            : value;
        },
      },
    },
    {
      name: "CourseOfHighestQualification",
      label: "Course Of Highest Qualification",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "280px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" || value === null
            ? "null"
            : value;
        },
      },
    },
    {
      name: "CourseName",
      label: "Course Name",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "150px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" || value === null
            ? "null"
            : value;
        },
      },
    },
    {
      name: "RegistrationCode",
      label: "Registration Code",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "150px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" || value === null
            ? "null"
            : value;
        },
      },
    },
    {
      name: "DateRegistered",
      label: "Date Registered",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({ style: { minWidth: "180px" } }),
        customBodyRender: (value, tableMeta) => {
          return value === undefined || value === "" || value === null
            ? "no date found"
            : moment(value).format("MMMM DD YYYY");
        },
      },
    },
    {
      name: "Action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({ style: { minWidth: "100px" } }),
        customBodyRender: (value, tableMeta) => {
          return (
            <span>
              <Button 
              onClick={()=>openView(value)}
              style={{textTransform:'capitalize'}}
              startIcon={<VisibilityOutlined />}
              variant="contained"
        color="primary"
        size="small"
              >View
              </Button>
            </span>
          );
        },
      },
    },
  ];

  const [loader, setLoader] = useState(true);
  const [open,setOpen]=useState(false);
  const [loaderPage, setLoaderPage] = useState(true);
  const [allApplicantTableData, setAllApplicantTableData] = useState([]);
  const [allApplicantTableDataResponse, setAllApplicantTableDataResponse] =useState([]);
  const [firstName,setFirstName]= useState("");
  const [lastName,setLastName]= useState("");
  const [middleName,setMiddleName]=useState("");
  const [emailAddress, setEmailAddress]= useState("");
  const [phoneNumber,setPhoneNumer] = useState("");
  const [gender,setGender]=useState("");
  const [state,setState]=useState("");
  const [lga,setlga] = useState("");
  const [city,setCity] = useState("");
  const [highestQual,setHighestQual] = useState("");
  const [courseOfHighestQual,setCourseOfHighestQual] = useState("");
  const [courseName,setCourseName] = useState("");
  const [regCode,setRegCode]=useState("");
  const [dateReg,setDateReg] = useState("")
  const [searchText, setSearchText] = useState("");
  const [passport,setPassport]=useState("");
  const [resume,setResume]= useState("");

  const handleClickOpen = ()=>{
     
      setOpen(true)
  }
  const handleClose = ()=>{
    setOpen(false);
    setFirstName("")
    setLastName("")
    setMiddleName("")
    setEmailAddress("")
    setPhoneNumer("")
    setGender("")
    setState("")
    setlga("")
    setCity("")
    setHighestQual("")
    setCourseOfHighestQual("")
    setCourseName("")
    setRegCode("")
    setDateReg("")
    setApplicantId("")
    setPassport("")
    setResume("")
    
  }
  const openView =(val)=>{
      debugger
      setFirstName(val.FirstName)
      setLastName(val.LastName)
      setMiddleName(val.MiddleName)
      setEmailAddress(val.EmailAddress)
      setPhoneNumer(val.PhoneNumber)
      setGender(val.Gender)
      setState(val.StateofResidence)
      setlga(val.LocalGovtofResidence)
      setCity(val.City)
      setHighestQual(val.HighestQualification)
      setCourseOfHighestQual(val.CourseOfHighestQualification)
      setCourseName(val.CourseName)
      setRegCode(val.RegistrationCode)
      setDateReg(val.DateRegistered)
      setApplicantId(val.ApplicantId)
    handleClickOpen()
    fetchApplicantById(val.ApplicantId)
  }

  const updateSearchText = (text) => {
    // setIsLoading(true);
    setSearchText(text);
  };

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    fixedHeader: true,
    selectableRowsHeader: false,
    rowsPerPageOptions:[10,20,50,100,200],
    elevation: 3,
    textLabels: {
      body: {
        noMatch: "Sorry, there is no matching data to display",
      },
    },
    onSearchChange: (searchText) => {
      updateSearchText(searchText);
    },
  };

  //effect populating table data
  useEffect(() => {
    const createTableData = () => {
      let allApplicantTableData = [];
      allApplicantTableDataResponse.forEach((val) => {
        let row = [
          val,
          val.LastName,
          val.FirstName,
          val.MiddleName,
          val.Gender,
          val.EmailAddress,
          val.PhoneNumber,
          val.StateofResidence,
          val.LocalGovtofResidence,
          val.City,
          val.HighestQualification,
          val.CourseOfHighestQualification,
          val.CourseName,
          val.RegistrationCode,
          val.DateRegistered,
          val,
        ];
        allApplicantTableData.push(row);
        return;
      });
      setAllApplicantTableData(allApplicantTableData);
      setLoader(false);
    };
    allApplicantTableDataResponse.length !== 0 && createTableData();
  }, [allApplicantTableDataResponse]);

  const [applicant,setApplicant] = useState([]);

  const fetchAllApplicantTable = (body) => {
    debugger;
    axios
      .post(
        `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/GetAllApplicants`,
        body
      )
      .then(function (response) {
        // handle success
        setAllApplicantTableDataResponse(response.data.Data);
        setLoaderPage(false);
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
    let Datas = {
      search: searchText,
    };
    fetchAllApplicantTable(Datas);
  }, [searchText]);

  const fetchApplicantById = (id)=>{
      debugger
    axios.post(`https://www.waeconline.org.ng/JMTechAPI/api/Applicant/GetApplicantsById?applicantId=${id}`)
    .then(function (response) {
      debugger
        setApplicant(response.data.Data);
        setPassport(response.data.Data[0].Passport)
        setResume(response.data.Data[0].Resume)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      // alert('Error occured in loading All Data');
    })
    .then(function () {
      // always executed
    });
}
  
  return (
    <MuiThemeProvider theme={getMuiTheme}>
      <div style={{ padding: "60px 50px 50px 50px" }}>
        <>
          {loaderPage === true ? (
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
          ) : (
            <LoadingOverlay
              active={loader}
              styles={{
                overlay: (base) => ({
                  ...base,
                  background: "rgba(0, 0, 0, 0.15)",
                }),
              }}
              spinner
              text="Fetching Data for You..."
            >
              <Grid>
                <div
                  style={{
                    backgroundColor: "#1a1a1a",
                    justifyContent: "space-between",
                    display: "flex",
                    padding: "10px 20px",
                    height: "50px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  <b style={{ color: "#fff", textAlign: "center" }}>
                    ALL APPLICANTS DATA 
                  </b>
                </div>
              </Grid>
              <MUIDataTable
                title={
                  <img
                    src={newlogo}
                    alt="JM Tech Centre"
                    width="130px"
                    height="70px"
                  />
                }
                data={allApplicantTableData}
                columns={columns}
                options={options}
              />
            </LoadingOverlay>
          )}
        </>
      </div>
      <ViewApplicant handleOpen={open} handleClose={handleClose} applicantId={applicantId} firstName = {firstName}
      lastName={lastName} middleName={middleName} emailAddress={emailAddress} phoneNumber = {phoneNumber}
      gender={gender} state={state} lga={lga} city = {city} passport={passport} resume={resume}
      highestQual={highestQual} courseOfHighestQual={courseOfHighestQual} courseName={courseName} regCode = {regCode} dateReg={dateReg}
      
      />
    </MuiThemeProvider>
  );
};

export default withRouter(GetAllApplicantTable);
