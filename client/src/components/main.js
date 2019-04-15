import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
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

  card_search: {
    minWidth: 1000,
    minHeight: 100,
    height: 100,
    margin: 50,
    padding: 50
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

//stepper student
function getStepsStudent() {
  return ["Student Id", "Edit"];
}

//stepper course
function getStepsCourse() {
  return ["Cousre Id", "Edit"];
}

//stepper sem
function getStepspoint() {
  return ["Semester", "Edit"];
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

function getStepContentStudent(step) {
  switch (step) {
    case 0:
      return `Provide the Student Id to Edit`;
    case 1:
      return "You can Modify the Student Details";
    default:
      return "Unknown step";
  }
}

function getStepContentCourse(step) {
  switch (step) {
    case 0:
      return `Provide the Course Id to Edit`;
    case 1:
      return "You can Modify the Course Details";
    default:
      return "Unknown step";
  }
}

function getStepContentPoint(step) {
  switch (step) {
    case 0:
      return `Provide the Semester to Edit`;
    case 1:
      return "You can Modify the semester points Details";
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
      activeStepStudent: 0,
      activeStepCourse: 0,
      activeStepPoint: 0,

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

      editstudentId: null,
      editstudnetName: null,
      editdptType: null,
      editbatchYear: null,
      editcId: null,
      editcGrade: null,
      editsem: null,
      editcpi: null,
      editspi: null,
      editsem2: null,
      dummyStudent: null,
      dummyGrade: null,
      dummyPoints: null,

      studentTranscriptHash: "",
      getGradeRows: [],
      getPointRows: [],
      indexx: 0,
      index2: 0,

      student_details: [],
      semester1: [],
      semester2: [],
      semester3: [],
      semester4: [],
      semester5: [],
      semester6: [],
      semester7: [],
      semester8: [],

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
      this.getCourseMethod();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  //handeling the tesxfeild values
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  //check course grade of that sem exits
  checkCourse(courseId, semester) {
    let value = null;
    for (let i = 0; i < this.state.courseGradeRows.length; i++) {
      if (
        this.state.courseGradeRows[i].courseId === courseId &&
        this.state.courseGradeRows[i].semester === semester
      ) {
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

  //check course grade of that sem exits
  checkSem(semester) {
    let value = null;
    for (let i = 0; i < this.state.semPointsRows.length; i++) {
      if (this.state.semPointsRows[i].semester === semester) {
        value = true;
        return value;
      }
    }
    return false;
  }

  // add Sem Points to table
  addSemPoints = async () => {
    const { sem2, spi, cpi, semPointsRows, semIndex } = this.state;
    let check = this.checkSem(sem2);
    if (sem2 === 0 || spi === "" || cpi === "" || check === true) {
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

  addTranscriptCourses = () => {
    const { accounts, studentId, courseGradeRows, contract } = this.state;
    for (let i = 0; i < courseGradeRows.length; i++) {
      contract.methods
        .addCourseGrade(
          studentId,
          courseGradeRows[i].courseId,
          courseGradeRows[i].semester,
          courseGradeRows[i].grade
        )
        .send({ from: accounts[0] });

      console.log(courseGradeRows[i].courseId);
    }
  };

  addTranscriptSems = () => {
    const { accounts, studentId, semPointsRows, contract } = this.state;
    for (let i = 0; i < semPointsRows.length; i++) {
      contract.methods
        .addPoints(
          studentId,
          semPointsRows[i].semester,
          semPointsRows[i].spi,
          semPointsRows[i].cpi
        )
        .send({ from: accounts[0] });

      console.log(semPointsRows[i].semester);
    }
  };

  //add transcript fun
  addTranscriptMethod = async () => {
    const {
      accounts,
      studentId,
      studnetName,
      dptType,
      batchYear,
      courseGradeRows,
      semPointsRows
    } = this.state;
    let random_value;

    random_value = randomstring.generate({
      length: 256,
      charset: "alphanumeric"
    });

    if (
      studentId === 0 ||
      studnetName === "" ||
      dptType === "" ||
      batchYear === 0 ||
      courseGradeRows.length === 0 ||
      semPointsRows.length === 0
    ) {
      console.log("nothing Happnend");
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
        .then(this.addTranscriptCourses)
        .then(this.addTranscriptSems);
    }
    // this.setState({ open4: false });
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


  modifyPoints = async () => {
    const {
      accounts,
      editsem2,
      editspi,
      editcpi,
      contract,
      activeStepPoint,
      editstudentId
    } = this.state;

    const steps = getStepspoint();

    this.setState(state => ({
      activeStepPoint: state.activeStepPoint + 1
    }));

    if (activeStepPoint === steps.length - 1) {
      if (
        editcpi === "" ||
        editspi === "" ||
        editstudentId === 0 ||
        editsem2 === 0
      ) {
      } else {
        contract.methods
          .changePoints( editstudentId, editsem2, editspi, editcpi)
          .send({ from: accounts[0] })
          .then(
            this.setState({
              editcpi: null,
              editsem2: null,
              editspi: null
            })
          );
      }
    } else {
      if (editspi !== "" || editsem2!== 0 || editcpi !== "" || editstudentId !== "" ) {
        let dummyPoints;

        contract.methods
          .getPointsHash(editstudentId, editsem2)
          .call()
          .then(hash => {
            contract.methods
              .getPoints(hash)
              .call()
              .then(res => {
                console.log(res);
                dummyPoints = {
                  semester: res[1],
                  spi: res[2],
                  cpi: res[3]
                };
                this.setState({ dummyPoints });
                this.setState({
                  editcpi: res[3],
                  editspi: res[2]
                });
                console.log(res[3], res[2]);
              });
          });
      } else {
        this.setState({ activeStepPoint: 0 });
      }
    }
  };

  modifyGradeMethod = async () => {
    const {
      accounts,
      editcId,
      editcGrade,
      editsem,
      contract,
      activeStepCourse,
      editstudentId
    } = this.state;

    const steps = getStepsCourse();

    this.setState(state => ({
      activeStepCourse: state.activeStepCourse + 1
    }));

    if (activeStepCourse === steps.length - 1) {
      if (
        editcId === "" ||
        editcGrade === "" ||
        editstudentId === 0 ||
        editsem === 0
      ) {
      } else {
        contract.methods
          .changeCourseGrade( editstudentId, editcId, editsem, editcGrade)
          .send({ from: accounts[0] })
          .then(
            this.setState({
              editcId: null,
              editsem: null,
              editcGrade: null
            })
          );
      }
    } else {
      if (editcId !== null || editsem!== 0 || editcGrade !== "" || editstudentId !== "" ) {
        let dummyGrade;

        contract.methods
          .getCourseGradeHash(editstudentId, editcId, editsem)
          .call()
          .then(hash => {
            contract.methods
              .getCourseGrade(hash)
              .call()
              .then(res => {
                console.log(res);
                dummyGrade = {
                  courseId: res[1],
                  semester: res[2],
                  grade: res[3]
                };
                this.setState({ dummyGrade });
                this.setState({
                  editcGrade: res[3]
                });
                console.log(res[3]);
              });
          });
      } else {
        this.setState({ activeStepCourse: 0 });
      }
    }
  };

  modifyStudentMethod = async () => {
    const {
      accounts,
      editstudentId,
      editstudnetName,
      editbatchYear,
      editdptType,
      activeStepStudent,
      contract
    } = this.state;

    const steps = getStepsStudent();

    this.setState(state => ({
      activeStepStudent: state.activeStepStudent + 1
    }));

    if (activeStepStudent === steps.length - 1) {
      if (
        editstudnetName === "" ||
        editdptType === "" ||
        editstudentId === 0 ||
        editbatchYear === 0
      ) {
      } else {
        contract.methods
          .getHash(editstudentId)
          .call()
          .then(hash => {
            contract.methods
              .changeStudentDetails(
                hash,
                editstudnetName,
                editbatchYear,
                editdptType
              )
              .send({ from: accounts[0] })
              .then(
                this.setState({
                  editstudnetName: null,
                  editbatchYear: null,
                  editdptType: null
                })
              );
          });
      }
    } else {
      if (editstudentId !== null) {
        let dummyStudent;

        contract.methods
          .getHash(editstudentId)
          .call()
          .then(hash => {
            contract.methods
              .getStudentDetails(hash)
              .call()
              .then(res => {
                console.log(res);
                dummyStudent = {
                  studentId: res[0],
                  studentName: res[1],
                  dptType: res[2],
                  batchYear: res[3]
                };
                this.setState({ dummyStudent });
                this.setState({
                  editstudnetName: res[1]
                });
                this.setState({
                  editdptType: res[2]
                });
                this.setState({
                  editbatchYear: res[3]
                });
                console.log(res[2]);
              });
          });
      } else {
        this.setState({ activeStepStudent: 0 });
      }
    }
  };

  //get course method
  getCourseMethod = async () => {
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

  getPoints = async () => {
    const { contract, studentTranscriptHash } = this.state;
    let getPointRows = [];

    contract.methods
      .getStudentId(studentTranscriptHash)
      .call()
      .then(sid => {
        for (let i = 0; i < 8; i++) {
          let studentId = sid;
          console.log(studentId);

          contract.methods
            .getPointsHash(studentId, i + 1)
            .call()
            .then(value => {
              console.log(value);
              contract.methods
                .getPoints(value)
                .call()
                .then(res => {
                  if (
                    res[0] === 0 ||
                    res[1] === 0 ||
                    res[2] === "" ||
                    res[3] === ""
                  ) {
                  } else {
                    getPointRows[this.state.index2] = {
                      id: this.state.index2,
                      studentId: res[0],
                      semester: res[1],
                      spi: res[2],
                      cpi: res[3]
                    };
                    console.log(getPointRows[this.state.index2]);
                    console.log(this.state.index2);
                    this.setState({
                      getPointRows,
                      index2: this.state.index2 + 1
                    });
                  }
                });
            });
        }
      });
  };

  getCourseGrades = async () => {
    const { contract, studentTranscriptHash, course_rows } = this.state;
    let getGradeRows = [];

    contract.methods
      .getStudentId(studentTranscriptHash)
      .call()
      .then(sid => {
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < course_rows.length; j++) {
            let studentId = sid;

            contract.methods
              .getCourseGradeHash(studentId, course_rows[j].courseId, i + 1)
              .call()
              .then(value => {
                contract.methods
                  .getCourseGrade(value)
                  .call()
                  .then(res => {
                    if (
                      res[0] === 0 ||
                      res[1] === "" ||
                      res[2] === 0 ||
                      res[3] === ""
                    ) {
                    } else {
                      getGradeRows[this.state.indexx] = {
                        id: this.state.indexx,
                        studentId: res[0],
                        courseId: res[1],
                        semester: res[2],
                        grade: res[3]
                      };

                      this.setState({
                        getGradeRows,
                        indexx: this.state.indexx + 1
                      });
                    }
                  });
              });
          }
        }
      });
  };

  getTranscript = async () => {
    let student_details = [];
    const { contract, studentTranscriptHash } = this.state;

    contract.methods
      .getStudentDetails(studentTranscriptHash)
      .call()
      .then(res => {
        student_details = {
          studentId: res[0],
          studentName: res[1],
          dptType: res[2],
          batchYear: res[3]
        };
        this.setState({ student_details });
      })
      .then(this.getCourseGrades)
      .then(this.getPoints);
  };

  // add course button
  handleClickOpen1 = () => {
    this.setState({ open1: true });
    this.getCourseMethod();
  };

  handleClickOpen2 = () => {
    this.setState({ open2: true });
  };

  //get course method
  handleClickOpen3 = async () => {
    this.setState({ open3: true });
  };

  handleClickOpen4 = () => {
    this.setState({ open4: true });
  };

  handleClickOpen5 = () => {
    this.setState({ open5: true });
  };

  // get stduent button
  handleClickOpen6 = async () => {
    this.setState({ open6: true });
  };

  //get student Hash
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
      semIndex: 0,
      studentId: null,
      studnetName: null,
      dptType: null,
      batchYear: null,
      cId: null,
      cGrade: null,
      sem: null,
      sem2: null,
      cpi: null,
      spi: null
    });
  };
  handleClose5 = () => {
    this.setState({ open5: false });
    this.setState({
      editstudentId: "",
      editstudnetName: "",
      editdptType: "",
      editbatchYear: "",
      editcId: "",
      editcGrade: "",
      editsem: "",
      editsem2: "",
      editspi: "",
      editcpi: ""
    })
  };

  handleClose6 = () => {
    this.setState({
      open6: false,
      getGradeRows: [],
      getPointRows: [],
      student_details: "",
      studentTranscriptHash: ""
    });
  };

  handleClose7 = () => {
    this.setState({
      open7: false,
      studentHash: null
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleBackStudent = () => {
    this.setState(state => ({
      activeStepStudent: state.activeStepStudent - 1
    }));
  };

  handleBackCourse = () => {
    this.setState(state => ({
      activeStepCourse: state.activeStepCourse - 1
    }));
  };

  handleBackPoint = () => {
    this.setState(state => ({
      activeStepPoint: state.activeStepPoint - 1
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

  handleResetStudent = () => {
    this.setState({
      activeStepStudent: 0,
      editstudentId: null,
      editstudnetName: null,
      editdptType: null,
      editbatchYear: null
    });
  };

  handleResetCourse = () => {
    this.setState({
      activeStepCourse: 0,
      editcId: null,
      editsem: null,
      editcGrade: null
    });
  };

  handleResetPoint = () => {
    this.setState({
      activeStepPoint: 0,
      editsem2: null,
      editspi: null,
      editcpi: null
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const {
      activeStep,
      activeStepCourse,
      activeStepStudent,
      activeStepPoint
    } = this.state;
    const {
      course_rows,
      semPointsRows,
      courseGradeRows,
      courses,
      getGradeRows,
      getPointRows,
      student_details
    } = this.state;
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
                      // onChange={event => this.handleChange(event)}
                      onChange={this.handleChange("courseId")}
                      InputLabelProps={{
                        shrink: true
                      }}
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
                      onChange={this.handleChange("courseName")}
                      InputLabelProps={{
                        shrink: true
                      }}
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
                      onChange={this.handleChange("courseCredits")}
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
                        InputLabelProps={{
                          shrink: true
                        }}
                        variant="filled"
                        style={{ width: 350 }}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                        value={this.state.editCourseId}
                        onChange={this.handleChange("editCourseId")}
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
                        onChange={this.handleChange("editCourseName")}
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
                        onChange={this.handleChange("editCourseCredits")}
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
                          onChange={this.handleChange("studentId")}
                          InputLabelProps={{
                            shrink: true
                          }}
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
                          onChange={this.handleChange("studnetName")}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                        <TextField
                          required
                          select
                          margin="dense"
                          id="department"
                          label="Department Name"
                          InputLabelProps={{
                            shrink: true
                          }}
                          variant="filled"
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          value={this.state.dptType}
                          style={{ margin: 15, width: 250 }}
                          className={classes.textField}
                          onChange={this.handleChange("dptType")}
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
                          InputLabelProps={{
                            shrink: true
                          }}
                          type="number"
                          variant="filled"
                          value={this.state.batchYear}
                          style={{ margin: 15, width: 250 }}
                          className={classes.textField}
                          onChange={this.handleChange("batchYear")}
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
                            id="courseid"
                            label="Course Id"
                            variant="filled"
                            value={this.state.cId}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true
                            }}
                            SelectProps={{
                              MenuProps: {
                                className: classes.menu
                              }
                            }}
                            style={{ margin: 15, width: 250 }}
                            onChange={this.handleChange("cId")}
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
                            id="semester1"
                            label="Semester"
                            variant="filled"
                            value={this.state.sem}
                            className={classes.textField}
                            style={{ margin: 15, width: 250 }}
                            onChange={this.handleChange("sem")}
                            InputLabelProps={{
                              shrink: true
                            }}
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
                            onChange={this.handleChange("cGrade")}
                            InputLabelProps={{
                              shrink: true
                            }}
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
                            id="semester2"
                            label="Semester"
                            InputLabelProps={{
                              shrink: true
                            }}
                            variant="filled"
                            value={this.state.sem2}
                            className={classes.textField}
                            style={{ margin: 15, width: 250 }}
                            onChange={this.handleChange("sem2")}
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
                            onChange={this.handleChange("spi")}
                            InputLabelProps={{
                              shrink: true
                            }}
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
                            onChange={this.handleChange("cpi")}
                            InputLabelProps={{
                              shrink: true
                            }}
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
                        onClick={this.addTranscriptMethod}
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
                  onClick={this.handleClickOpen5}
                >
                  Edit
                  <Edit className={classes.rightIcon} />
                </Button>

                <Dialog
                  fullScreen
                  open={this.state.open5}
                  onClose={this.handleClose5}
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
                        Modify Transcript
                      </Typography>
                      <Button color="inherit" onClick={this.handleClose5}>
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
                    <Card
                      className={classes.card}
                      style={{ marginTop: 50, height: 750, width: 350 }}
                    >
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
                          Edit Student Details
                        </Typography>
                        <br />
                      </CardContent>
                      <Stepper activeStep={activeStepStudent} alternativeLabel>
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
                          required
                          autoFocus
                          disabled={activeStepStudent === 1}
                          margin="dense"
                          id="student_id"
                          label="Student Id"
                          type="number"
                          variant="filled"
                          value={this.state.editstudentId}
                          style={{ margin: 15, width: 320 }}
                          className={classes.textField}
                          onChange={this.handleChange("editstudentId")}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                        <TextField
                          required
                          disabled={activeStepStudent === 0}
                          margin="dense"
                          id="student_name"
                          label="Student Name"
                          type="text"
                          variant="filled"
                          value={this.state.editstudnetName}
                          style={{ margin: 15, width: 320 }}
                          className={classes.textField}
                          onChange={this.handleChange("editstudnetName")}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                        <TextField
                          required
                          disabled={activeStepStudent === 0}
                          select
                          margin="dense"
                          id="department"
                          label="Department Name"
                          InputLabelProps={{
                            shrink: true
                          }}
                          variant="filled"
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          value={this.state.editdptType}
                          style={{ margin: 15, width: 320 }}
                          className={classes.textField}
                          onChange={this.handleChange("editdptType")}
                        >
                          {departments.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          required
                          disabled={activeStepStudent === 0}
                          margin="dense"
                          id="batch"
                          label="Batch Year"
                          InputLabelProps={{
                            shrink: true
                          }}
                          type="number"
                          variant="filled"
                          value={this.state.editbatchYear}
                          style={{ margin: 15, width: 320 }}
                          className={classes.textField}
                          onChange={this.handleChange("editbatchYear")}
                        />
                        <br />
                        <br />
                        <Divider />
                        <br />

                        {this.state.activeStepStudent === steps.length ? (
                          <div>
                            <Typography className={classes.instructions}>
                              Student Modified..
                            </Typography>
                            <Button
                              onClick={this.handleResetStudent}
                              color="primary"
                              variant="contained"
                            >
                              Reset
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Typography className={classes.instructions}>
                              {getStepContentStudent(activeStepStudent)}
                            </Typography>
                            <div>
                              <Button
                                disabled={activeStepStudent === 0}
                                onClick={this.handleBackStudent}
                                className={classes.backButton}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={this.modifyStudentMethod}
                              >
                                {activeStepStudent === steps.length - 1
                                  ? "Finish"
                                  : "Next"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>

                    <Card
                      className={classes.card}
                      style={{ marginTop: 50, height: 750, width: 350 }}
                    >
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          <b>Edit Course grade</b>
                        </Typography>
                        <br />
                        <Typography component="p">
                          Edit Student's Course Grade
                        </Typography>
                        <br />
                      </CardContent>

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
                          required
                          select
                          disabled={activeStepCourse === 1}
                          margin="dense"
                          id="courseid"
                          label="Course Id"
                          variant="filled"
                          value={this.state.editcId}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true
                          }}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          style={{ margin: 15, width: 320 }}
                          onChange={this.handleChange("editcId")}
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
                          disabled={activeStepCourse === 1}
                          margin="dense"
                          id="semester1"
                          label="Semester"
                          variant="filled"
                          value={this.state.editsem}
                          className={classes.textField}
                          style={{ margin: 15, width: 320 }}
                          onChange={this.handleChange("editsem")}
                          InputLabelProps={{
                            shrink: true
                          }}
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
                          disabled={activeStepCourse === 0}
                          margin="dense"
                          id="grade"
                          label="Grade"
                          variant="filled"
                          value={this.state.editcGrade}
                          className={classes.textField}
                          style={{ margin: 15, width: 320 }}
                          onChange={this.handleChange("editcGrade")}
                          InputLabelProps={{
                            shrink: true
                          }}
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
                        <br />
                        <br />
                        <Divider />
                        <br />

                        {this.state.activeStepCourse === steps.length ? (
                          <div>
                            <Typography className={classes.instructions}>
                              Course Grade Modified..
                            </Typography>
                            <Button
                              onClick={this.handleResetCourse}
                              color="primary"
                              variant="contained"
                            >
                              Reset
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Typography className={classes.instructions}>
                              {getStepContentCourse(activeStepCourse)}
                            </Typography>
                            <div>
                              <Button
                                disabled={activeStepCourse === 0}
                                onClick={this.handleBackCourse}
                                className={classes.backButton}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={this.modifyGradeMethod}
                              >
                                {activeStepCourse === steps.length - 1
                                  ? "Finish"
                                  : "Next"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>

                    <Card
                      className={classes.card}
                      style={{ marginTop: 50, height: 750, width: 350 }}
                    >
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          <b>Edit Semester Points</b>
                        </Typography>
                        <br />
                        <Typography component="p">
                          Edit Student's Semester Points
                        </Typography>
                        <br />
                      </CardContent>

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
                          required
                          select
                          disabled={activeStepPoint === 1}
                          margin="dense"
                          id="semester2"
                          label="Semester"
                          InputLabelProps={{
                            shrink: true
                          }}
                          variant="filled"
                          value={this.state.editsem2}
                          className={classes.textField}
                          style={{ margin: 15, width: 320 }}
                          onChange={this.handleChange("editsem2")}
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
                          disabled={activeStepPoint === 0}
                          margin="dense"
                          id="spi"
                          label="SPI"
                          type="text"
                          variant="filled"
                          value={this.state.editspi}
                          className={classes.textField}
                          style={{ margin: 15, width: 320 }}
                          onChange={this.handleChange("editspi")}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                        <TextField
                          required
                          disabled={activeStepPoint === 0}
                          margin="dense"
                          id="cpi"
                          label="CPI"
                          type="text"
                          variant="filled"
                          value={this.state.editcpi}
                          className={classes.textField}
                          style={{ margin: 15, width: 320 }}
                          onChange={this.handleChange("editcpi")}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                        <br />
                        <br />
                        <Divider />
                        <br />

                        {this.state.activeStepPoint === steps.length ? (
                          <div>
                            <Typography className={classes.instructions}>
                              points Modified..
                            </Typography>
                            <Button
                              onClick={this.handleResetPoint}
                              color="primary"
                              variant="contained"
                            >
                              Reset
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Typography className={classes.instructions}>
                              {getStepContentPoint(activeStepPoint)}
                            </Typography>
                            <div>
                              <Button
                                disabled={activeStepPoint === 0}
                                onClick={this.handleBackPoint}
                                className={classes.backButton}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={this.modifyPoints}
                              >
                                {activeStepPoint === steps.length - 1
                                  ? "Finish"
                                  : "Next"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* <Paper className={classes.root1} style={{ marginTop: 80 }}>
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
                          {getGradeRows.map(row => (
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
                          {getPointRows.map(row => (
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
                    </Paper> */}
                  </Grid>
                </Dialog>
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

                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ backgroundColor: "#eeeeee", height: "500%" }}
                  >
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="student_id"
                      label="Student Hash"
                      type="nutextmber"
                      variant="filled"
                      style={{ margin: 25, width: 750, height: 100 }}
                      value={this.state.studentTranscriptHash}
                      onChange={this.handleChange("studentTranscriptHash")}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style={{
                          backgroundColor: "#0d47a1",
                          margin: 50,
                          height: 55,
                          marginTop: 5,
                          width: 250
                        }}
                        onClick={this.getTranscript}
                      >
                        Get Transcript
                        <GetIcon className={classes.rightIcon} />
                      </Button>
                    </div>
                    <br />

                    <Paper
                      className={classes.root1}
                      style={{ marginTop: 80, width: 800 }}
                    >
                      <Typography
                        variant="h5"
                        component="h3"
                        style={{ margin: 10, padding: 10 }}
                      >
                        Student Details
                      </Typography>
                      <Table className={classes.table1}>
                        <TableHead>
                          <TableRow>
                            <CustomTableCell align="left">
                              Student Id
                            </CustomTableCell>
                            <CustomTableCell align="left">
                              Student name
                            </CustomTableCell>
                            <CustomTableCell align="left">
                              Department
                            </CustomTableCell>
                            <CustomTableCell align="center">
                              Batch
                            </CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow className={classes.row}>
                            <CustomTableCell align="left">
                              {student_details.studentId}
                            </CustomTableCell>
                            <CustomTableCell align="left">
                              {student_details.studentName}
                            </CustomTableCell>
                            <CustomTableCell align="left">
                              {student_details.dptType}
                            </CustomTableCell>
                            <CustomTableCell align="center">
                              {student_details.batchYear}
                            </CustomTableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Paper>

                    <Paper
                      className={classes.root1}
                      style={{ marginTop: 80, width: 800 }}
                    >
                      <Typography
                        variant="h5"
                        component="h3"
                        style={{ margin: 10, padding: 10 }}
                      >
                        Course Grades
                      </Typography>
                      <Table className={classes.table1}>
                        <TableHead>
                          <TableRow>
                            <CustomTableCell align="left">
                              Student Id
                            </CustomTableCell>
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
                          {getGradeRows.map(row => (
                            <TableRow className={classes.row} key={row.id}>
                              <CustomTableCell align="left">
                                {row.studentId}
                              </CustomTableCell>
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
                    <Paper
                      className={classes.root1}
                      style={{ marginTop: 80, width: 800 }}
                    >
                      <Typography
                        variant="h5"
                        component="h3"
                        style={{ margin: 10, padding: 10 }}
                      >
                        Semester Points
                      </Typography>
                      <Table className={classes.table1}>
                        <TableHead>
                          <TableRow>
                            <CustomTableCell align="left">
                              Student Id
                            </CustomTableCell>
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
                          {getPointRows.map(row => (
                            <TableRow className={classes.row} key={row.id}>
                              <CustomTableCell align="left">
                                {row.studentId}
                              </CustomTableCell>
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
            onChange={this.handleChange("getStudentIdHash")}
            InputLabelProps={{
              shrink: true
            }}
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
