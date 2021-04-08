import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/home-page.css'; 
import background from './HomeIllustration.png';

export default class HomePage extends Component {
    render(){
        return(
            // background-image: url("localhost:3000(/img/Home%20Illustration.png");
            <div class = "test">
            {/* // <div styles={{ backgroundImage:`url(${background})`}} > */}
                <div>
                    {/* <img src={background} alt="img1"/> */}
                    <h1><b> AggieExplorer </b></h1>
                    <h6>Grade distribution and enrollment probability tool</h6>
                    <p>
                        <a class="btn btn-large btn-info" href="list">Browse Courses</a>
                    </p> 
                    <p class="whatwedo"> What we do </p>
                </div>
            </div>
        )
    }
}