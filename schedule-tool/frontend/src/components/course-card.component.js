import React, { Component } from "react";
import axios from "axios";
import filterIcon from "./filter-control-adjustment-icon.jpg"

// Top level layout of 2 parts
// - Left side is course list with quick filter
// - Right side is detailed filter or course detail
export default class CourseCard extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  // TODO: Add course detailed view when available
  render() {
    return (
      <div className="row">
        <div className="col-3"><CourseList/></div>
        <div className="col-9"></div>
      </div>
    );
  }
}

class CourseList extends Component {
  constructor(props) {
    super(props);
    // create state
    this.state = {};
    // init course detail to empty list
    this.state.detail = [];

    // TODO: course fetch limit. Create class variables to store how many courses to fetch
    this.numCourses = 20;
    // TODO: course index tracking. Create class variables to track current database index
    this.startCourseIndex = 0;

    this.filter = "";

    // TODO: Create reference for prev and next button click and bind them. Add to HTML
    this.onClickPrevRef = this.clickPreviousHandler.bind(this);
    this.onClickNextRef = this.clickNextHandler.bind(this);
    this.filterChageRef = this.filterChangeHandler.bind(this);
  }

  componentDidMount() {
    this.refreshDB();
  }

  refreshDB() {
    // get course details from database
    var requestParams = new URLSearchParams({
      "limit" : this.numCourses,
      "start" : this.startCourseIndex,
      "filter" : this.filter
    });

    axios
      .get("http://localhost:5000/detail/", {params:requestParams})
      .then((response) => {
        var recievedCount = response.data.length;

        if((recievedCount == 0) && (this.startCourseIndex != 0)) {
          this.startCourseIndex = Math.max(0, this.startCourseIndex - this.numCourses);
        } else {
          this.setState({ detail: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // TODO: previous click call back handler
  clickPreviousHandler() {
    this.startCourseIndex = Math.max(0, this.startCourseIndex - this.numCourses);
    this.refreshDB();
  }

  // TODO: next click call back handler
  clickNextHandler() {
    this.startCourseIndex = this.startCourseIndex + this.numCourses;
    this.refreshDB();
  }

  filterChangeHandler(event) {
    this.filter = event.target.value;
    this.startCourseIndex = 0;
    this.refreshDB();
  }

  // creating unordered list and using map for card component
  render() {

    // all course HTML info array
    var course_info = [];

    var border_style = "none";

    for(var index = 0; index < this.state.detail.length; index++) {
      // this course HTML info
      var this_course = (
        <tr className="row" style={{marginLeft:"0px", marginRight:"0px"}}>
            <td className="col-8" style={{border:border_style}}>
              <h4><strong>{this.state.detail[index].course_id}</strong></h4>
              <h4>{this.state.detail[index].name}</h4>
            </td>
            <td className="col-4" style={{border:border_style, textAlign:"center", marginTop:"1rem"}}>
              <h4>{this.state.detail[index].units} Units</h4>
            </td>
        </tr>
      );
      course_info.push(this_course);
    }

    return(
      <div>
        <table className="table table-hover">
          <thead>
            <tr className="row" style={{marginLeft:"0px", marginRight:"0px"}}>
              <th className="col-11" style={{border:border_style}}>
                <div className="form_group mb-3">
                  <input type="text" class="form-control" placeholder="search for classes" onChange={this.filterChageRef}/>
                </div>
              </th>
              <th className="col-1" style={{border:border_style}}> 
                <img src={filterIcon} style={{height:"3rem", marginBottom:"0.7rem"}}></img>
              </th>
            </tr>
          </thead>
          
          <tbody style={{display:"block", height:"70vh", overflowY:"scroll"}}>
            {course_info}
          </tbody>

        </table>

        <div className="row" style={{marginTop:"30px", marginLeft:"20px"}}>
          <button type="button" className="btn btn-primary btn-sm col-2" style={{height:"30px", marginRight:"20px"}} onClick={this.onClickPrevRef}>Prev</button>
          <button type="button" className="btn btn-primary btn-sm col-2" style={{height:"30px", marginRight:"20px"}} onClick={this.onClickNextRef}>Next</button>
          <div className="col-8"></div>
        </div>

      </div>        
    );
  }
}
