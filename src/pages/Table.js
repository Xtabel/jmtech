import React, {useState, useEffect} from "react";
import axios from "axios";
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';
import { CircularProgress,Box } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import {
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";

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
    MUIDataTableToolbar:{
        titleText:{
            color:'#fe0000',
        },
  },
}
});


const GetAllApplicantTable = () => {
  const columns = [
    {
        name: "ApplicantId",
        label: "Id",
        options: {
          filter: true,
          sort: true,
        //   setCellProps: () => ({ style: { minWidth: "105px" } }),
          customBodyRender: (value, tableMeta) => {
            return value === undefined || value === "" ? "" : value;
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
        setCellProps: () => ({ style: { minWidth: "200px" } }),
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
        setCellProps: () => ({ style: { minWidth: "180px" } }),
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
            : moment(value).format("MMMM DD YYYY");;
        },
      },
    },
  ];
  //   const columns = ["Name", "Company", "City", "State"];
  const [loader, setLoader] = useState(true);
  const[loaderPage,setLoaderPage] = useState(true)
  const [loading, setLoading] = useState(true);
  const [allApplicantTableData, setAllApplicantTableData] = useState([]);
  const [allApplicantTableDataResponse, setAllApplicantTableDataResponse] = useState([]);
  const [paginationOptions, setPaginationOptions] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterStatus, setFilterStatus] = useState(0);
  const [searchText, setSearchText] = useState("");

  const changePage = page => {
    // setIsLoading(true);
    setLoader(true);
    setPageIndex(page);
};

const updateSearchText = text => {
    // setIsLoading(true);
    setSearchText(text);
  };

const  resetFilter = () =>{
  setFilterStatus(0);

}

  const options = {
    filterType: "checkbox",
    jumpToPage: true,
    fixedHeader: true,
  };
  //datatable options
  useEffect(() => {
    ;
    if (
        allApplicantTableDataResponse &&
      Object.keys(allApplicantTableDataResponse).length !== 0
    ) {
      let paginationOptions = {
          //  responsive: "scrollFullHeight",
          filter: false,
          search:false,
          filterType: "dropdown",
          // selectableRows: "none",
          // selectableRows: true,
          // selectableRowsOnClick: true,
          //filters: false,
          rowsPerPage: 10,
          rowsPerPageOptions: [10],
          serverSide: true,
          jumpToPage: true,
          //count, // Use total number of items
          textLabels: {
              body: {
                  noMatch: loading ? (
                      <CircularProgress />
                  ) : (
                      "Sorry, there is no matching data to display"
                  )
              }
          },
          count:
          allApplicantTableDataResponse.p.RecordTotal === undefined
            ? ""
            : allApplicantTableDataResponse.p.RecordTotal, // Unknown number of items
        page: pageIndex,
        onSearchChange: searchText => {
          //console.log(searchText);
          updateSearchText(searchText);
        },

        onTableChange: (action, tableState) => {
          // console.log(action, tableState);
          if (action === "changePage") {
            console.log("Go to page", tableState.page);
            changePage(tableState.page);
          } else {
            return (
              <CircularProgress />
            );
          }
        }
      };

      setPaginationOptions(paginationOptions);
    }
  }, [allApplicantTableDataResponse]);

  
  useEffect(()=>{
      if (allApplicantTableDataResponse !== null && allApplicantTableDataResponse !== undefined){
        const createTableData = () => {

          let allApplicantTableData = [];
  
          let paginatedAllApplicantTableData = allApplicantTableDataResponse.applicant;
  
          paginatedAllApplicantTableData.map(val => {
              let row = [
                  val.ApplicantId,
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
            
              ];
              allApplicantTableData.push(row);
          });
          setAllApplicantTableData(allApplicantTableData);
          setLoader(false);
        
        }
        Object.keys(allApplicantTableDataResponse).length !== 0 && createTableData();
      }
    },[allApplicantTableDataResponse]);

  const fetchAllApplicantTable = (body) => {
    
    axios
      .post(`https://www.waeconline.org.ng/JMTechAPI/api/Applicant/GetAllApplicants`, body)
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
      pageIndex: pageIndex,
      pageSize: pageSize,
      search: searchText,
  };
   fetchAllApplicantTable(Datas);
}, [pageIndex, searchText]);

 
  return (
    <MuiThemeProvider theme={getMuiTheme}>
      <div style={{ padding: "40px 20px 0px 20px" }}>
    <>
      {loaderPage === true ?
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
      :
      <LoadingOverlay active={loader} styles={{ overlay: (base) => ({ ...base, background: 'rgba(0, 0, 0, 0.15)' }) }} spinner text="Fetching Data for You...">
        <MUIDataTable
          title={"Applicants List"}
          data={allApplicantTableData}
          columns={columns}
          options={paginationOptions}
        /> 
        </LoadingOverlay>
        
        }
        </>
      </div>
    </MuiThemeProvider>
  );
};

export default GetAllApplicantTable;
