import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/home-page.css'; 
import background from './HomeIllustration.png';

export default class HomePage extends Component {
    render(){
        return(
            // background-image: url("localhost:3000(/img/Home%20Illustration.png");
            <div>
            {/* // <div styles={{ backgroundImage:`url(${background})`}} > */}
                <div class="introspace">
                    <div class="intro">
                        {/* <img src={background} alt="img1"/> */}
                        <div class="introtext">
                            <h1 class="title"><span class="Aggie"><b>Aggie</b></span><span class="Explorer"><b>Explorer</b></span></h1>
                            <h6 class="Description">Grade distribution and enrollment probability tool</h6>
                            <p class="button">
                                <a id="homebutton" class="btn btn-large btn-info" href="list">Browse Courses</a>
                            </p> 
                        </div>
                        <div class="whatwedo"> What we do </div>
                    </div>
                </div>
                <div class="mission">
                    <h1 class="missionleft">Mission</h1> 
                    <div class="missionright">To help provide transparency and additional information about UC Davis courses in order to help students make better decisions during course registration</div>
                </div>
                <div class="features">
                    <h1 class="featuresleft">Features<br /></h1>
                    <div class="featuresright"></div>
                </div>
            </div>
        )
    }
}