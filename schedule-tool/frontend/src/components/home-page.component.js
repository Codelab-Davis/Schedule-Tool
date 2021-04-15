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
                <div id="intro" class="introspace">
                    <div class="intro">
                        {/* <img src={background} alt="img1"/> */}
                        <div class="introtext">
                            <h1 class="title"><span class="Aggie"><b>Aggie</b></span><span class="Explorer"><b>Explorer</b></span></h1>
                            <h6 class="Description">Grade distribution and enrollment probability tool</h6>
                            <p class="button">
                                <a id="homebutton" class="btn btn-large btn-info" href="list">Browse Courses</a>
                            </p> 
                        </div>
                        <div class="introarrow">
                                <div class="whatwedo"> What we do </div>
                                <a href="#mission">    
                                    <div class="arrow"></div>
                                </a>
                        </div>
                    </div>
                </div>
                <div id="mission" class="mission">
                    <h1 id="missionleft" class="col-md-5"><b>Our Mission</b></h1> 
                    <div id="missionright" class="col=md-7">To help provide transparency and additional information about UC Davis courses in order to help students make better decisions during course registration.</div>
                </div>
                <div class="features">
                    <div class="featurestitle"><b>Features</b></div>
                    <div id="featuresleft" class="col-md-6">
                        <a href="grades"> 
                            <div class="gradecard">
                                <div class="gradecardimage"></div>
                                <div class="gradecardtitle"><b></b></div>
                                <div class="gradecarddescription"></div>
                            </div>
                        </a>
                    </div>
                    <div id="featuresright" class="col-md-6">
                        <a href="search">
                            <div class="enrollmentcard">
                                <div class="enrollmentcardimage"></div>
                                <div class="enrollmentcardtitle"><b></b></div>
                                <div class="enrollmentcarddescription"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="footer">
                    <div class="footertext">
                        <a href="course">
                            <span class="footerCatalog">Catalog</span>
                        </a>
                        <a href="grades">
                            <span class="footerGrades">Grades</span>
                        </a>
                        <a href="list">
                            <span class="footerEnrollment">Enrollment</span>
                        </a>
                        <a href="about">
                            <span class="footerAbout">About</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}