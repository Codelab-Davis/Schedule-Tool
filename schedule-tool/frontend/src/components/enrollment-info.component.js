import React, { Component} from "react";
import axios from "axios";
import WindowedSelect from "react-windowed-select";
import {Line,LineChart,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from "recharts";
import _ from "lodash";

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
      
  }
    async get_enrollmentData()
        {
           axios.get("https://backend.aggieexplorer.com/enrollment",{})
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
        this.state.selected_courses_aggreage.splice(deleteIndex, 1);
        this.format_data();
    }
    updateCourseList()
    {
        var courseList = [];
        for (var i = 0; i < this.state.courses.length; i++)
        {
            courseList.push({value: this.state.courses[i].course_id + " " + this.state.courses[i].name,
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
        if (this.state.selected_courses_aggreage.length == 0)
          return;
        for (var i = 0; i < this.state.selected_courses_aggreage[this.state.selected_courses_aggreage.length-1].seats.length; i++)
        {
          var each_point = {};
            each_point["name"] = i;
            for (var j = 0; j < this.state.selected_courses_aggreage.length; j++)
            {
                each_point[this.state.selected_courses_aggreage[j].graph_id] =
                    this.state.selected_courses_aggreage[j].seats[i];
            }
            data.push(each_point);
        }
        for (var i = 0; i < this.state.selected_courses_aggreage.length; i++)
        {
            tempLegend.push(
                <Line name = {this.state.selected_courses_aggreage[i].graph_id} dataKey={this.state.selected_courses_aggreage[i].graph_id} stroke = {this.COURSE_DETAIL_COLOR[i]} strokeWidth = {5} type={"basis"} r={0}/>
            )
        }
        console.log("after formatting");
        console.log(data)
        this.setState({ formatted_data_for_graph: data, chartLegend: tempLegend});
    }
    addCourse(event)
    {
      var temp = [];
      temp.push(
        this.state.courses.filter((each_course) =>
          each_course.course_id == this.state.selected_course_id &&
          each_course.instructor == this.state.selected_course_id_quarter_instructor &&
          each_course.quarter == this.state.selected_course_id_quarter
        )
      );
      var single_course = {
        graph_id: null,
        course_id: null,
        instructor: null,
        max_seats: null,
        name: null,
        quarter: null,
        seats: [],
        _id: null
      };
      console.log("after filtering in addcousrse");
      console.log(temp);
      console.log("hit in temp", temp);
      if (temp.length > 0)
      {
        single_course.graph_id = temp[0][0].name + " (" + temp[0][0].quarter + ", " + temp[0][0].instructor + ")";
        single_course.name = temp[0][0].name;
        single_course.instructor = temp[0][0].instructor;
        single_course.max_seats = temp[0][0].max_seats;
        single_course.quarter = temp[0][0].quarter;
        single_course.course_id = temp[0][0].course_id;
        console.log("hit single course", single_course);
        for (var i = 0; i  < temp[0][0].seats.length; i++)
        {
          var sum = 0;
          for (var j = 0; j < temp[0].length; j++)
          {
            let stuff = Object.values(temp[0][j].seats[i])
            sum += stuff[0]
          }
          single_course.seats.push(sum)
        }
      }
      if (this.state.selected_courses_aggreage.length > 4)
      {
        alert("Max number of courses reached. Please remove a course before adding another one");
        return;
      }
      this.state.selected_courses_aggreage.push(single_course);
      
      console.log("after adding course");
      console.log(this.state.selected_courses_aggreage);
        this.setState({
            enableAddCourse: false,
            quarter_drop_down_menu_options : [],
            instructor_drop_down_menu_options : [],
            selected_course_id : null,
            selected_course_id_quarter : null,
            selected_course_id_quarter_instructor : null
        });
        this.courseListRef.current.setState({ value: null });
        this.quarterListRef.current.setState({ value: null });
        this.instructorListRef.current.setState({ value: null });
        this.format_data();
    }
    handleInstructureChange(event) {

        // set the selected instructor
        this.state.selected_course_id_quarter_instructor = event.value;
    
        // course is not eligible to be added
        this.setState({ enableAddCourse: true });
    }

    handleQuarterChange(event) {

        // set the selected quarter
        console.log("before");
        console.log(event);
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
        var filteredQuarterInfo = filteredIDInfo.filter(
          (course) => course.quarter == this.state.selected_course_id_quarter
        );
        
        // create a new set of instructors
        // we have a set so that we only display unique instructors, not repeated
        console.log("after filttering");
        console.log(filteredQuarterInfo)
        var instructorSet = new Set();
        filteredQuarterInfo.forEach((quarter) => {
          instructorSet.add(quarter.instructor);
        });
        console.log("here");
        console.log(instructorSet)
        // create instructor list
        var instructorList = [];
        instructorSet.forEach((instructor) => {
          instructorList.push({
            value: instructor,
            
            // as displayed on the dropdown menu
            label: <h5 style={{marginTop: "5px"}}>{instructor}</h5>
          });
        });
    /*
        // if we have more than 1 instructor, then give the option for All instructors
        if (instructorList.length > 1) {
          instructorList.push({
            value: "All Instructors",
    
            // as displayed on the dropdown menu
            label: <h5 style={{marginTop: "5px"}}>All Instructors</h5>
          });
        }
    */
        // reset the previous selected instructor
        this.instructorListRef.current.setState({ value: null });
        
        // rerender the list of instructors
        this.setState({
          instructor_drop_down_menu_options: instructorList,
          enableAddCourse: false,
        });
      }

      handleCourseChange(event) {
        console.log(event);

        // get the selected course and filter course detail info for desired course ID
        this.state.selected_course_id = event.value.split(" ")[0];
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
        filteredInfo.forEach((course) => {
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
                            data-index={i}
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
                  {console.log(this.state.formatted_data_for_graph)}
                  <ResponsiveContainer>
                    <LineChart
                      width="99.8%"
                      height="99.8%"
                      data={this.state.formatted_data_for_graph}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20}}
                    >
                      <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3"/>
                      <XAxis dataKey="name" tick={{fontSize: "15px"}} tickLine={false}/>
                      <YAxis/>
                      <Tooltip />
                      <Legend content={<div></div>} />
                      {console.log(this.state.chartLegend)}
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
