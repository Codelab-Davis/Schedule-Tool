import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import{gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import './css/course-cards.css'; 
import catalog_cow from "./images/catalog_cow.png";
import cow_emoji from "./images/cow_emoji.png";

const Detail = props => (
    <tr>
      <td>{props.detail.name}</td>
      <td>{props.detail.course_id}</td>
    </tr>
  )

var items;

export default class CourseCard extends Component{
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
    // render(){
    //     return(
    //         <ul class="list-unstyled"> 
    //             {this.state.detail.map(currentdetail => {
    //             return(
    //             <li>
    //             <div class="row">
    //                 <div class="col-xl-3 col-sm-6 col-12">
    //                     <div class="card">
    //                         <div class="card-content">
    //                             <div class="card-body">
    //                                 <div class="media d-flex">
    //                                     <div class="media-body text-left">
    //                                         <h3 class="primary">{currentdetail.name}</h3>
    //                                         <span>{currentdetail.course_id}</span>
    //                                         <a href="courseinfo" class="stretched-link"></a>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             </li>
    //             );
    //             })} 
    //         </ul>  <img src={cow_emoji} id="cow_emoji"/>
    //       )
    // }
    
    render(){
          return(
            <html>
              <body>
              <div class="page">
                <div class="row">
               
                <div id = "splitleft" class="col-md-4"> 
                  <li>
                  <div class="card">
                              <div class="card-body">
                                <div class="media d-flex">
                                  <div class="align-self-center">
                                              <h3 class="primary">Course Name</h3>
                                              <p>CourseID</p>
                                              <p> Enrollement Here </p>
                                              <div class= "left_side">
                                              <p align= "right"> Unit Count</p> </div>
                                              <a href="courseinfo" class="stretched-link"></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                  </li>
                </div>
                <hr/>
          
              
              <div id="splitright" class="col-sm-8">
                <div class="right-content">
                <div class="right-text">
                    <div class="catalog_cow"><img src={catalog_cow} id="catalog_cow"/> </div>
                    <p class="line-1">Go ahead and search</p> 
                    <p class="line-2">or filter for classes! </p>
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