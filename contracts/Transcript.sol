pragma solidity >=0.4.22 <0.6.0;

contract Transcript {
    
    address owner;
    
    // contract's constructor function
    constructor() public { 
        owner = msg.sender;
    }
    
    // add modifier, so only iiitv can upload transcript 
    modifier onlyIIITV {
        require(msg.sender == owner);
        _;    
    }
    
    // courses
    struct course {
        string courseId;
        string courseName;
        uint8 courseCredits;
    }

    uint16 public coursesCount;
    uint16 public courseGradeCount;
    uint16 public semPointsCount;
    modifier courseIdCheck(uint courseId) { require( courseId < coursesCount ); _;}

    // Enumeration for semesters
    enum semesters { semester1, semester2, semester3, semester4, semester5, semester6, semester7, semester8 }

    // student details
    struct student {
        uint32 studentId;
        string studnetName;
        string dptType;
        string batchYear;
    }
    
    // student hash storage
    struct studentHash {
        bytes32 hashvalue;
        uint32 studentId;
    }
    
    // student's couse grade
    struct courseGrade {
        uint32 studentId;
        string courseId;
        semesters semester;
        string grade;
    }
    
// keyss for couse grade
    struct gradeHash {
        bytes32 gradeKey;
        uint32 studentId;
        string courseId;
        semesters semester;
    }

    
    // student sem points
    struct points {
        uint32 studentId;
        semesters semester;
        string cpi;
        string spi;
    }
    
    // keys for points
    struct pointHash {
        bytes32 pointkey;
        uint32 studentId;
        semesters semester;
    }
    
    studentHash[] studenthashes;       //keys for studentDetails
    gradeHash[] gradeHashes;           // keys for courseGrade
    pointHash[] pointHashes;          // keys for points
    course[] courses;
    // mapping(uint => course) courses;
    
    mapping(bytes32 => student)  studentDetails;
    mapping(bytes32 => courseGrade)  courseGrades;
    mapping(bytes32 => points)  totalPoints;

    mapping(string => bool) isCourseExit;
    
    //events
    event courseAdded(string courseId);
    event studentAdded(uint32 studentId);
    event courseGradeAdded(bytes32 hashvalue);
    event gradePointAdded(bytes32 hashvalue);


    // check if student exits
    function checkStudent(bytes32 _hashvalue) public view returns (bool) {
        
        for(uint16 i =0; i< studenthashes.length; i++) {
            if(studenthashes[i].studentId == studentDetails[_hashvalue].studentId ){
                return true;
            }
        }
        return false;
    }
    
    function checkCourse(string memory _courseId) public view returns (bool) {
        
        if(isCourseExit[_courseId] == true){
            return false;
        }
        else return true;
    }
    
    //                  --------- ADD functions ---------
    
    
    //  add student hash and student details
    function addStudentDetails(string memory _randomValue, uint32  _studentId, string memory _studnetName, string memory _batchYear, string memory _dptType) public onlyIIITV {
        
        bytes32 hashvalue = getHash(_studentId); 
        
        require(studentDetails[hashvalue].studentId != _studentId);
        
        //generating hash value of student
        bytes32 hvalue;
        hvalue = sha256(abi.encodePacked(_studentId, _randomValue));
        studentHash memory hashes;
        
        //storing student hashes
        hashes = studentHash({
            studentId : _studentId,
            hashvalue : hvalue
        });
        
        studenthashes.push(hashes);
        
        // adding studentDetails
        studentDetails[hvalue].studentId = _studentId;
        studentDetails[hvalue].studnetName = _studnetName;
        studentDetails[hvalue].dptType = _dptType;
        studentDetails[hvalue].batchYear = _batchYear;

        emit studentAdded(_studentId);
    }
    
    // add course
    function addCourse(string memory _courseId, string memory _courseName, uint8 _courseCredits) public onlyIIITV {
        
        require(checkCourse(_courseId)); // add if course not exits
        
        course memory c;
        
        //storing course details
        c = course({
            courseId : _courseId,
            courseName : _courseName,
            courseCredits : _courseCredits
        });
        
        courses.push(c);

        // courses[coursesCount].courseId = _courseId;
        // courses[coursesCount].courseName = _courseId;
        // courses[coursesCount].courseCredits = _courseCredits;

        emit courseAdded(_courseId);
        coursesCount =  coursesCount +1;
        
        isCourseExit[_courseId] = true;
    }
    
    // add course grades
    function addCourseGrade(uint32 _studentId, string memory _courseId, uint8 _semester, string memory _grade ) public onlyIIITV {
        
        bytes32 hashvalue = sha256(abi.encodePacked(_studentId, _courseId, _semester));
        require(checkStudent(getHash(_studentId))); // add if student exits
        require(!checkCourse(_courseId)); // add only if course exits
        require(keccak256(abi.encodePacked(courseGrades[hashvalue].courseId)) != keccak256(abi.encodePacked(_courseId)));
        
        gradeHash memory key;
        
        //storing keys for coursegrade
        key = gradeHash({
            gradeKey : hashvalue,
            studentId : _studentId,
            courseId : _courseId,
            semester : semesters(_semester)
        });
        
        gradeHashes.push(key);
        
        courseGrades[hashvalue].studentId = _studentId;
        courseGrades[hashvalue].courseId = _courseId;
        courseGrades[hashvalue].semester = semesters(_semester);
        courseGrades[hashvalue].grade = _grade;
        courseGradeCount =  courseGradeCount +1;
        emit courseGradeAdded(hashvalue);
    }
    
    // student sem points
    function addPoints(uint32 _studentId, uint8 _semester, string memory _spi, string memory _cpi) public onlyIIITV {
        bytes32 hashvalue = sha256(abi.encodePacked(_studentId, _semester));
        require(checkStudent(getHash(_studentId))); // add if student exits;
        require(keccak256(abi.encodePacked(uint8(totalPoints[hashvalue].semester))) != keccak256(abi.encodePacked(_semester)));
        
        pointHash memory key;
        
        //storing keys for coursegrade
        key = pointHash({
            pointkey : hashvalue,
            studentId : _studentId,
            semester : semesters(_semester)
        });
        
        pointHashes.push(key);
        

        totalPoints[hashvalue].studentId = _studentId;
        totalPoints[hashvalue].semester = semesters(_semester);
        totalPoints[hashvalue].spi = _spi;
        totalPoints[hashvalue].cpi = _cpi;

        semPointsCount = semPointsCount+1;
        emit gradePointAdded(hashvalue);
        
    }
    
    
    //                        -------- MODIFY functions------
    
    
    // modify student details
    function changeStudentDetails(bytes32  _hashvalue, string memory _studnetName, string memory _batchYear, string memory _dptType) public onlyIIITV {
        
        require(checkStudent(_hashvalue));
        
        if(bytes(_studnetName).length != 0){
            studentDetails[_hashvalue].studnetName =_studnetName;
        }
        
        if(bytes(_dptType).length != 0){
            studentDetails[_hashvalue].dptType = _dptType;
        }
        
        if(bytes(_batchYear).length != 0){
            studentDetails[_hashvalue].batchYear = _batchYear;
        }
        
    }
    
    // modify course
    function changeCourse(string memory _courseId, string memory _courseName, uint8 _courseCredits) public onlyIIITV {
        
        require(!checkCourse(_courseId)); // add if course exits
        
        for(uint16 i =0; i< courses.length; i++) {

            if(keccak256(abi.encodePacked(courses[i].courseId)) == keccak256(abi.encodePacked(_courseId))) {
                if(bytes(_courseName).length != 0){
                    courses[i].courseName =_courseName;
                }
                
                if(_courseCredits != 0){
                    courses[i].courseCredits =_courseCredits;
                }
            }
        }
        
    }    
    
    // modify course grades
    function changeCourseGrade(uint32 _studentId, string memory _courseId, uint8 _semester, string memory _grade ) public onlyIIITV {
        
        bytes32 hashvalue = getCourseGradeHash(_studentId, _courseId, _semester);
        require(checkStudent(getHash(_studentId))); // add if student exits
        require(!checkCourse(_courseId)); // add only if course exits
        require(keccak256(abi.encodePacked(courseGrades[hashvalue].courseId)) == keccak256(abi.encodePacked(_courseId))); // add if course graded
        
        
        if(bytes(_grade).length != 0){
            courseGrades[hashvalue].grade = _grade;
        }
    }
    
    // modify points grades
    function changePoints(uint32 _studentId, uint8 _semester, string memory _spi, string memory _cpi ) public onlyIIITV {
        
        bytes32 hashvalue = getPointsHash(_studentId, _semester);
        require(checkStudent(getHash(_studentId))); // add if student exits
        require(uint8(totalPoints[hashvalue].semester) == _semester); // add if course graded
        
        if(bytes(_spi).length != 0){
            totalPoints[hashvalue].spi = _spi;
        }
        
        if(bytes(_cpi).length != 0){
            totalPoints[hashvalue].cpi = _cpi;
        }
    }
    
    
    //                        --------  GET functions------
    
    
    // get hash of a student transcript
    function getHash(uint32 _studentId) public view returns (bytes32){
        for(uint16 i =0; i< studenthashes.length; i++) {

            if(studenthashes[i].studentId == _studentId) {
                    return (studenthashes[i].hashvalue);
            }
        }
    }

        // get studentId of a student transcript
    function getStudentId(bytes32 _hash) public view returns (uint32){
        for(uint16 i =0; i< studenthashes.length; i++) {

            if(studenthashes[i].hashvalue == _hash) {
                    return (studenthashes[i].studentId);
            }
        }
    }
    
    // get hash of a course grade
    function getCourseGradeHash(uint32 _studentId, string memory _courseId, uint8 _semester) public view returns (bytes32){
        for(uint16 i =0; i< gradeHashes.length; i++) {

            if(gradeHashes[i].studentId == _studentId && keccak256(abi.encodePacked(gradeHashes[i].courseId)) == keccak256(abi.encodePacked(_courseId)) && uint8(gradeHashes[i].semester) == _semester) {
                    return (gradeHashes[i].gradeKey);
            }
        }
    }
    
    // get hash of a points transcript
    function getPointsHash(uint32 _studentId, uint8 _semester) public view returns (bytes32){
        for(uint16 i =0; i< pointHashes.length; i++) {

            if(pointHashes[i].studentId == _studentId  && uint8(pointHashes[i].semester) == _semester) {
                    return (pointHashes[i].pointkey);
            }
        }
    }
    
    // get student details
    function getStudentDetails(bytes32 hashvalue) public view returns (uint32 , string memory , string memory , string memory) {
        
        return (studentDetails[hashvalue].studentId, studentDetails[hashvalue].studnetName, studentDetails[hashvalue].dptType, studentDetails[hashvalue].batchYear);
        
    }
    
    // get course
    function getCourse(string memory _courseId) public view returns(string memory, string memory, uint8){
        
        for(uint16 i =0; i< courses.length; i++) {
            if(keccak256(abi.encodePacked(courses[i].courseId)) == keccak256(abi.encodePacked(_courseId))) {
                return(courses[i].courseId, courses[i].courseName, courses[i].courseCredits);
            }    
        }
    }

        // get course by index
    function getCourseByIndex(uint16  _index) public view returns(string memory, string memory, uint8){
        
        course storage c = courses[_index];
        return(c.courseId, c.courseName, c.courseCredits);

    }
    
    // get course grade -- transcript
    function getCourseGrade(bytes32 hashvalue) public view returns(uint32, string memory, uint8, string memory) {
        // if(keccak256(abi.encodePacked(courseGrades[hashvalue].courseId)) == keccak256(abi.encodePacked(_courseId))){
            return(courseGrades[hashvalue].studentId, courseGrades[hashvalue].courseId, uint8(courseGrades[hashvalue].semester), courseGrades[hashvalue].grade );
        // }       
    }
    
    // get point grade -- transcript
    function getPoints(bytes32 hashvalue) public view returns(uint32, uint8, string memory, string memory) {
        // if(uint8(totalPoints[hashvalue].semester) == _semester){
            return(totalPoints[hashvalue].studentId, uint8(totalPoints[hashvalue].semester), totalPoints[hashvalue].spi, totalPoints[hashvalue].cpi );
        // }        
    }
    

    

}