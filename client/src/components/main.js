import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AddCircle from "@material-ui/icons/AddCircle";
import Edit from "@material-ui/icons/Edit";
import GetIcon from "@material-ui/icons/ArrowDownwardSharp";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
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
import randomstring from "randomstring";

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

  formCard: {
    minWidth: 400,
    minHeight: 150,
    margin: 100,
    padding: 25
  },

  semCard: {
    minWidth: 350,
    minHeight: 600,
    maxWidth: 350,
    MaxHeight: 600,
    margin: 100,
    padding: 25,
    marginTop: 20
  },

  textField: {
    marginLeft: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit * 6,
    width: 300
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },

  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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

  dense: {
    marginTop: 19
  },

  //table
  root: {
    width: "70%",
    marginTop: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 33,
    marginRight: theme.spacing.unit * 33,
    overflowX: "auto"
  },

  //table
  root1: {
    width: 600,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    overflowX: "auto"
  },

  table: {
    minWidth: 400
  },

  table1: {
    Width: 600
  },

  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },

    container: {
      display: "flex",
      flexWrap: "wrap"
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
    margin: theme.spacing.unit
  },

  menu: {
    width: 200
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

const departments = [
  {
    value: "BTech IT",
    label: "BTech IT"
  },
  {
    value: "BTech CS",
    label: "BTech CS"
  },
  {
    value: "MTech CS",
    label: "MTech CS"
  }
];

const semesters = [
  {
    value: 1,
    label: "semester 1"
  },
  {
    value: 2,
    label: "semester 2"
  },
  {
    value: 3,
    label: "semester 3"
  },
  {
    value: 4,
    label: "semester 4"
  },
  {
    value: 5,
    label: "semester 5"
  },
  {
    value: 6,
    label: "semester 6"
  },
  {
    value: 7,
    label: "semester 7"
  },
  {
    value: 8,
    label: "semester 8"
  }
];

const grades = [
  {
    value: "AA",
    label: "AA"
  },
  {
    value: "AB",
    label: "AB"
  },
  {
    value: "BB",
    label: "BB"
  },
  {
    value: "BC",
    label: "BC"
  },
  {
    value: "CC",
    label: "CC"
  },
  {
    value: "CD",
    label: "CD"
  },
  {
    value: "DD",
    label: "DD"
  },
  {
    value: "F",
    label: "F"
  }
];

//---------------------------------------------------- CLASS-----------------------------------

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      open6: false,
      open7: false,
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
      dummy_course: null,
      course_rows: [],
      courses: [],
      count: 0,

      studentId: null,
      studnetName: null,
      dptType: "IT",
      batchYear: null,
      cId: null,
      cGrade: null,
      sem: null,
      cpi: null,
      spi: null,
      sem2: null,
      courseGradeRows: [],
      semPointsRows: [],
      courseIndex: 0,
      semIndex: 0,

      // student_details: [],
      // semester1: [],
      // semester2: [],
      // semester3: [],
      // semester4: [],
      // semester5: [],
      // semester6: [],
      // semester7: [],
      // semester8: [],

      getStudentId: null,
      getStudentIdHash: null,
      studentHash: "Sorry Student doesn't EXIT!!"
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

  //add student textfields
  handleChange7(event) {
    this.setState({ studentId: event.target.value });
  }
  handleChange8(event) {
    this.setState({ studnetName: event.target.value });
  }
  handleChange9(event) {
    this.setState({ dptType: event.target.value });
  }
  handleChange10(event) {
    this.setState({ batchYear: event.target.value });
  }

  // get hash of student
  handleChange11(event) {
    this.setState({ getStudentIdHash: event.target.value });
  }

  // adding course grade
  handleChange12(event) {
    this.setState({ cId: event.target.value });
  }

  handleChange13(event) {
    this.setState({ sem: event.target.value });
  }

  handleChange14(event) {
    this.setState({ cGrade: event.target.value });
  }

  // adding sem points
  handleChange15(event) {
    this.setState({ sem2: event.target.value });
  }

  handleChange16(event) {
    this.setState({ spi: event.target.value });
  }

  handleChange17(event) {
    this.setState({ cpi: event.target.value });
  }

  checkCourse(courseId, semester) {
    let value = null;
    for (let i = 0; i < this.state.courseGradeRows.length; i++) {
      if (this.state.courseGradeRows[i].courseId === courseId && this.state.courseGradeRows[i].semester === semester) {
        value = true;
        return value;
      }
    }
    return false;
  }

  // add course grade to table
  addCourseGrade = () => {
    const { sem, cId, cGrade, courseGradeRows, courseIndex } = this.state;
    let check = this.checkCourse(cId, sem);
    console.log(cId, check);
    if (sem === 0 || cId === "" || cGrade === "" || check === true) {
    } else {
      courseGradeRows[courseIndex] = {
        semester: sem,
        courseId: cId,
        grade: cGrade
      };
      this.setState({ courseGradeRows, courseIndex: courseIndex + 1 });
    }
  };

  // add Sem Points to table
  addSemPoints = async () => {
    const { sem2, spi, cpi, semPointsRows, semIndex } = this.state;
    if (sem2 === 0 || spi === "" || cpi === "") {
    } else {
      semPointsRows[semIndex] = {
        semester: sem2,
        spi: spi,
        cpi: cpi
      };

      this.setState({ semPointsRows, semIndex: semIndex + 1 });
    }
  };

  //add cousre fun
  addCourseMethod = async () => {
    const { accounts, courseId, courseName, courseCredits } = this.state;

    if (courseId === "" || courseName === "" || courseCredits === 0) {
    } else {
      this.state.contract.methods
        .addCourse(courseId, courseName, courseCredits)
        .send({ from: accounts[0] })
        .then(
          this.setState({
            open1: false,
            courseId: null,
            courseName: null,
            courseCredits: 0
          })
        );
    }
  };

  //add student fun
  addTranscriptMethod = async () => {
    const { accounts, studentId, studnetName, dptType, batchYear } = this.state;
    let random_value;

    random_value = randomstring.generate({
      length: 256,
      charset: "alphanumeric"
    });

    // random_value = web3.utils.fromAscii(random_value);
    console.log(random_value);

    if (
      studentId === 0 ||
      studnetName === "" ||
      dptType === "" ||
      batchYear === 0
    ) {
    } else {
      this.state.contract.methods
        .addStudentDetails(
          random_value,
          studentId,
          studnetName,
          dptType,
          batchYear
        )
        .send({ from: accounts[0] })
        .then(this.setState({ open1: false }));
    }
  };

  modifyCourseMethod = async () => {
    const {
      accounts,
      editCourseId,
      editCourseName,
      editCourseCredits,
      activeStep,
      contract
    } = this.state;

    const steps = getSteps();

    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));

    if (activeStep === steps.length - 1) {
      if (
        editCourseName === "" ||
        editCourseId === "" ||
        editCourseCredits === 0
      ) {
      } else {
        this.state.contract.methods
          .changeCourse(editCourseId, editCourseName, editCourseCredits)
          .send({ from: accounts[0] })
          .then(
            this.setState({
              editCourseId: null,
              editCourseName: null,
              editCourseCredits: null
            })
          );
      }
    } else {
      if (editCourseId !== null) {
        let dummy_course;
        contract.methods
          .getCourse(editCourseId)
          .call()
          .then(res => {
            dummy_course = {
              courseId: res[0],
              courseName: res[1],
              courseCredits: res[2]
            };
          })
          .catch(console.error)
          .finally(() => {
            this.setState({ dummy_course });
            this.setState({
              editCourseId: dummy_course.courseId,
              editCourseName: dummy_course.courseName,
              editCourseCredits: dummy_course.courseCredits
            });
          });
      } else {
        this.setState({ activeStep: 0 });
      }
    }
  };

  // add course button
  handleClickOpen1 = async () => {
    this.setState({ open1: true });
  };

  handleClickOpen2 = () => {
    this.setState({ open2: true });
  };

  //get course method
  handleClickOpen3 = async () => {
    this.setState({ open3: true });
    let course_rows = [];
    const { contract, courses } = this.state;
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
              courses[i] = {
                value: res[0],
                label: res[0]
              };
            })
            .catch(console.error)
            .finally(() => {
              // console.log(course_rows[i]);
              finalCourses.push(course_rows[i]);
              if (i === num - 1) {
                this.setState({ course_rows, courses });
              }
            });
        }
      })
      .catch(console.error);
  };

  handleClickOpen4 = () => {
    this.setState({ open4: true });
  };

  // get stduent button
  handleClickOpen6 = async () => {
    this.setState({ open6: true });
    // let student_details = [];
    // const { contract, getStudentId } = this.state;

    // contract.methods
    //   .getHash(getStudentId)
    //   .call()
    //   .then(value => {
    //     contract.methods
    //       .getStudentDetails(value)
    //       .call()
    //       .then(res => {
    //         student_details = {
    //           studentId: res[0],
    //           studentName: res[1],
    //           dptType: res[2],
    //           batchYear: res[3]
    //         };
    //       })
    //       .catch(console.error)
    //       .finally(() => {
    //         this.setState({ student_details });
    //         console.log(student_details);
    //       });
    //   });
  };

  handleClickOpen7 = async () => {
    this.setState({ open7: true });
    let studentHash;
    const { getStudentIdHash, contract } = this.state;

    if (getStudentIdHash !== null) {
      contract.methods
        .getHash(getStudentIdHash)
        .call()
        .then(value => {
          studentHash = value;

          if (
            value ===
            "0x0000000000000000000000000000000000000000000000000000000000000000"
          ) {
            this.setState({ studentHash: "Sorry Student doesn't EXIT!!" });
          } else {
            this.setState({ studentHash });
          }
        });
    } else {
      this.setState({ studentHash: "Sorry Student doesn't EXIT!!" });
    }
  };

  handleClose1 = () => {
    this.setState({
      open1: false,
      courseId: null,
      courseName: null,
      courseCredits: 0
    });
  };

  handleClose2 = () => {
    this.setState({
      open2: false,
      editCourseId: null,
      editCourseName: null,
      editCourseCredits: null,
      activeStep: 0
    });
  };

  handleClose3 = () => {
    this.setState({ open3: false });
  };

  handleClose4 = () => {
    this.setState({ open4: false });
    this.setState({
      courseGradeRows: [],
      semPointsRows: [],
      courseIndex: 0,
      semIndex: 0
    });
  };

  handleClose6 = () => {
    this.setState({ open6: false });
  };

  handleClose7 = () => {
    this.setState({
      open7: false,
      studentHash: null
    });
  };

  // handleNext = () => {
  //   this.setState(state => ({
  //     activeStep: state.activeStep + 1
  //   }));
  // };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      editCourseId: null,
      editCourseName: null,
      editCourseCredits: null
    });
  };

  handleCloseSnack = () => {
    this.setState({ opensnack: false });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const { course_rows, semPointsRows, courseGradeRows, courses } = this.state;
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
              {/*------------------ ADD COURSE --------------------*/}
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
                  TransitionComponent={Transition}
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
                      variant="filled"
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
                      variant="filled"
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
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="dense"
                      variant="filled"
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

              {/*------------------- EDIT COURSE -------------------*/}
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
                  TransitionComponent={Transition}
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
                        select
                        margin="dense"
                        id="course_id2"
                        label="Course Id"
                        variant="outlined"
                        style={{ width: 350 }}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                        value={this.state.editCourseId}
                        onChange={event => this.handleChange4(event)}
                      >
                        {courses.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <br />
                      <br />
                      <TextField
                        disabled={activeStep === 0}
                        margin="dense"
                        id="course_name2"
                        label="Course Name"
                        type="text"
                        InputLabelProps={{
                          shrink: true
                        }}
                        variant="filled"
                        style={{ width: 350 }}
                        value={this.state.editCourseName}
                        onChange={event => this.handleChange5(event)}
                      />
                      <br />
                      <br />
                      <TextField
                        disabled={activeStep === 0}
                        id="course_credits2"
                        label="Course Credits"
                        type="number"
                        InputLabelProps={{
                          shrink: true
                        }}
                        margin="dense"
                        variant="filled"
                        style={{ width: 350 }}
                        value={this.state.editCourseCredits}
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
                              onClick={this.modifyCourseMethod}
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

              {/*-------------------------------- GET COURSES-------------------------- */}
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
                  <AppBar
                    className={classes.appBar}
                    style={{ position: "sticky" }}
                  >
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
              <b>Student Transcript</b>
            </Typography>
            <br />
            <br />
            <Typography component="p">
              You can Add, Modify and Get
              <br /> the Transcript Details of Student
            </Typography>
          </CardContent>
          <br />
          <CardActions>
            <ul>
              {/*---------------------------- Add Student Transcript--------------------- */}
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  style={{ backgroundColor: "#0d47a1" }}
                  onClick={this.handleClickOpen4}
                >
                  Add
                  <AddCircle className={classes.rightIcon} />
                </Button>

                <Dialog
                  fullScreen
                  open={this.state.open4}
                  onClose={this.handleClose4}
                  TransitionComponent={Transition}
                >
                  <AppBar
                    className={classes.appBar}
                    style={{ position: "sticky" }}
                  >
                    <Toolbar>
                      <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.flex}
                      >
                        Add Transcript
                      </Typography>
                      <Button color="inherit" onClick={this.handleClose4}>
                        Close
                      </Button>
                    </Toolbar>
                  </AppBar>

                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ backgroundColor: "#eeeeee", height: "500%" }}
                  >
                    <Card className={classes.card} style={{ marginTop: 50 }}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          <b>Student Details</b>
                        </Typography>
                        <br />
                        <Typography component="p">
                          Enter the Student Details
                        </Typography>
                        <br />
                      </CardContent>
                      <div>
                        <TextField
                          required
                          autoFocus
                          margin="dense"
                          id="student_id"
                          label="Student Id"
                          type="number"
                          variant="filled"
                          value={this.state.studentId}
                          style={{ margin: 15, width: 250 }}
                          className={classes.textField}
                          onChange={event => this.handleChange7(event)}
                        />
                        <TextField
                          required
                          margin="dense"
                          id="student_name"
                          label="Student Name"
                          type="text"
                          variant="filled"
                          value={this.state.studnetName}
                          style={{ margin: 15, width: 250 }}
                          className={classes.textField}
                          onChange={event => this.handleChange8(event)}
                        />
                        <TextField
                          required
                          select
                          margin="dense"
                          id="department"
                          label="Department Name"
                          variant="filled"
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          value={this.state.dptType}
                          style={{ margin: 15, width: 250 }}
                          className={classes.textField}
                          onChange={event => this.handleChange9(event)}
                        >
                          {departments.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          required
                          margin="dense"
                          id="batch"
                          label="Batch Year"
                          type="number"
                          variant="filled"
                          value={this.state.batchYear}
                          style={{ margin: 15, width: 250 }}
                          className={classes.textField}
                          onChange={event => this.handleChange10(event)}
                        />
                      </div>
                    </Card>

                    <Card className={classes.card} style={{ marginTop: 50 }}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          <b>Add Course grade</b>
                        </Typography>
                        <br />
                        <Typography component="p">
                          Add Student's Course Grade
                        </Typography>
                        <br />
                      </CardContent>
                      <CardActions>
                        <div>
                          <TextField
                            required
                            select
                            margin="dense"
                            id="course_id"
                            label="Course Id"
                            variant="filled"
                            value={this.state.cId}
                            className={classes.textField}
                            SelectProps={{
                              MenuProps: {
                                className: classes.menu
                              }
                            }}
                            style={{ margin: 15, width: 250 }}
                            onChange={event => this.handleChange12(event)}
                          >
                            {courses.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            required
                            select
                            margin="dense"
                            id="semester"
                            label="Semester"
                            variant="filled"
                            value={this.state.sem}
                            className={classes.textField}
                            style={{ margin: 15, width: 250 }}
                            onChange={event => this.handleChange13(event)}
                            SelectProps={{
                              MenuProps: {
                                className: classes.menu
                              }
                            }}
                          >
                            {semesters.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            required
                            select
                            margin="dense"
                            id="grade"
                            label="Grade"
                            variant="filled"
                            value={this.state.cGrade}
                            className={classes.textField}
                            style={{ margin: 15, width: 250 }}
                            onChange={event => this.handleChange14(event)}
                            SelectProps={{
                              MenuProps: {
                                className: classes.menu
                              }
                            }}
                          >
                            {grades.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          <ul>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              style={{
                                backgroundColor: "#0d47a1",
                                marginTop: 5
                              }}
                              onClick={this.addCourseGrade}
                            >
                              Add
                              <AddCircle className={classes.rightIcon} />
                            </Button>
                          </ul>
                        </div>
                      </CardActions>
                    </Card>

                    <Card className={classes.card} style={{ marginTop: 50 }}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          <b>Add Semester Points</b>
                        </Typography>
                        <br />
                        <Typography component="p">
                          Enter Student's Semester Points
                        </Typography>
                        <br />
                      </CardContent>
                      <CardActions>
                        <div>
                          <TextField
                            required
                            select
                            margin="dense"
                            id="semester"
                            label="Semester"
                            variant="filled"
                            value={this.state.sem2}
                            className={classes.textField}
                            style={{ margin: 15, width: 250 }}
                            onChange={event => this.handleChange15(event)}
                            SelectProps={{
                              MenuProps: {
                                className: classes.menu
                              }
                            }}
                          >
                            {semesters.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            required
                            margin="dense"
                            id="spi"
                            label="SPI"
                            type="text"
                            variant="filled"
                            value={this.state.spi}
                            className={classes.textField}
                            style={{ margin: 15, width: 250 }}
                            onChange={event => this.handleChange16(event)}
                          />
                          <TextField
                            required
                            margin="dense"
                            id="cpi"
                            label="CPI"
                            type="text"
                            variant="filled"
                            value={this.state.cpi}
                            className={classes.textField}
                            style={{ margin: 15, width: 250 }}
                            onChange={event => this.handleChange17(event)}
                          />
                          <ul>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              style={{
                                backgroundColor: "#0d47a1",
                                marginTop: 5
                              }}
                              onClick={this.addSemPoints}
                            >
                              Add
                              <AddCircle className={classes.rightIcon} />
                            </Button>
                          </ul>
                        </div>
                      </CardActions>
                    </Card>
                    <Grid container justify="center" alignItems="center">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style={{
                          backgroundColor: "#2e7d32",
                          marginTop: 5,
                          width: 350,
                          height: 50
                        }}
                        // onClick={this.handleClickOpen7}
                      >
                        Submit Transcript
                        <AddCircle className={classes.rightIcon} />
                      </Button>
                    </Grid>

                    <Paper className={classes.root1} style={{ marginTop: 80 }}>
                      <Table className={classes.table1}>
                        <TableHead>
                          <TableRow>
                            <CustomTableCell align="left">
                              Semester
                            </CustomTableCell>
                            <CustomTableCell align="left">
                              Course Id
                            </CustomTableCell>
                            <CustomTableCell align="center">
                              Course Grade
                            </CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {courseGradeRows.map(row => (
                            <TableRow className={classes.row} key={row.id}>
                              <CustomTableCell align="left">
                                {row.semester}
                              </CustomTableCell>
                              <CustomTableCell align="left">
                                {row.courseId}
                              </CustomTableCell>
                              <CustomTableCell align="center">
                                {row.grade}
                              </CustomTableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>

                    <Paper className={classes.root1} style={{ marginTop: 80 }}>
                      <Table className={classes.table1}>
                        <TableHead>
                          <TableRow>
                            <CustomTableCell align="left">
                              Semester
                            </CustomTableCell>
                            <CustomTableCell align="left">SPI</CustomTableCell>
                            <CustomTableCell align="center">
                              CPI
                            </CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {semPointsRows.map(row => (
                            <TableRow className={classes.row} key={row.id}>
                              <CustomTableCell align="left">
                                {row.semester}
                              </CustomTableCell>
                              <CustomTableCell align="left">
                                {row.spi}
                              </CustomTableCell>
                              <CustomTableCell align="center">
                                {row.cpi}
                              </CustomTableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Dialog>
              </div>

              {/*---------------------------- edit Student Transcript--------------------- */}
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
              {/*---------------------------- Get Student Transcript--------------------- */}
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ backgroundColor: "#1976d2" }}
                  onClick={this.handleClickOpen6}
                >
                  Get
                  <GetIcon className={classes.rightIcon} />
                </Button>

                <Dialog
                  fullScreen
                  open={this.state.open6}
                  onClose={this.handleClose6}
                  TransitionComponent={Transition}
                >
                  <AppBar className={classes.appBar}>
                    <Toolbar>
                      <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.flex}
                      >
                        Transcript
                      </Typography>
                      <Button color="inherit" onClick={this.handleClose6}>
                        Close
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <Paper>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image="./iiit_logo.png"
                        title="logo"
                      />
                    </Card>
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
              <b> Student Hash</b>
            </Typography>
            <br />
            <br />
            <Typography component="p">
              You can Get the Student's hash
            </Typography>
          </CardContent>
          <br />

          <TextField
            required
            margin="dense"
            id="student_id"
            label="Student Id"
            type="number"
            variant="filled"
            style={{ margin: 25, width: 250 }}
            value={this.state.getStudentIdHash}
            onChange={event => this.handleChange11(event)}
          />
          <br />
          <br />
          <Divider />
          <br />

          <CardActions>
            <ul>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ backgroundColor: "#0d47a1" }}
                  onClick={this.handleClickOpen7}
                >
                  Get
                  <GetIcon className={classes.rightIcon} />
                </Button>

                <Dialog
                  open={this.state.open7}
                  minWidth="sm"
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={this.handleClose7}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                  disableBackdropClick
                  disableEscapeKeyDown
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {"Student Hash"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {this.state.studentHash}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose7} color="primary">
                      close
                    </Button>
                  </DialogActions>
                </Dialog>
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
