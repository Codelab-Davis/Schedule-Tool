import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import{gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import {courseFilterQuery} from './../queries.js';

import './css/course-card.css'; 
import { Button,  ButtonGroup, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';

// const getCourseQuery = gql`
//   {
//     courses{

//     }
//   }`

function myFunction() {
  var x = document.getElementById("extrafeatures");
  if (x.style.display === "none") {
    x.style.display = "inline";
  } else {
    x.style.display = "none";
  }
}

function changeText() {
  var element = document.getElementById('AdvancedText');
  if(element.innerHTML == 'Show Advanced Options'){
    element.innerHTML = 'Hide Advanced Options'
  }
  else{
    element.innerHTML = 'Show Advanced Options'
  }
}

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


    constructor(props) {
        super(props);

        this.onChangeInstructor = this.onChangeInstructor.bind(this);
    
        this.deleteDetail = this.deleteDetail.bind(this)
    
        this.state = {
          detail: [],
          course_name: "",
          instructor: "James",
          units:"",
        };
      }


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
    
    
    // creating unordered list and using map for card component
    render(){
        return(
          <html>
          <body>
          <div class="page">
           <div class="row">
            <div id = "splitleft" class="col-md-4">
            <ul class="list-unstyled"> 
                {this.state.detail.map(currentdetail => {
                return(
                <li>
                  <div class="row">
                      <div class="col-xl-3 col-sm-6 col-12">
                          <div class="card">
                              <div class="card-content">
                                  <div class="card-body">
                                      <div class="media d-flex">
                                          <div class="media-body text-left">
                                              <h3 class="primary">{currentdetail.name}</h3>
                                              <span>{currentdetail.course_id}</span>
                                              <a href="courseinfo" class="stretched-link"></a>
                                          </div>
                                          {/* <div class="align-self-center">
                                              <i class="icon-book-open primary font-large-2 float-right"></i>
                                          </div> */}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </li>
                );
                })} 
            </ul>
            </div>
              <div id="splitright" class="col-sm-8">
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
                          <input type="search" placeholder="CRN" aria-describedby="button-addon5" class="form-control" id="searchbar"/>
                      </div>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                    <div id="course-level" class="col-md-5 other">
                      <div id="title">Course Level</div>
                      <div class="input-group mb-4">
                          <input type="search" placeholder="Course Level" aria-describedby="button-addon5" class="form-control" id="searchbar"/>
                      </div>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                  </div>
                  <div class="row">
                    <div id="Subject" class="col-md-5 other">
                      <div id="title">Subject</div>
                      <div class="input-group mb-4">
                        <input type="search" placeholder="Subject" aria-describedby="button-addon5" class="form-control" id="searchbar"/>
                      </div>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                    <div id="units" class="col-md-5 other">
                      <div id="title">Units</div>
                      <div class="input-group mb-4">
                          <input type="search" placeholder="Units" aria-describedby="button-addon5" class="form-control" id="searchbar"/>
                      </div>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                  </div>
                  <div class="row">
                    <div id="instructor" class="col-md-5 other">
                      <div id="title">Instructor</div>
                      <div class="input-group mb-4">
                        <input type="search" placeholder="instructor" aria-describedby="button-addon5" class="form-control" id="searchbar" onChange={this.onChangeInstructor}/>
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
                        <label class="container">
                          <input type="checkbox" />ACGH (Amer Cultr, Gov, Hist)
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">
                          <input type="checkbox"/>DD (Domestic Diversity)
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">
                          <input type="checkbox"/>OL (Oral Lit)
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">
                          <input type="checkbox"/>QL (Qualitative Lit)
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">
                          <input type="checkbox"/>SL (Scientific Lit)
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">
                          <input type="checkbox"/>VL (Visual Lit)
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">
                          <input type="checkbox"/>WC (World Cultr)
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">
                          <input type="checkbox"/>WE (Writing Exp)
                          <span class="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <div id="placeholder" class="col-md-1 other"></div>
                    <div id="GEs" class="col-md-5">
                      <p class="getitle">GE Options</p>
                      <label class="container">
                        <input type="checkbox" />AH (Arts & Hum)
                        <span class="checkmark"></span>
                      </label>
                      <label class="container">
                        <input type="checkbox"/>SE (Sci & Eng)
                        <span class="checkmark"></span>
                      </label>
                      <label class="container">
                        <input type="checkbox"/>SS (Social Sci)
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <button id="AdvancedButton" onClick={myFunction}>Show Advanced Options</button>
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