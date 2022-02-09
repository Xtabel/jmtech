import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Skeleton } from "@material-ui/lab";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Slide from "@material-ui/core/Slide";
import { MuiThemeProvider, createTheme } from "@material-ui/core";
import { TextField, Grid } from "@material-ui/core";

const getMuiTheme = createTheme({
  palette: {
    primary: { main: "#fe0000" },
    secondary: { main: "#1a1a1a" },
  },
  overrides: {
    MuiDialog: {
      paperWidthSm: {
        maxWidth: "fit-content",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  applicantPhoto: {
    width: "150px",
    height: "150px",
    border: "4px solid #1a1a1a",
    marginBottom: "30px",
  },
  Button: {
    textTransform: "capitalize",
  },
  passport:{
    height:'100%',
    width:'100%',
  },
}));

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
    width: "800px",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewApplicantData = ({
  handleOpen,
  handleClose,
  applicantId,
  firstName,
  lastName,
  middleName,
  dateReg,
  regCode,
  gender,
  emailAddress,
  phoneNumber,
  state,
  city,
  lga,
  courseOfHighestQual,
  highestQual,
  courseName,
  passport,
  resume,
}) => {
  const classes = useStyles();
  
  return (
    <MuiThemeProvider theme={getMuiTheme}>
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={handleOpen}
          TransitionComponent={Transition}
          keepMounted
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Applicant Profile
            
          </DialogTitle>
          <DialogContent dividers>
            <Grid item xs={12} sm={12}>
              <div style={{ display: "flex" ,   justifyContent:'space-between',}}>
                {passport !== "" ? (
                <div className={classes.applicantPhoto}>
                    <img className={classes.passport} src={`data:image/png;base64,${passport}`} alt={`${firstName} ${""} ${lastName}'s passport`}/>

                </div>
                ):(<Skeleton style={{marginBottom:'30px'}} variant="rectangular" width={200} height={200}/>)}
                <div
                  style={{
    

                 
                    marginLeft: "30px",
                  }}
                >
                  <Button variant="contained" color="secondary">
                    Download CV
                  </Button>
                </div>
              </div>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  disabled
                  color="secondary"
                  label="Registration Code"
                  value={regCode}
                  helperText=""
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                      //
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <TextField
                  disabled
                  color="secondary"
                  label="Date Registered"
                  value={moment(dateReg).format("DD MMM YYYY")}
                  helperText=""
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="Last Name"
                  value={lastName}
                  helperText=""
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="First Name"
                  helperText=""
                  value={firstName}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="Middle Name"
                  helperText=""
                  variant="outlined"
                  value={middleName}
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="Gender"
                  helperText=""
                  variant="outlined"
                  value={gender}
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="Email Address"
                  helperText=""
                  variant="outlined"
                  value={emailAddress}
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="Phone Number"
                  helperText=""
                  variant="outlined"
                  value={`+${phoneNumber}`}
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="State Of Residence"
                  helperText=""
                  variant="outlined"
                  value={state}
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="LGA Of Residence"
                  helperText=""
                  variant="outlined"
                  value={lga}
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="City"
                  helperText=""
                  variant="outlined"
                  value={city}
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="Highest Qualification"
                  helperText=""
                  variant="outlined"
                  value={highestQual}
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="Course Of Highest Qualification"
                  helperText=""
                  variant="outlined"
                  value={courseOfHighestQual}
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <TextField
                  disabled
                  color="secondary"
                  label="Course Name"
                  helperText=""
                  variant="outlined"
                  value={courseName}
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#000",
                     
                    },
                  }}
                  InputLabelProps={{
                    style: {
                       color: "#1A1A1A99",
                      backgroundColor: "#fff",
                      padding: "0px 10px",
                    },
                  }}
                ></TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.Button}
              variant="outlined"
              autoFocus
              onClick={handleClose}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MuiThemeProvider>
  );
};

export default ViewApplicantData;
