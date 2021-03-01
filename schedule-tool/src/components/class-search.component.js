import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const Detail = props => (
  <tr>
    <td>{props.detail.name}</td>
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
    <td>
      <Link to={"/edit/"+props.detail._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDetail(props.detail._id) }}>delete</a>
    </td>
  </tr>
)

var items;

export default class DetailsList extends Component {
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
  
  // items = this.detailList();

  render() {
    return (
      <div>
        
        <h3>Course List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
            <th>Name</th>
              <th>Course Id</th>
              <th>Instructor</th>
              <th>A Plus</th>
              <th>A</th>
              <th>A Minus</th>
              <th>B Plus</th>
              <th>B</th>
              <th>B Minus</th>
              <th>C Plus</th>
              <th>C</th>
              <th>C Minus</th>
              <th>D Plus</th>
              <th>D</th>
              <th>D Minus</th>
              <th>F</th>
              <th>Quarter</th>
            </tr>
          </thead>
          <tbody>
            {/* {items} */}
            { this.detailList() }
          </tbody>
        </table>
      </div>
    )
  }
}
