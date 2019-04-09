import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddCircle from "@material-ui/icons/AddCircle";
import Edit from "@material-ui/icons/Edit";
import GetIcon from "@material-ui/icons/ArrowDownwardSharp";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import amber from "@material-ui/core/colors/amber";
import green from "@material-ui/core/colors/green";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import getWeb3 from "../utils/getWeb3";
import Transcript from "../contracts/Transcript.json";


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

// table
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#424242",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  card: {
    minWidth: 300,
    minHeight: 500,
    height: 500,
    width: 300,
    margin: 100,
    padding: 25
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },

  title: {
    fontSize: 24
  },

  button: {
    margin: theme.spacing.unit,
    marginLeft: 5,
    marginTop: 25,
    width: 200
  },

  rightIcon: {
    marginLeft: 15
  },

  appBar: {
    position: "static"
  },
  flex: {
    flex: 1
  },

  //table
  root: {
    width: "70%",
    marginTop: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 33,
    marginRight: theme.spacing.unit * 33,
    overflowX: "auto"
  },
  table: {
    minWidth: 400
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },

  //
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },

  backButton: {
    marginRight: theme.spacing.unit
  },

  //snackbar
  margin: {
    margin: theme.spacing.unit,
  },
});

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

//stepper
function getSteps() {
  return ["Course Id", "Edit"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Provide the Course Id to Edit`;
    case 1:
      return "You can Modify the Course Details";
    default:
      return "Unknown step";
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

//---------------------------------------------------- CLASS-----------------------------------

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open1: false,
      open2: false,
      open3: false,
      opensnack: false,
      activeStep: 0,

      web3: null,
      accounts: null,
      contract: null,

      courseId: null,
      courseName: null,
      courseCredits: 0,
      editCourseId: null,
      editCourseName: null,
      editCourseCredits: 0,

      course_rows: [],
      count: 0
    };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Transcript.networks[networkId];
      const instance = new web3.eth.Contract(
        Transcript.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  //add course textfields
  handleChange(event) {
    this.setState({ courseId: event.target.value });
  }
  handleChange2(event) {
    this.setState({ courseName: event.target.value });
  }
  handleChange3(event) {
    this.setState({ courseCredits: event.target.value });
  }

  //edit course textfields
  handleChange4(event) {
    this.setState({ editCourseId: event.target.value });
  }
  handleChange5(event) {
    this.setState({ editCourseName: event.target.value });
  }
  handleChange6(event) {
    this.setState({ editCourseCredits: event.target.value });
  }

  // add course button
  handleClickOpen1 = async () => {
    this.setState({ open1: true });
  };

  addCourseMethod = async () => {
    const { accounts, courseId, courseName, courseCredits } = this.state;

    if (courseId === "" || courseName === "" || courseCredits === 0) {
    } 
    else {
      this.state.contract.methods
        .addCourse(courseId, courseName, courseCredits)
        .send({ from: accounts[0] })
        .then(this.setState({ opensnack: true }));
    }
  };

  //get course method
  handleClickOpen3 = async () => {
    this.setState({ open3: true });
    let course_rows = [];
    const { contract } = this.state;
    let finalCourses = [];

    contract.methods
      .coursesCount()
      .call()
      .then(num => {
        this.setState({ count: num });
        for (let i = 0; i < num; i++) {
          contract.methods
            .getCourseByIndex(i)
            .call()
            .then(res => {
              course_rows[i] = {
                id: i,
                courseId: res[0],
                courseName: res[1],
                courseCredits: res[2]
              };
            })
            .catch(console.error)
            .finally(() => {
              // console.log(course_rows[i]);
              finalCourses.push(course_rows[i]);
              if (i === num - 1) {
                this.setState({ course_rows });
              }
            });
        }
      })
      .catch(console.error);
  };

  handleClickOpen2 = () => {
    this.setState({ open2: true });
  };

  handleClose1 = () => {
    this.setState({ open1: false });
  };

  handleClose2 = () => {
    this.setState({ open2: false });
  };

  handleClose3 = () => {
    this.setState({ open3: false });
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleCloseSnack = () => {
    this.setState({opensnack: false});
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const { course_rows } = this.state;
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ backgroundColor: "#eeeeee" }}
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <b>Courses</b>
            </Typography>
            <br />
            <br />
            <Typography component="p">
              You can Add, Modify and Get
              <br /> the Courses of IIITV
            </Typography>
          </CardContent>
          <br />
          <CardActions>
            <ul>
              {/* ADD COURSE */}
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  style={{ backgroundColor: "#0d47a1" }}
                  onClick={this.handleClickOpen1}
                >
                  Add
                  <AddCircle className={classes.rightIcon} />
                </Button>

                <Dialog
                  open={this.state.open1}
                  onClose={this.handleClose1}
                  aria-labelledby="form-dialog-title"
                  disableBackdropClick
                  disableEscapeKeyDown
                >
                  <DialogTitle id="form-dialog-title">Add Course</DialogTitle>
                  <DialogContent>
                    <br />
                    <Divider />
                    <br />
                    <TextField
                      required
                      autoFocus
                      margin="dense"
                      id="course_id"
                      label="Course Id"
                      type="text"
                      style={{ width: 350 }}
                      variant="outlined"
                      value={this.state.courseId}
                      onChange={event => this.handleChange(event)}
                    />
                    <br />
                    <br />
                    <TextField
                      required
                      margin="dense"
                      id="course_name"
                      label="Course Name"
                      type="text"
                      variant="outlined"
                      style={{ width: 350 }}
                      value={this.state.courseName}
                      onChange={event => this.handleChange2(event)}
                    />
                    <br />
                    <br />
                    <TextField
                      required
                      id="course_credits"
                      label="Course Credits"
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="dense"
                      variant="outlined"
                      style={{ width: 350 }}
                      value={this.state.courseCredits}
                      onChange={event => this.handleChange3(event)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose1} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.addCourseMethod} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

              {/* EDIT COURSE */}
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  style={{ backgroundColor: "#1565c0" }}
                  onClick={this.handleClickOpen2}
                >
                  Edit
                  <Edit className={classes.rightIcon} />
                </Button>

                <Dialog
                  open={this.state.open2}
                  onClose={this.handleClose2}
                  aria-labelledby="form-dialog-title"
                  disableBackdropClick
                  disableEscapeKeyDown
                >
                  <DialogTitle id="form-dialog-title">Edit Course</DialogTitle>
                  <DialogContent>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {steps.map(label => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    <div>
                      <Divider />
                      <br />
                      <TextField
                        disabled={activeStep === 1}
                        required
                        autoFocus
                        margin="dense"
                        id="course_id"
                        label="Course Id"
                        type="text"
                        variant="outlined"
                        style={{ width: 350 }}
                        value={this.state.courseId}
                        onChange={event => this.handleChange4(event)}
                      />
                      <br />
                      <br />
                      <TextField
                        disabled={activeStep === 0}
                        margin="dense"
                        id="course_name"
                        label="Course Name"
                        type="text"
                        variant="outlined"
                        style={{ width: 350 }}
                        value={this.state.courseName}
                        onChange={event => this.handleChange5(event)}
                      />
                      <br />
                      <br />
                      <TextField
                        disabled={activeStep === 0}
                        id="course_credits"
                        label="Course Credits"
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                        margin="dense"
                        variant="outlined"
                        style={{ width: 350 }}
                        value={this.state.courseCredits}
                        onChange={event => this.handleChange6(event)}
                      />
                      <br />
                      <br />
                      <Divider />
                      <br />

                      {this.state.activeStep === steps.length ? (
                        <div>
                          <Typography className={classes.instructions}>
                            Course Modified..
                          </Typography>
                          <Button
                            onClick={this.handleReset}
                            color="primary"
                            variant="contained"
                          >
                            Reset
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Typography className={classes.instructions}>
                            {getStepContent(activeStep)}
                          </Typography>
                          <div>
                            <Button
                              disabled={activeStep === 0}
                              onClick={this.handleBack}
                              className={classes.backButton}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.handleNext}
                            >
                              {activeStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose2} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

              {/* GET COURSES */}
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ backgroundColor: "#1976d2" }}
                  onClick={this.handleClickOpen3}
                >
                  Get
                  <GetIcon className={classes.rightIcon} />
                </Button>
                <Dialog
                  fullScreen
                  open={this.state.open3}
                  onClose={this.handleClose3}
                  TransitionComponent={Transition}
                >
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.flex}
                      >
                        COURSES
                      </Typography>
                      <Button color="inherit" onClick={this.handleClose3}>
                        Close
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <CustomTableCell align="left">
                            Course Id
                          </CustomTableCell>
                          <CustomTableCell align="left">
                            Course Name
                          </CustomTableCell>
                          <CustomTableCell align="center">
                            Course Credits
                          </CustomTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {course_rows.map(row => (
                          <TableRow className={classes.row} key={row.id}>
                            <CustomTableCell align="left">
                              {row.courseId}
                            </CustomTableCell>
                            <CustomTableCell align="left">
                              {row.courseName}
                            </CustomTableCell>
                            <CustomTableCell align="center">
                              {row.courseCredits}
                            </CustomTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </Dialog>
              </div>
            </ul>
          </CardActions>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <b>Students</b>
            </Typography>
            <br />
            <br />
            <Typography component="p">
              You can Add, Modify and Get
              <br /> the Students Details of IIITV
            </Typography>
          </CardContent>
          <br />
          <CardActions>
            <ul>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  style={{ backgroundColor: "#0d47a1" }}
                >
                  Add
                  <AddCircle className={classes.rightIcon} />
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  style={{ backgroundColor: "#1565c0" }}
                >
                  Edit
                  <Edit className={classes.rightIcon} />
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ backgroundColor: "#1976d2" }}
                >
                  Get
                  <GetIcon className={classes.rightIcon} />
                </Button>
              </div>
            </ul>
          </CardActions>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <b> Transcripts</b>
            </Typography>
            <br />
            <br />
            <Typography component="p">
              You can Add, Modify and Get
              <br /> the transcripts of Student
            </Typography>
          </CardContent>
          <br />
          <CardActions>
            <ul>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  style={{ backgroundColor: "#0d47a1" }}
                >
                  Add
                  <AddCircle className={classes.rightIcon} />
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  style={{ backgroundColor: "#1565c0" }}
                >
                  Edit
                  <Edit className={classes.rightIcon} />
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ backgroundColor: "#1976d2" }}
                >
                  Get
                  <GetIcon className={classes.rightIcon} />
                </Button>
              </div>
            </ul>
          </CardActions>
        </Card>
        
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.opensnack}
          autoHideDuration={9000}
          onClose={this.handleCloseSnack}
        >

        <MySnackbarContentWrapper
          onClose={this.handleCloseSnack}
          variant="success"
          message="Added Course"
        />
        </Snackbar>
      </Grid>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
