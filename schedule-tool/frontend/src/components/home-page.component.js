import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    render(){
        return(
            <div>
                <h1> OUR HOMEPAGE AYO </h1>
                <h><i>shoutout James and Omid</i></h>
                <p>
                    <a class="btn btn-large btn-info" href="list">Browse Courses</a>
                </p> 
            </div>
        )
    }
}