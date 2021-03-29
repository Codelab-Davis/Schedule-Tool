import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseStuff = props => (
    <tr>
      <td>{props.detail.name}</td> //adding the following information to the course
      <td>{props.detail.course_id}</td>
      <td>{props.detail.instructor}</td>
      <td>{props.detail.aplus}</td>
      <td>{props.detail.a}</td>
      <td>{props.detail.aminus}</td>
      <td>{props.detail.bplus}</td>
      <td>{props.detail.b}</td>
      <td>{props.detail.bminus}</td>
      <td>{props.detail.cplus}</td>
      <td>{props.detail.c}</td>
      <td>{props.detail.cminus}</td>
      <td>{props.detail.dplus}</td>
      <td>{props.detail.d}</td>
      <td>{props.detail.dminus}</td>
      <td>{props.detail.fplus}</td>
      <td>{props.detail.quarter}</td>
    </tr>
  )

export default class CourseInfo extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: 'Computer Architecture',
            course_id: 'ECS150',
            instructor: '',
            aplus: 20,
            a: 10,
            aminus: 19,
            bplus: 12,
            b: 20,
            bminus: 10,
            cplus: 6,
            c: 3,
            cminus: 1,
            dplus: 2,
            d: 4,
            dminus: 0,
            f: 1,
            quarter: 'FQ2020'
        }
    }
    render(){
        return(
            <div></div>
        )
    }
}