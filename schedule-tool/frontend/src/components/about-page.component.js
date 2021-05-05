import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/about-page.css';
import jamesimage from "./TeamImages/james.jpg";
import omidimage from "./TeamImages/omid.jpeg";
import genniferimage from "./TeamImages/gennifer.jpg";
import minhtuimage from "./TeamImages/minhtu.jpg";
import keimage from "./TeamImages/ke.jpeg";
import kiranimage from "./TeamImages/kiran.jpg";
import salmaimage from "./TeamImages/salma.png";
import elizabethimage from "./TeamImages/elizabeth.jpeg";
import prabhdeepimage from "./TeamImages/prabhdeep.jpg";
import johnimage from "./TeamImages/john.jpg";



export default class AboutPage extends Component {
    render(){
        return(
            <div>
                <div class="row" id="AboutOurTeam">
                    <div id="aboutimage" class="col-md-7"></div> 
                    <div id="aboutdescription" class="col-md-5">
                        <h1 id="abouttitle"><b>About Our Team</b></h1>
                    </div>
                </div>
                <div class="members">
                    <div class="memberstitle"><b>Current Members</b></div>
                <div class="container px-5 py-5">
                    <div class="row">
                        <div class="col pr-3 pl-3">
                            <img src={jamesimage} id="james"/>
                            <div class="name"><b>James Juinadi</b></div>
                            <div class="position">VP and Project Mentor</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={omidimage} id="omid"/>
                            <div class="name"><b>Omid Mogasemi</b></div>
                            <div class="position">VP and Mentor</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={genniferimage} id="gennifer"/>
                            <div class="name"><b>Gennifer Hom</b></div>
                            <div class="position">VP of Design</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={minhtuimage} id="minhtu"/>
                            <div class="name"><b>Minh-Tu Nguyen</b></div>
                            <div class="position">Project Manager</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={keimage} id="ke"/>
                            <div class="name"><b>Ke Lin</b></div>
                            <div class="position">Designer</div>
                        </div>
                    </div>
                </div>
                <div class="container px-5 py-5">
                    <div class="row">
                        <div class="col pr-3 pl-3">
                            <div class="kiran"><img src={kiranimage} id="kiran"/></div>
                            <div class="name"><b>Kiran Poonia</b></div>
                            <div class="position">Designer</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={johnimage} id="john"/>
                            <div class="name"><b>John Jung</b></div>
                            <div class="position">Software Developer</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={salmaimage} id="salma"/>
                            <div class="name"><b>Salma Hassen</b></div>
                            <div class="position">Software Developer</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={elizabethimage} id="elizabeth"/>
                            <div class="name"><b>Elizabeth Hopkins</b></div>
                            <div class="position">Software Developer</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={prabhdeepimage} id="prabhdeep"/>
                            <div class="name"><b>Prabhdeep Kainth</b></div>
                            <div class="position">Software Developer</div>
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