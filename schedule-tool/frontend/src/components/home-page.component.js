import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/home-page.css'; 
import gradeimage from "./images/grade.png"
import enrollmentimage from "./images/enrollment.png"


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
                                <div class="whatwedo"><b>What we do</b></div>
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
                    <div class="container">
                        <div class="row">
                            <div id="featuresleft" class="col-md-5 d-flex justify-content-center">
                                <a href="grades"> 
                                    <div id="gradecard" class="card">
                                        <div class="card-body">
                                            <div id="gradecardimage"><img src={gradeimage} id="gradeimage"/></div>
                                            <div id="gradecardtitle"><b>Grade Distribution</b></div>
                                            <div id="gradecarddescription">We provide grade distributions for most UC Davis courses, along with the terms and professors that teach those courses.</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-md-1 justify-content-center"></div>
                            <div id="featuresright" class="col-md-6 justify-content-center">
                                <a href="search">
                                    <div id="enrollmentcard" class="card">
                                        <div id="enrollmentcardimage"><img src={enrollmentimage}/></div>
                                        <div id="enrollmentcardtitle"><b>Enrollment Probability</b></div>
                                        <div id="enrollmentcarddescription">We provide information on how many students are enrolling for courses within each day of the scheduling period.</div>
                                    </div>
                                </a>
                            </div>
                        </div>
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