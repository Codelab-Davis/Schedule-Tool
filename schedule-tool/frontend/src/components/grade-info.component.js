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

// Main component to export from thid module.
// This is composed of 2 parts
// - List of course, quarter and instructor selection and add selected class
// - Chart area to display grade information of selected class

// Course drop down selection component
// Selects course, quatrter and instructor to identify unique course or set of courses to average the grades
export default class GradePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // course detail information from backend server that fetch from mongo DB
    this.state.courseDetails = [];

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

    this.gradeNames = [];
    this.gradeIds.forEach((grade) =>
      this.gradeNames.push(
        grade.replace("plus", "+").replace("minus", "-").toUpperCase()
      )
    );

    this.state.coursesGradesData = [];
    this.state.formattedData = [];
    this.state.chartLegend = [];

    this.gradeNames.forEach((name) => {
      this.state.formattedData.push({ name: name });
    });

    this.MAX_COURSE_DETAIL = 4;
    this.COURSE_DETAIL_COLOR = ["#FF8189", "#00B2E3", "#FFDA6D", "#74EA37"];

    // selected course, quarter and instructor information
    this.state.selectedCourse = null;
    this.state.selectedQuarter = null;
    this.state.selectedInstructor = null;

    this.state.enableAddCourse = false;

    this.state.courseOptions = [];
    this.state.quarterOptions = [];
    this.state.instructorOptions = [];

    this.handleCourseChangeRef = this.handleCourseChange.bind(this);
    this.handleQuarterChangeRef = this.handleQuarterChange.bind(this);
    this.handleInstructureChangeRef = this.handleInstructureChange.bind(this);
    this.addCourseRef = this.addCourse.bind(this);
    this.handleCourseDeleteRef = this.handleCourseDelete.bind(this);
    this.courseListRef = React.createRef();
    this.quarterListRef = React.createRef();
    this.instructorListRef = React.createRef();
  }

  componentDidMount() {
    // get course information from server backend. This is onetime action when webpage is loaded or reloaded
    this.getCourseData();
  }

  handleCourseDelete(event) {
    var deleteIndex = parseInt(event.target.getAttribute("data-index"));
    // remove from coursesGradeData, formattedData, chartLegend

    // console.log(this.state.coursesGradesData);
    // var gradeAdjust = this.state.coursesGradesData;
    // var formattedAdust = this.state.formattedData;
    // var chartLegendAdjust = this.state.chartLegend;

    // gradeAdjust.splice(deleteIndex, 1);
    // formattedAdust.splice(deleteIndex, 1);
    // chartLegendAdjust.splice(deleteIndex, 1);

    // this.setState({
    //   coursesGradesData : gradeAdjust,
    //   formattedData: formattedAdust,
    //   chartLegend: chartLegendAdjust
    // })

    this.state.coursesGradesData.splice(deleteIndex, 1);
    this.state.formattedData.splice(deleteIndex, 1);
    this.formatGrades();
  }

  // call backend ot fetch the course information
  async getCourseData() {
    // create query to pass with REST request
    var reqParams = new URLSearchParams({});
    ["course_id", "name"].forEach((groupItem) => {
      reqParams.append("group[]", groupItem);
    });
    ["quarter", "instructor"].forEach((groupItem) => {
      reqParams.append("detail[]", groupItem);
    });

    // Call server to get the information
    return axios
      .get("http://localhost:5000/detail", { params: reqParams })
      .then((response) => {
        // Use setState function and that will trigger re-render
        this.state.courseDetails = response.data;
        this.setState({ loadingInfo: false });
        // this function populates the course list
        this.updateCourseList();
        //console.log(this.state.courseDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // populate course list from course detail information
  updateCourseList() {
    var courseList = [];
    this.state.courseDetails.forEach((course) => {
      courseList.push({
        value: course.course_id,
        label: course.course_id + "-" + course.name,
      });
    });

    // this will trigger rerender and course list will show up
    this.setState({ courseOptions: courseList });
  }

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

    if (this.state.selectedInstructor != "All Instructors") {
      reqParamsMatchList.push("instructor");
      reqParamsMatchList.push(this.state.selectedInstructor);
    }

    reqParamsMatchList.forEach((matchItem) => {
      reqParams.append("match[]", matchItem);
    });

    var reqParamsGroupList = ["course_id", "quarter"];

    if (this.state.selectedInstructor != "All Instructors") {
      reqParamsGroupList.push("instructor");
    }

    // get all courses for this ID in given quarter conducted by same instructor
    reqParamsGroupList.forEach((groupItem) => {
      reqParams.append("group[]", groupItem);
    });
    // request full detail of grouped and matched courses

    reqParams.append("fulldetail", true);

    //console.log("Just before axios" + this.courseDisplayLimit + " " + this.courseIdxStart);
    // send request to server

    return axios
      .get("http://localhost:5000/detail", { params: reqParams })
      .then((response) => {
        var fullCourse = [];
        response.data[0].courses.forEach((details) => {
          fullCourse.push(details);
        });

        var courseAccumulation = { info: {}, grades: {}, percentages: {} };
        courseAccumulation["info"]["courseID"] = fullCourse[0].course_id;
        courseAccumulation["info"]["name"] = fullCourse[0].name;
        courseAccumulation["info"]["quarter"] = fullCourse[0].quarter;
        // courseAccumulation["info"]["instructor"] = fullCourse[0].instructor;

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

        for (
          var indexGrade = 0;
          indexGrade < this.gradeNames.length;
          indexGrade++
        ) {
          var gradeName = this.gradeNames[indexGrade];
          courseAccumulation["percentages"][gradeName] =
            (courseAccumulation["grades"][gradeName] * 100) / totalGrades;
        }

        if (this.state.coursesGradesData.length < this.MAX_COURSE_DETAIL) {
          this.state.coursesGradesData.push(courseAccumulation);
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
    var temp = [];
    var tempLegend = [];

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

    var colorIndex = 0;
    this.state.coursesGradesData.forEach((course) => {
      var name = course.info.courseID;
      tempLegend.push(
        <Bar dataKey={name} fill={this.COURSE_DETAIL_COLOR[colorIndex]} />
      );
      colorIndex++;
    });

    this.setState({ formattedData: temp, chartLegend: tempLegend });
  }

  addCourse(event) {
    // console.log(this.state.selectedCourse);
    // console.log(this.state.selectedQuarter);
    // console.log(this.state.selectedInstructor);

    this.getFullCourseDetail();

    this.setState({
      enableAddCourse: false,
      quarterOptions: [],
      instructorOptions: [],
    });

    this.courseListRef.current.setState({ value: null });
    this.quarterListRef.current.setState({ value: null });
    this.instructorListRef.current.setState({ value: null });
  }

  handleInstructureChange(event) {
    this.state.selectedInstructor = event.value;
    this.setState({ enableAddCourse: true });
  }

  handleQuarterChange(event) {
    this.state.selectedQuarter = event.value;
    this.state.selectedInstructor = null;

    var filteredIDInfo = this.state.courseDetails.filter(
      (course) => course.course_id == this.state.selectedCourse
    );

    // console.log(filteredIDInfo);

    var filteredQuarterInfo = filteredIDInfo[0].courses.filter(
      (course) => course.quarter == this.state.selectedQuarter
    );
    // console.log(filteredQuarterInfo);

    var instructorSet = new Set();
    filteredQuarterInfo.forEach((quarter) => {
      instructorSet.add(quarter.instructor);
    });

    var instructorList = [];
    instructorSet.forEach((instructor) => {
      instructorList.push({
        value: instructor,
        label: instructor,
      });
    });

    if (instructorList.length > 1) {
      instructorList.push({
        value: "All Instructors",
        label: "All Instructors",
      });
    }

    this.instructorListRef.current.setState({ value: null });
    this.setState({
      instructorOptions: instructorList,
      enableAddCourse: false,
    });
  }

  // called when course is selected - populate qaurter list here
  handleCourseChange(event) {
    // get the selected course and filter course detail info for desired course ID
    this.state.selectedCourse = event.value;
    this.state.selectedQuarter = null;
    this.state.selectedInstructor = null;

    this.state.instructorOptions = [];
    var filteredInfo = this.state.courseDetails.filter(
      (course) => course.course_id == this.state.selectedCourse
    );

    var quarterSet = new Set();
    filteredInfo[0].courses.forEach((course) => {
      quarterSet.add(course.quarter);
    });

    var quarterList = [];
    quarterSet.forEach((quarter) => {
      quarterList.push({
        value: quarter,
        label: quarter,
      });
    });

    this.setState({ quarterOptions: quarterList, enableAddCourse: false });
    this.quarterListRef.current.setState({ value: null });
    this.instructorListRef.current.setState({ value: null });

    // console.log(filteredInfo);
    // console.log(quarterList);
  }

  render(props) {
    // console.log(this.showCourseTable);

    // console.log(this.state.selectedCourse);

    // console.log(this.state.formattedData);
    // console.log(this.state.chartLegend);
    // console.log(this.state.coursesGradesData);

    var borderStyle = "1px solid black";
    // var borderStyle = "none";

    var courseLegend = [];
    var index = 0;
    this.state.coursesGradesData.forEach((course) => {
      courseLegend.push(
        <div>
          <button
            type="button"
            class="btn btn-outline-dark"
            data-index={index}
            style={{
              display: this.state.chartLegend.length > index ? "" : "none",
              height: "40%",
              width: "50%",
            }}
            onClick={this.handleCourseDeleteRef}
          >
            {course["info"]["courseID"]}
          </button>
        </div>
      );
    });

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
              placeholder="Search for a class"
            />
          </div>
          <div className="col-3" style={{ border: borderStyle }}>
            <WindowedSelect
              ref={this.quarterListRef}
              placeholder="Quarter"
              isDisabled={this.state.quarterOptions.length == 0}
              options={this.state.quarterOptions}
              onChange={this.handleQuarterChangeRef}
            />
          </div>
          <div className="col-3" style={{ border: borderStyle }}>
            <WindowedSelect
              ref={this.instructorListRef}
              placeholder="Instructor"
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
            >
              Add Class
            </button>
          </div>
          <div className="col-1" style={{ border: borderStyle }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            border: borderStyle,
            margin: "4%",
            width: "70vw  ",
            height: "70vh",
            backgroundColor: "yellow",
          }}
        >
          <div
            style={{
              flexGrow: 1,
              flexShrink: 1,
              border: borderStyle,
              backgroundColor: "blue",
            }}
          >
            <ResponsiveContainer>
              <BarChart
                width="99.8%"
                height="99.8%"
                data={this.state.formattedData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {this.state.chartLegend}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ border: borderStyle, backgroundColor: "green"}}>
            {courseLegend}
          </div>
        </div>
      </div>
    );
  }
}
