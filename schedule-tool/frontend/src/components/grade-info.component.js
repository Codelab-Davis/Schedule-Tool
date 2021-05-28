import React, { Component, PureComponent } from "react";
import Select, { createFilter } from "react-select";
import axios from "axios";
import WindowedSelect from "react-windowed-select";
import {
  Area,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ComposedChart } from "recharts";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

// Default class to export
// This component contains two main sections
//    1. selection of course on top of page
//    2. Graph of grades and legend on bottom of page
export default class GradePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // raw course details from the database
    this.state.courseDetails = [];

    // ID of grades (to be converted to letter grades)
    // useful because these match the fields of the database
    this.gradeIds = [
      "aplus",
      "a",
      "aminus",
      "bplus",
      "b",
      "bminus",
      "cplus",
      "c",
      "cminus",
      "dplus",
      "d",
      "dminus",
      "f",
      "Y",
      "P",
      "NP",
      "I",
    ];

    // converting the name of the grade to the letter grade so that we can display them
    this.gradeNames = [];
    this.gradeIds.forEach((grade) =>
      this.gradeNames.push(

        // simply replacing the "plus" with a "+" and a "minus" with a "-" (all uppercase)
        grade.replace("plus", "+").replace("minus", "-").toUpperCase()
      )
    );
    
    // extracted data from the database
    this.state.coursesGradesData = [];

    // data in the format of the graph data input 
    this.state.formattedData = [];

    // class names for legend (chart requires this so that it knows which courses to display)
    this.state.chartLegend = [];
    
    // must initialize our array of maps with the grades
    // grade is key and value is map (class name key, percentage of grade value)
    // e.g.
    // A+ : {
    // class 1: percentage 1
    // class 2: percentage 2
    //}
    this.gradeNames.forEach((name) => {
      this.state.formattedData.push({ name: name });
    });

    // maximum number of classes to add
    this.MAX_COURSE_DETAIL = 4;

    // style color taken from style sheet
    this.COURSE_DETAIL_COLOR = ["#FF8189", "#00B2E3", "#FFDA6D", "#74EA37"];

    // selected course, quarter and instructor information
    this.state.selectedCourse = null;
    this.state.selectedQuarter = null;
    this.state.selectedInstructor = null;

    // controlls if course is able to be added
    // course, quarter, and instructor must be picked first
    this.state.enableAddCourse = false;

    // options for the fields
    // these are the values that are presented to the user to choose from
    this.state.courseOptions = [];
    this.state.quarterOptions = [];
    this.state.instructorOptions = [];

    // references to functions that handle field selections
    this.handleCourseChangeRef = this.handleCourseChange.bind(this);
    this.handleQuarterChangeRef = this.handleQuarterChange.bind(this);
    this.handleInstructureChangeRef = this.handleInstructureChange.bind(this);
    
    // reference to function that handles course add / delete
    this.addCourseRef = this.addCourse.bind(this);
    this.handleCourseDeleteRef = this.handleCourseDelete.bind(this);

    // used for placeholder values
    this.courseListRef = React.createRef();
    this.quarterListRef = React.createRef();
    this.instructorListRef = React.createRef();
  }

  // get course information from server backend. This is onetime action when webpage is loaded or reloaded
  componentDidMount() {
    this.getCourseData();
  }

  // handles course deletion
  handleCourseDelete(event) {

    // get the index of course to be deleted from the event
    // we have added index attribute to each course card so we know which one was deleted
    var deleteIndex = parseInt(event.target.getAttribute("data-index"));

    // push the color of the deleted course to the array of colors so that the next added course can take the color
    // important so that courses that were not deleted can stay the same color
    this.COURSE_DETAIL_COLOR.push(this.state.coursesGradesData[deleteIndex]["info"]["color"]);
    
    // remove the course from the course grade data
    this.state.coursesGradesData.splice(deleteIndex, 1);

    // reformat the grades so that display can be updated
    this.formatGrades();
  }

  // call backend to fetch the course information
  async getCourseData() {

    // create query to pass with REST request
    var reqParams = new URLSearchParams({});

    // group by course id and name
    ["course_id", "name"].forEach((groupItem) => {
      reqParams.append("group[]", groupItem);
    });

    // also get the quarter and instructor info details
    ["quarter", "instructor"].forEach((groupItem) => {
      reqParams.append("detail[]", groupItem);
    });

    // Call server to get the information
    return axios
      .get("http://localhost:5000/detail/grades", { params: reqParams })
      .then((response) => {

        // save the response data into state variable
        this.state.courseDetails = response.data;

        // this function populates the course list
        this.updateCourseList();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // populate course list from course detail information
  updateCourseList() {

    // empty course list
    var courseList = [];

    // add the all the courses we recieved from database into array
    this.state.courseDetails.forEach((course) => {
      courseList.push({
        value: course.course_id + course.name,

        // as will appear in the dropdown menu
        label: <h5 style={{marginTop: "5px"}}>{course.course_id} - {course.name}</h5>
      });
    });

    // this will trigger rerender and course list will show up
    this.setState({ courseOptions: courseList });
  }

  // once a course is added, we will make another query to the database to get the full course details
  async getFullCourseDetail() {
    // create search parameter for course detail info
    var reqParams = new URLSearchParams({});

    // match ID, quarter and instructor. Since groupby and match is identical, expect it to give array size 1 with
    // all matches courses
    var reqParamsMatchList = [
      "course_id",
      this.state.selectedCourse,
      "quarter",
      this.state.selectedQuarter,
    ];

    // if user did not select All instructors, then match specified instructor
    // otherwise don't match instructor to get all instructors for given course in given quarter
    if (this.state.selectedInstructor != "All Instructors") {
      reqParamsMatchList.push("instructor");
      reqParamsMatchList.push(this.state.selectedInstructor);
    }

    reqParamsMatchList.forEach((matchItem) => {
      reqParams.append("match[]", matchItem);
    });

    var reqParamsGroupList = ["course_id", "quarter"];

    // if user did not select All instructors, then group by instructor
    if (this.state.selectedInstructor != "All Instructors") {
      reqParamsGroupList.push("instructor");
    }

    // get all courses for this ID in given quarter conducted by same instructor
    reqParamsGroupList.forEach((groupItem) => {
      reqParams.append("group[]", groupItem);
    });

    // request full detail of grouped and matched courses
    reqParams.append("fulldetail", true);

    // send request to server
    return axios
      .get("http://localhost:5000/detail/grades", { params: reqParams })
      .then((response) => {

        // save the data (classes that match our query) into array
        var fullCourse = [];
        response.data[0].courses.forEach((details) => {
          fullCourse.push(details);
        });

        // converts data from database into format we can use
        var courseAccumulation = { info: {}, grades: {}, percentages: {} };
        console.log("here in the axios thing");
        // basic course info
        courseAccumulation["info"]["courseID"] = fullCourse[0].course_id;
        courseAccumulation["info"]["name"] = fullCourse[0].name;
        courseAccumulation["info"]["quarter"] = fullCourse[0].quarter;
        courseAccumulation["info"][
          "instructor"
        ] = this.state.selectedInstructor;
        courseAccumulation["info"]["color"] = this.COURSE_DETAIL_COLOR.pop();

        // calculating the total amount of students who had each grade
        var totalGrades = 0;
        for (
          var indexGrade = 0;
          indexGrade < this.gradeIds.length;
          indexGrade++
        ) {
          var gradeId = this.gradeIds[indexGrade];
          var gradeName = this.gradeNames[indexGrade];
          courseAccumulation["grades"][gradeName] = 0;
          fullCourse.forEach((course) => {
            courseAccumulation["grades"][gradeName] += course[gradeId];
            totalGrades += course[gradeId];
          });
        }

        // calculating the percentages from each course grade data
        for (
          var indexGrade = 0;
          indexGrade < this.gradeNames.length;
          indexGrade++
        ) {
          var gradeName = this.gradeNames[indexGrade];
          courseAccumulation["percentages"][gradeName] =
            parseFloat(((courseAccumulation["grades"][gradeName] * 100) / totalGrades).toFixed(2));
        }

        // only finalize the class if we have space for it
        if (this.state.coursesGradesData.length < this.MAX_COURSE_DETAIL) {
          this.state.coursesGradesData.push(courseAccumulation);

          // reformat the data to refresh the display
          this.formatGrades();
        } else {
          console.log("too many classes added already");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  formatGrades() {

    // chart needs this to graph data
    var temp = [];
    var tempLegend = [];

    // format the data so that the chart can read it
    this.state.formattedData.forEach((gradeData) => {
      var name = gradeData["name"];
      var gradeMap = { name: name };
      this.state.coursesGradesData.forEach((course) => {
        var id = course.info.courseID;
        var grade = course.percentages[name];
        gradeMap[id] = grade;
      });

      temp.push(gradeMap);
    });

    // format the legend so the chart knows which data to display
    this.state.coursesGradesData.forEach((course) => {
      var name = course.info.courseID;
      tempLegend.push(
        <Bar dataKey={name} fill={course["info"]["color"]} radius={[7, 7, 7, 7]}/>
      );
    });

    // set the state to rerender the new classes
    this.setState({ formattedData: temp, chartLegend: tempLegend });
  }

  // handles adding a course
  addCourse(event) {

    // get the full course detail from the database
    this.getFullCourseDetail();

    // if we have just added a course, then clear quarter and instructor lists so that the user can choose again
    // disable adding course button until user has filled out all 3 fields
    this.setState({
      enableAddCourse: false,
      quarterOptions: [],
      instructorOptions: [],
    });

    // clear the selected options from the dropdown menu
    this.courseListRef.current.setState({ value: null });
    this.quarterListRef.current.setState({ value: null });
    this.instructorListRef.current.setState({ value: null });
  }

  // handles when instructor has been selected
  handleInstructureChange(event) {

    // set the selected instructor
    this.state.selectedInstructor = event.value;

    // course is not eligible to be added
    this.setState({ enableAddCourse: true });
  }

  // handles quarter selection
  handleQuarterChange(event) {

    // set the selected quarter
    this.state.selectedQuarter = event.value;

    // clear the selected instructor
    this.state.selectedInstructor = null;

    // filter our course info to get only the courses that match our selected course
    var filteredIDInfo = this.state.courseDetails.filter(
      (course) => course.course_id == this.state.selectedCourse
    );
      console.log("here in the filteredIDInfo");
      console.log(filteredIDInfo);
    // filter further to get only the courses that match our selected quarter
    var filteredQuarterInfo = filteredIDInfo[0].courses.filter(
      (course) => course.quarter == this.state.selectedQuarter
    );
    
    // create a new set of instructors
    // we have a set so that we only display unique instructors, not repeated
    var instructorSet = new Set();
    filteredQuarterInfo.forEach((quarter) => {
      instructorSet.add(quarter.instructor);
    });

    // create instructor list
    var instructorList = [];
    instructorSet.forEach((instructor) => {
      instructorList.push({
        value: instructor,
        
        // as displayed on the dropdown menu
        label: <h5 style={{marginTop: "5px"}}>{instructor}</h5>
      });
    });

    // if we have more than 1 instructor, then give the option for All instructors
    if (instructorList.length > 1) {
      instructorList.push({
        value: "All Instructors",

        // as displayed on the dropdown menu
        label: <h5 style={{marginTop: "5px"}}>All Instructors</h5>
      });
    }

    // reset the previous selected instructor
    this.instructorListRef.current.setState({ value: null });
    
    // rerender the list of instructors
    this.setState({
      instructorOptions: instructorList,
      enableAddCourse: false,
    });
  }

  // called when course is selected - populate qaurter list here
  handleCourseChange(event) {

    // get the selected course and filter course detail info for desired course ID
    this.state.selectedCourse = event.value;

    // if new course is selected, reset the previous selected quarter and instructor
    this.state.selectedQuarter = null;
    this.state.selectedInstructor = null;

    // clear the instructor options
    this.state.instructorOptions = [];

    // filter the courses to match our course id
    var filteredInfo = this.state.courseDetails.filter(
      (course) => course.course_id == this.state.selectedCourse
    );
    
    // create a set of quarters so that we don't display any repeated quarters
    var quarterSet = new Set();
    filteredInfo[0].courses.forEach((course) => {
      quarterSet.add(course.quarter);
    });

    // create our quarter list to display
    var quarterList = [];
    quarterSet.forEach((quarter) => {
      quarterList.push({
        value: quarter,

        // as seen on the display
        label: <h5 style={{marginTop: "5px"}}>{quarter}</h5>,
      });
    });

    // set the state to rerender
    this.setState({ quarterOptions: quarterList, enableAddCourse: false });
    this.quarterListRef.current.setState({ value: null });
    this.instructorListRef.current.setState({ value: null });

  }

  // main render function
  render(props) {

    // border style macro
    var borderStyle = "none";

    // empty course legend
    // change values as courses are added
    var courseLegend = [<div></div>, <div></div>, <div></div>, <div></div>];

    // iterate through all the selected courses
    var index = 0;
    this.state.coursesGradesData.forEach((course) => {
      
      // calculate course average
      var gpaValues = [100, 97, 93, 90, 87, 83, 80, 77, 73, 70, 67, 63, 60];

      var average = 0;

      // weighted average
      for(var i = 0; i < 13; i++) {
        var gradeName = this.gradeIds[i].replace("plus", "+").replace("minus", "-").toUpperCase();
        average += (gpaValues[i] * (course["percentages"][gradeName] / 100));
      }

      // must normalize our average because a percentage of the class may have received a non-letter grade (P, NP, etc)
      var nonGrade = 0;
      for(var i = 13; i < 17; i++) {
        var gradeName = this.gradeIds[i].replace("plus", "+").replace("minus", "-").toUpperCase();
        nonGrade += (course["percentages"][gradeName] / 100)
      }

      average = average / (1-nonGrade);

      // get the letter grade from the calculated average
      var averageIndex = 0;
      for(var i = 0; i < 13; i++) {
        if(average >= gpaValues[i]) {
          averageIndex = i - 1;
          break;
        }
      }

      // if class somehow has all A+, then we only give them A+
      averageIndex = averageIndex < 0 ? 0 : averageIndex;
      var averageGrade = this.gradeIds[averageIndex].replace("plus", "+").replace("minus", "-").toUpperCase();

      // if class is P/NP, then average will be 0
      // in this case, average grade is not available
      if(!average) {
        averageGrade = "N/A";
      } 

      // create the html of the course legend
      courseLegend[index] = (
        <div
          style={{
            border: "2px solid #BEBEBE",
            borderRadius: "10px",
            padding: "10px",
            whiteSpace: "nowrap",
            
          }}
        >
          <div style={{display: "flex", flexDirection:"row"}}>
            <span
              className="dot"
              style={{
                borderRadius: "50%",
                backgroundColor: course["info"]["color"],
                display: "inline-block",
                height: "12px",
                width: "12px",
                marginRight: "10px",
                marginTop: "6px"
              }}
            ></span>
            <h3>{course["info"]["courseID"]}</h3>
            <button
              data-index={index}
              type="button"
              className="btn float-right"
              style={{ borderStyle: "none"}}
              onClick={this.handleCourseDeleteRef}
              style={{
                marginLeft: "auto",
                color: "red",
                fontSize: "20px",
                marginTop: "-10px"
              }}
              
            >
              x
            </button>

          </div>

          <h5 style={{ color: "#BEBEBE" }}>{course["info"]["name"]}</h5>
          <h5 style={{ color: "#BEBEBE" }}>
            {" "}
            {course["info"]["quarter"]} - {course["info"]["instructor"]}{" "}
          </h5>
          <h4 style={{fontWeight: "bold"}}> 
              Course average
          </h4>
          <h4 style={{marginLeft: "10px"}}> 
              {averageGrade}
          </h4>

          <h4>

          </h4>
        </div>
      );

      index++;
    });
    
    // create the html of the placeholderd of the dropdown menu
    var classPlaceholder = <h5 style={{marginTop: "5px", color: "#BEBEBE"}}> Search for a class </h5>;
    var quarterPlaceholder = <h5 style={{marginTop: "5px", color: "#BEBEBE"}}> Quarter </h5>;
    var instructorPlaceholder = <h5 style={{marginTop: "5px", color: "#BEBEBE"}}> Instructor </h5>;
  
    // return main component
    return (
      <div>
        <div
          className="row"
          style={{
            border: borderStyle,
            marginTop: "3rem",
            marginBottom: "7rem",
          }}
        >
          <div className="col-1" style={{ border: borderStyle }} />
          <div className="col-3" style={{ border: borderStyle }}>
            <WindowedSelect
              ref={this.courseListRef}
              onChange={this.handleCourseChangeRef}
              options={this.state.courseOptions}
              placeholder={classPlaceholder}
              />
          </div>
          <div className="col-3" style={{ border: borderStyle }}>
            <WindowedSelect
              ref={this.quarterListRef}
              placeholder={quarterPlaceholder}
              isDisabled={this.state.quarterOptions.length == 0}
              options={this.state.quarterOptions}
              onChange={this.handleQuarterChangeRef}
            />
          </div>
          <div className="col-3" style={{ border: borderStyle }}>
            <WindowedSelect
              ref={this.instructorListRef}
              placeholder={instructorPlaceholder}
              isDisabled={this.state.instructorOptions.length == 0}
              options={this.state.instructorOptions}
              onChange={this.handleInstructureChangeRef}
            />
          </div>
          <div className="col-1" style={{ border: borderStyle }}>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!this.state.enableAddCourse}
              onClick={this.addCourseRef}
              style={{
                fontSize: "15px",
                borderRadius: "5px",
                width: "125px",
                height: "40px",
                backgroundColor: "#162857"
              }}
              
            >
              Add Class
            </button>
          </div>
          <div className="col-1" style={{ border: borderStyle }} />
        </div>

        {/* graph and legend row*/}
        <div
          style={{
            display: "flex",
            flexDirection: "row",

            border: borderStyle,
            margin: "4%",
            width: "92vw  ",
            height: "70vh",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flexGrow: 1,
              flexShrink: 1,
              width: "65%",
              border: borderStyle,
            }}
          >
            <ResponsiveContainer>
            
              <BarChart
                width="99.8%"
                height="99.8%"
                
                data={this.state.formattedData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20}}
                grid
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" tick={{fontSize: "15px"}} tickLine={false}/>
                <YAxis tick={{fontSize: "15px"}} tickLine={false} unit="%"/>
                <Tooltip />
                <Legend content={<div></div>} />
                {this.state.chartLegend}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              display: "flex",
              width: "35%",
              height: "auto",
              border: borderStyle,
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="table table-borderless"
              style={{
                borderCollapse: "separate",
                borderSpacing: "10px",
                width: "auto",
              }}
            >
              <tbody>
                <tr>
                  <td>{courseLegend[0]}</td>
                  <td>{courseLegend[1]}</td>
                </tr>
                <tr>
                  <td>{courseLegend[2]}</td>
                  <td>{courseLegend[3]}</td>
                </tr>
              </tbody>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
