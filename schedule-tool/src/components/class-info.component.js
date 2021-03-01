import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseInfo = props => (
    <tr>
      <td>{props.detail.name}</td>
      <td>{props.detail.course_id}</td>
    </tr>
  )