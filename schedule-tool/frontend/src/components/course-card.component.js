import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import{gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
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
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

const Detail = props => (
    <tr>
      <td>{props.detail.name}</td>
      <td>{props.detail.course_id}</td>
    </tr>
  )

var items;

export default class CourseCard extends Component{
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         name: '',
    //         course_id: '',
    //     }

    // }

    constructor(props) {
        super(props);
    
        this.deleteDetail = this.deleteDetail.bind(this)
    
        this.state = {detail: []};
      }
    
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
      }
    
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
              <p>hello</p>
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
                    <div id="quarter" class="col-md-6 other">
                      <label class="checkbox-inline">Fall
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="checkbox-inline">Winter
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="checkbox-inline">Spring
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="checkbox-inline">Summer Session I
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="checkbox-inline">Summer Session II
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                    </div>
                    <div id="quarter" class="col-sm-6 other2">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </div>
                  </div>
                  <div class="row">
                    <div id="CRN" class="col-md-6 other">
                      <div class="input-group mb-4">
                        <input type="search" placeholder="CRN" aria-describedby="button-addon5" class="form-control"/>
                        <div class="input-group-append">
                          <button id="button-addon5" type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                        </div>
                      </div>
                    </div>
                    <div id="course-level" class="col-md-6 other">
                      <div class="input-group mb-4">
                          <input type="search" placeholder="Course Level" aria-describedby="button-addon5" class="form-control"/>
                          <div class="input-group-append">
                            <button id="button-addon5" type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div id="Subject" class="col-md-6 other">
                      <div class="input-group mb-4">
                        <input type="search" placeholder="subject" aria-describedby="button-addon5" class="form-control"/>
                        <div class="input-group-append">
                          <button id="button-addon5" type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                        </div>
                      </div>
                    </div>
                    <div id="units" class="col-md-6 other">
                      <div class="input-group mb-4">
                          <input type="search" placeholder="units" aria-describedby="button-addon5" class="form-control"/>
                          <div class="input-group-append">
                            <button id="button-addon5" type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div id="instructor" class="col-md-6 other">
                      <div class="input-group mb-4">
                        <input type="search" placeholder="instructor" aria-describedby="button-addon5" class="form-control"/>
                        <div class="input-group-append">
                          <button id="button-addon5" type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                        </div>
                      </div>
                    </div>
                    <div id="meeting-type" class="col-md-6 other">
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                    </div>
                  </div>
                  <div class="row" id="extrafeatures">
                    <div id="coreliteracies" class="col-md-6">
                      <label class="container">One
                        <input type="checkbox" />
                        <span class="checkmark"></span>
                      </label>
                      <label class="container">Two
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="container">Three
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="container">Four
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <button onClick={myFunction}>Click Me</button>
                </div>
              </div>
          </div>

        </body>
        </html>
        )
    }
}