import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import{gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import {courseFilterQuery} from './../queries.js';
import filterIcon from "./images/filter-control-adjustment-icon.jpg"
import catalog_cow from "./images/catalog_cow.png";
import './css/course-card.css'; 
import { Button,  ButtonGroup, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';

// const getCourseQuery = gql`
//   {
//     courses{

//     }
//   }`

function myFunction() {
  var x = document.getElementById("extrafeatures");
  var y = document.getElementById("AdvancedButton");
  var z = document.getElementById("AdvancedButton2");
  if (x.style.display == "none") {
    x.style.display = "flex";
    y.style.display = "none";
    z.style.display = "inline";
  } else {
    x.style.display = "none";
    y.style.display = "inline";
    z.style.display = "none";
  }
}


function hide_show() {
  var x = document.getElementById("filter_right");
  var y = document.getElementById("cow_right");
  if (x.style.display == "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
}


// function changeText() {
//   var element = document.getElementById('AdvancedText');
//   if(element.innerHTML == 'Show Advanced Options'){
//     element.innerHTML = 'Hide Advanced Options'
//   }
//   else{
//     element.innerHTML = 'Show Advanced Options'
//   }
// }

const Detail = props => (
    <tr>
      <td>{props.detail.name}</td>
      <td>{props.detail.course_id}</td>
    </tr>
  )

var items;

class CourseCard extends Component{
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         name: '',
    //         course_id: '',
    //     }

    // }


    // constructor(props) {
    //     super(props);

    //     this.onChangeInstructor = this.onChangeInstructor.bind(this);
    
    //     this.deleteDetail = this.deleteDetail.bind(this)
    
    //     this.state = {
    //       detail: [],
    //       course_name: "",
    //       instructor: "James",
    //       units:"",
    //     };
    //}


      // to refetch data using graphql query
      // function fetchData() {
      //   this.props.data.refetch({ 
      //     course_name: nameState,
      //     instructor_name: instructorState,
      //     units_count: unitsState,
      //    })
      // }

      // data located here:
      // let data = this.props.data.course_id;
    
      componentDidMount() {
        axios.get('http://localhost:5000/detail/')
          .then(response => {
            this.setState({ detail: response.data })
            // put items from get request into variable items 
            items = response.data;
            console.log("hit", items);
    
          })
          .catch((error) => {
            console.log(error);
          })

          console.log("my state", this.state);
      }

      onChangeInstructor(e) {
        this.setState({
          instructor: e.target.value
        })
        console.log("changed state", this.state);
      }

      // function buttonclicked() {
      //   fetchData(this.state.instructor, this.state.units, );
      //   this,setState({
      //     detail: this.props.data.course_id,
      //   });
      // }
    
      deleteDetail(id) {
        axios.delete('http://localhost:5000/detail/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          detail: this.state.detail.filter(el => el._id !== id)
        })
      }

    detailList() {
        return this.state.detail.map(currentdetail => {
            return <Detail detail={currentdetail} deleteDetail={this.deleteDetail} key={currentdetail._id}/>;
        })
    }

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

      this.crn = "";
      this.instructor = "";
      this.subj = "";
      this.code = ""; // this is course level
      this.units = "";
  
      // TODO: Create reference for prev and next button click and bind them. Add to HTML
      this.onClickPrevRef = this.clickPreviousHandler.bind(this);
      this.onClickNextRef = this.clickNextHandler.bind(this);
      this.filterChageRef = this.filterChangeHandler.bind(this);

      this.crnChangeRef = this.crnChangeRefHandler.bind(this);
      this.instructorChangeRef = this.instructorChangeRefHandler.bind(this);
      this.subjChangeRef = this.subjChangeRefHandler.bind(this);
      this.codeChangeRef = this.codeChangeRefHandler.bind(this);
      this.unitsChangeRef = this.unitsChangeRefHandler.bind(this);

      this.useFilterRef = this.useFilter.bind(this);
    }
  
    componentDidMount() {
      this.refreshDB();
    }

    crnChangeRefHandler(e) {
      this.crn = e.target.value;
    }

    instructorChangeRefHandler(e) {
      this.instructor = e.target.value;
    }
    
    subjChangeRefHandler(e) {
      this.subj = e.target.value;
    }

    codeChangeRefHandler(e) {
      this.code = e.target.value;
    }

    unitsChangeRefHandler(e) {
      this.units = e.target.value;
    }

    useFilter() {

      // axios
      // .get("http://localhost:5000/detail/", {params:requestParams})
      // .then((response) => {
      //   var recievedCount = response.data.length;

      //   if((recievedCount == 0) && (this.startCourseIndex != 0)) {
      //     this.startCourseIndex = Math.max(0, this.startCourseIndex - this.numCourses);
      //   } else {
      //     this.setState({ detail: response.data });
      //   }
      // })
      // .catch((error) => {
      //   console.log(error);
      // });


      // console.log("state in usefilter functions", this.state);
      console.log("in usefilter function", this.state);
      let newDetail = this.state.detail.filter(function (el) {
        return el;
      });


      console.log("new detil", newDetail);
    }
  
    refreshDB() {

      console.log("in refresh DB", this.instructor);
      // get course details from database
      var requestParams = new URLSearchParams({
        "limit" : this.numCourses,
        "start" : this.startCourseIndex,
        "filter" : this.filter,
        "instructor": this.instructor,
        "crn": this.crn,
        "subj": this.subj,
        "code": this.code,
        "units": this.units
      });

      let instructorFilter = this.instructor;
  
      axios
        .get("http://localhost:5000/detail/", {params:requestParams})
        .then((response) => {
          var recievedCount = response.data.length;
  
          if((recievedCount == 0) && (this.startCourseIndex != 0)) {
            this.startCourseIndex = Math.max(0, this.startCourseIndex - this.numCourses);
          } else {
            // add any filters here:
            // filters are CRN, Subject, Instructor, Course Level, Units
            console.log("in else statement", instructorFilter, response.data);
            // let newDetail = response.data.filter(function (el) {
            //   return el.instructor == instructorFilter;
            //   // el.crn == this.crn &&
            //   // el.subj == this.subj &&
            //   // el.code == this.code &&
            //   // el.units == this.units;
            // });
            // console.log("the newdetail", newDetail);
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
    render(){

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
          <html>
          <body>
          <div class="page">
           <div class="row">
            <div id="splitleft" class="col-md-3">
              <table className="table table-hover">
                <thead>
                  <tr className="row" style={{marginLeft:"0px", marginRight:"0px"}}>
                    <th className="col-10" style={{border:border_style}}>
                      <div className="form_group mb-3">
                        <input type="text" class="form-control" placeholder="search for classes" onChange={this.filterChageRef}/>
                      </div>
                    </th>
                    <th className="col-1" style={{border:border_style}}> 
                      <button id = "filterbutton" onClick={hide_show} ><img src={filterIcon} style={{height:"3rem", marginBottom:"0.7rem"}} ></img></button>
                    </th>
                    <th className="col-1" style={{border:border_style}}></th>
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
            
            {/* <button onClick={hide_show}>Filters</button>
            <ul class="list-unstyled"> 
                {this.state.detail.map(currentdetail => {
                return(
                  <li>
                  <div class="card">
                              <div class="card-body">
                                <div class="media d-flex">
                                  <div class="align-self-center">
                                              <h3 class="primary"><b>{currentdetail.course_id}</b></h3>
                                              <p>{currentdetail.name}</p>
                                              <p> Enrollement Here </p>
                                              <div class= "left_side">
                                             <div class= "unit-right">{currentdetail.units} Units</div> </div>
                                              <a href="courseinfo" class="stretched-link"></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                  </li>
                  ); })}
                  </ul> */}
            </div>
              <div id="splitright" class="col-sm-9 right-content">
                <div id="cow_right">
                  <div class="right-text">
                      <div class="catalog_cow"><img src={catalog_cow} id="catalog_cow"/> </div>
                      <p class="line-1">Go ahead and search</p> 
                      <p class="line-2">or filter for classes! </p>
                  </div>
                </div>
                <div id="filter_right">
                  <div id="addgap">
                  <h1 class="filtertitle">Filters</h1>
                  <div class="row">
                    <div id="quarter" class="col-md-8 other">
                      <div id="quartertitle">Quarter</div>
                      <div id="quarterboxes">
                      <label class="checkbox-inline" id="quar"><span id="checktext">Fall</span>
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="checkbox-inline" id="quar"> <span id="checktext">Winter</span>
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="checkbox-inline" id="quar"> <span id="checktext">Spring</span>
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="checkbox-inline" id="quar"> <span id="checktext">Summer I</span>
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="checkbox-inline" id="quar"> <span id="checktext">Summer II</span>
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      </div>
                    </div>
                    <div id="quarter" class="col-sm-3 other2">
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">Year
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                  </div>
                  <div class="row">
                    <div id="CRN" class="col-md-5 other">
                    <div id="title">CRN</div>
                    <div class="input-group mb-4">
                          <input type="search" onChange={this.crnChangeRef} placeholder="CRN" aria-describedby="button-addon5" class="form-control" id="searchbar"/>
                      </div>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                    <div id="course-level" class="col-md-5 other">
                      <div id="title">Course Level</div>
                      <div class="input-group mb-4">
                          <input type="search" onChange={this.codeChangeRef} placeholder="Course Level" aria-describedby="button-addon5" class="form-control" id="searchbar"/>
                      </div>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                  </div>
                  <div class="row">
                    <div id="Subject" class="col-md-5 other">
                      <div id="title">Subject</div>
                      <div class="input-group mb-4">
                        <input type="search" onChange={this.subjChangeRef} placeholder="Subject" aria-describedby="button-addon5" class="form-control" id="searchbar"/>
                      </div>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                    <div id="units" class="col-md-5 other">
                      <div id="title">Units</div>
                      <div class="input-group mb-4">
                          <input type="search" onChange={this.unitsChangeRef} placeholder="Units" aria-describedby="button-addon5" class="form-control" id="searchbar"/>
                      </div>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                  </div>
                  <div class="row">
                    <div id="instructor" class="col-md-5 other">
                      <div id="title">Instructor</div>
                      <div class="input-group mb-4">
                        <input type="search" onChange={this.instructorChangeRef} placeholder="instructor" aria-describedby="button-addon5" class="form-control" id="searchbar"/>
                      </div>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                    <div id="meeting-type" class="col-md-5 other">
                        {/* <Dropdown class="MeetingDrop">
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Meeting Type
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown> */}
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                  </div>
                  <div class="row" id="extrafeatures">
                    <div id="coreliteracies" class="col-md-5">
                      <p class="coretitle">Core Literacies</p>
                      <div id="corebox">
                        <label class="container" id="core">
                          <input type="checkbox" /><span id="coretext">ACGH (Amer Cultr, Gov, Hist)</span>
                          <span class="checkmark"></span>
                        </label>
                        <label class="container" id="core">
                          <input type="checkbox"/><span id="coretext">DD (Domestic Diversity)</span>
                          <span class="checkmark"></span>
                        </label>
                        <label class="container" id="core">
                          <input type="checkbox"/><span id="coretext">OL (Oral Lit)</span>
                          <span class="checkmark"></span>
                        </label>
                        <label class="container" id="core">
                          <input type="checkbox"/><span id="coretext">QL (Qualitative Lit)</span>
                          <span class="checkmark"></span>
                        </label>
                        <label class="container" id="core">
                          <input type="checkbox"/><span id="coretext">SL (Scientific Lit)</span>
                          <span class="checkmark"></span>
                        </label>
                        <label class="container" id="core">
                          <input type="checkbox"/><span id="coretext">VL (Visual Lit)</span>
                          <span class="checkmark"></span>
                        </label>
                        <label class="container" id="core">
                          <input type="checkbox"/><span id="coretext">WC (World Cultr)</span>
                          <span class="checkmark"></span>
                        </label>
                        <label class="container" id="core">
                          <input type="checkbox"/><span id="coretext">WE (Writing Exp)</span>
                          <span class="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                    <div id="GEs" class="col-md-5">
                      <p class="getitle">GE Options</p>
                      <div id="gebox">
                        <label class="container" id="ge">
                          <input type="checkbox" /><span id="getext">AH (Arts & Hum)</span>
                          <span class="checkmark"></span>
                        </label>
                        <label class="container" id="ge">
                          <input type="checkbox"/><span id="getext">SE (Sci & Eng)</span>
                          <span class="checkmark"></span>
                        </label>
                        <label class="container" id="ge">
                          <input type="checkbox"/><span id="getext">SS (Social Sci)</span>
                          <span class="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div id="advancedbuttons" class="col-md-5 other">
                      <button id="AdvancedButton" onClick={myFunction}>Show Advanced Options</button>
                      <button id="AdvancedButton2" onClick={myFunction}>Hide Advanced Options</button>
                    </div>  
                    <div id="placeholder" class="col-md-1 other"></div>
                    <div id="gobuttons" class="col-md-5 other">
                      {/* <button id="GoButton" onClick={this.useFilterRef}>Go!</button> */}
                      <button id="GoButton" onClick={this.filterChageRef}>Go!</button>
                    </div>  
                    <div id="placeholder" class="col-md-1 other"></div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </body>
        </html>
        )
    }
}

export default graphql(courseFilterQuery, {
  options: (props) => {
    return {
      variables: {
        course_name: "",
        instructor_name: "",
        units_count: "",
      }
    }
  }
})(CourseCard);