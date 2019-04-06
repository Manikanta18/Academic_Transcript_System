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

import getWeb3 from "../utils/getWeb3";
import Transcript from "../contracts/Transcript.json";

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
  }
});

//table
let id = 0;

function createData(CourseId, CourseName, Course_Credits) {
  id += 1;
  return { id, CourseId, CourseName, Course_Credits };
}

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

const rows = [
  createData("Ma101", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
  createData("Gingerbread", 356, 16.0)
];

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Main extends React.Component {
  // for form dialog
  state = {
    open1: false,
    open2: false,
    open3: false,
    activeStep: 0,
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null
  };

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

  handleClickOpen1 = () => {
    this.setState({ open1: true });
  };

  handleClickOpen2 = () => {
    this.setState({ open2: true });
  };

  handleClickOpen3 = () => {
    this.setState({ open3: true });
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

  //

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
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
                      variant="outlined"
                      fullWidth
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
                      fullWidth
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
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose1} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleClose1} color="primary">
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
                      {this.state.activeStep === steps.length ? (
                        <div>
                          <Typography className={classes.instructions}>
                            All steps completed
                          </Typography>
                          <Button onClick={this.handleReset}>Reset</Button>
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
                          <CustomTableCell>Course Id</CustomTableCell>
                          <CustomTableCell align="right">
                            Course Name
                          </CustomTableCell>
                          <CustomTableCell align="right">
                            Course Credits
                          </CustomTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow className={classes.row} key={row.id}>
                            <CustomTableCell component="th" scope="row">
                              {row.CourseId}
                            </CustomTableCell>
                            <CustomTableCell align="right">
                              {row.CourseName}
                            </CustomTableCell>
                            <CustomTableCell align="right">
                              {row.Course_Credits}
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
      </Grid>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
