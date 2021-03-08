import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Detail = props => (
    <tr>
      <td>{props.detail.name}</td>
      <td>{props.detail.course_id}</td>
    </tr>
  )

export default class CourseCard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: 'Computer Architecture',
            course_id: 'ECS150',
        }

    }

    detailList() {
        return this.state.detail.map(currentdetail => {
            return <Detail detail={currentdetail} deleteDetail={this.deleteDetail} key={currentdetail._id}/>;
        })
        }
    
    render(){
        return(
            <div>
                <div class="row">
                    <div class="col-xl-3 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="media d-flex">
                                        <div class="media-body text-left">
                                            <h3 class="primary">{this.state.course_id}</h3>
                                            <span>{this.state.name}</span>
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
            </div>
          )
    }
}