import React, { Component, PureComponent } from "react";
import Select, { createFilter } from "react-select";
import axios from "axios";
import WindowedSelect from "react-windowed-select";
import {Area,Line,BarChart,LineChart,Bar,Cell,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from "recharts";
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
        this.state.courses = []; //this stores the course jsons from the database
        this.state.formatted_data_for_graph = [];
        this.state.selected_courses_aggreage = [];
        this.state.chartLegend = [];

        //store the drop down menu opstions
        this.state.course_drop_down_menu_options = [];
        this.state.quarter_drop_down_menu_options = [];
        this.state.instructor_drop_down_menu_options = [];

        //selected values from the drop down menus
        this.state.selected_course_id = null;
        this.state.selected_course_id_quarter = null;
        this.state.selected_course_id_quarter_instructor = null;
        this.state.enableAddCourse = false;

        this.handleCourseChangeRef = this.handleCourseChange.bind(this);
        this.handleQuarterChangeRef = this.handleQuarterChange.bind(this);
        this.handleInstructureChangeRef = this.handleInstructureChange.bind(this);

        this.addCourseRef = this.addCourse.bind(this);
        this.handleCourseDeleteRef = this.handleCourseDelete.bind(this);

        // used for placeholder values
        this.courseListRef = React.createRef();
        this.quarterListRef = React.createRef();
        this.instructorListRef = React.createRef();
        this.MAX_X_AXIS_NUM_ELEMENTS = 4;
        this.COURSE_DETAIL_COLOR = ["#FF8189", "#00B2E3", "#FFDA6D", "#74EA37"];
    }
    componentDidMount(){
      //get all the course id's from the database query
      
      this.get_enrollmentData();
      this.updateCourseList();
      
  }
    async get_enrollmentData()
        {
           axios.get("http://localhost:5000/enrollment",{})
            .then(data => {
              console.log(data.data.data);
              this.setState({courses: data.data.data});
              this.updateCourseList();
            })
            .catch((error) =>{
              console.error(error);
            }); 
        }
        
    handleCourseDelete(event)
    {
        var deleteIndex = parseInt(event.target.getAttribute("data-index"));
        this.COURSE_DETAIL_COLOR.push(this.state.selected_courses_aggreage[deleteIndex]["info"]["color"]);
        this.state.selected_courses_aggreage.splice(deleteIndex, 1);
        this.format_data();
    }
    updateCourseList()
    {
        var courseList = [];
        for (var i = 0; i < this.state.courses.length; i++)
        {
            courseList.push({course_id: this.state.courses[i].course_id, 
                            label: <h5 style={{marginTop: "5px"}}>{this.state.courses[i].course_id} - {this.state.courses[i].name}</h5>
                            });
        }
        this.setState({course_drop_down_menu_options: courseList});
        console.log(this.state.course_drop_down_menu_options)
    }
    format_data()
    {
        var tempLegend = [];
        var each_point = {};
        var data = [];
        for (var i = 0; i < this.state.selected_courses_aggreage[0].seats.length; i++)
        {
            each_point["name"] = i;
            for (var j = 0; j < this.state.selected_courses_aggreage.length; j++)
            {
                each_point[[this.state.selected_courses_aggreage[j].course_id,
                            this.state.selected_courses_aggreage[j]._id]] =
                    this.state.selected_courses_aggreage.seats[i];
            }
            data.push(each_point);
        }
        for (var i = 0; i < data.length; i++)
        {
            tempLegend.push(
                <Line dataKey={data[i]["name"]} stroke = {this.COURSE_DETAIL_COLOR[i]} />
            )
        }
        this.setState({ formatted_data_for_graph: data, chartLegend: tempLegend});
    }
    addCourse(event)
    {
        this.setState({
            enableAddCourse: false,
            quarter_drop_down_menu_options : [],
            instructor_drop_down_menu_options : [],
        });

        this.courseListRef.current.setState({ value: null });
        this.quarterListRef.current.setState({ value: null });
        this.instructorListRef.current.setState({ value: null });
    }
    handleInstructureChange(event) {

        // set the selected instructor
        this.state.selected_course_id_quarter_instructor = event.value;
    
        // course is not eligible to be added
        this.setState({ enableAddCourse: true });
    }

    handleQuarterChange(event) {

        // set the selected quarter
        this.state.selected_course_id_quarter = event.value;
    
        // clear the selected instructor
        this.state.selectedInstructor = null;
    
        // filter our course info to get only the courses that match our selected course
        var filteredIDInfo = this.state.courses.filter(
          (course) => course.course_id == this.state.selected_course_id
        );
        console.log("here in the filteredIDInfo");
        console.log(filteredIDInfo);
        // filter further to get only the courses that match our selected quarter
        var filteredQuarterInfo = filteredIDInfo[0].courses.filter(
          (course) => course.quarter == this.state.selected_course_id_quarter
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
          instructor_drop_down_menu_options: instructorList,
          enableAddCourse: false,
        });
      }

      handleCourseChange(event) {

        // get the selected course and filter course detail info for desired course ID
        this.state.selected_course_id = event.value;
        // if new course is selected, reset the previous selected quarter and instructor
        this.state.selected_course_id_quarter = null;
        this.state.selected_course_id_quarter_instructor = null;
    
        // clear the instructor options
        this.state.instructor_drop_down_menu_options = [];
    
        // filter the courses to match our course id
        var filteredInfo = this.state.courses.filter(
          (course) => course.course_id == this.state.selected_course_id
        );
        console.log(filteredInfo);
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
        this.setState({ quarter_drop_down_menu_options: quarterList, enableAddCourse: false });
        this.quarterListRef.current.setState({ value: null });
        this.instructorListRef.current.setState({ value: null });
    
      }
    render(props)
    {
        var borderStyle = "none";
        var courseLegend = [<div></div>,<div></div>,<div></div>,<div></div>];
        var index = 0;
        for (var i = 0; i < this.state.selected_courses_aggreage.length; i++)
        {
            courseLegend[i] = (
                <div style style={{
                    border: "2px solid #BEBEBE",
                    borderRadius: "10px",
                    padding: "10px",
                    whiteSpace: "nowrap",
                  }}>
                    <div style={{display: "flex", flexDirection:"row"}}>
                        <span
                            className="dot"
                            style={{
                                borderRadius: "50%",
                                backgroundColor: this.COURSE_DETAIL_COLOR[i],
                                display: "inline-block",
                                height: "12px",
                                width: "12px",
                                marginRight: "10px",
                                marginTop: "6px"}}></span>
                        <h3>{this.state.selected_courses_aggreage[i].course_id}</h3>
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
                                marginTop: "-10px"}}>x</button>
                    </div>
                    <h5 style={{ color: "#BEBEBE" }}>{this.state.selected_courses_aggreage[i].name}</h5>
                            <h5 style={{ color: "#BEBEBE" }}>
                                {" "}
                                {this.state.selected_courses_aggreage[i].quarter} - 
                                    {this.state.selected_courses_aggreage[i].instructor}{" "}
                            </h5>
                            <h4 style={{fontWeight: "bold"}}> 
                                Open Seats
                            </h4>
                            <h4 style={{marginLeft: "10px"}}> 
                                {this.state.selected_courses_aggreage[i].seats[
                                    this.state.selected_courses_aggreage[i].seats.length-1
                                ]}
                            </h4>
                            <h4>
                            </h4>
                </div>
            );
        }
        var classPlaceholder = <h5 style={{marginTop: "5px", color: "#BEBEBE"}}> Search for a class </h5>;
        var quarterPlaceholder = <h5 style={{marginTop: "5px", color: "#BEBEBE"}}> Quarter </h5>;
        var instructorPlaceholder = <h5 style={{marginTop: "5px", color: "#BEBEBE"}}> Instructor </h5>;
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
                    options={this.state.course_drop_down_menu_options}
                    placeholder={classPlaceholder}
                    />
                </div>
                <div className="col-3" style={{ border: borderStyle }}>
                  <WindowedSelect
                    ref={this.quarterListRef}
                    placeholder={quarterPlaceholder}
                    isDisabled={this.state.quarter_drop_down_menu_options.length == 0}
                    options={this.state.quarter_drop_down_menu_options}
                    onChange={this.handleQuarterChangeRef}
                  />
                </div>
                <div className="col-3" style={{ border: borderStyle }}>
                  <WindowedSelect
                    ref={this.instructorListRef}
                    placeholder={instructorPlaceholder}
                    isDisabled={this.state.instructor_drop_down_menu_options.length == 0}
                    options={this.state.instructor_drop_down_menu_options}
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
                    <LineChart
                      width="99.8%"
                      height="99.8%"
                      data={this.state.formatted_data_for_graph}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20}}
                      grid
                    >
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="name" tick={{fontSize: "15px"}} tickLine={false}/>
                      <YAxis tick={{fontSize: "15px"}} tickLine={false} unit="%"/>
                      <Tooltip />
                      <Legend content={<div></div>} />
                      {this.state.chartLegend}
                    </LineChart>
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

