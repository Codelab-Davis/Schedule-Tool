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
import groupimage from "./TeamImages/group.png";


export default class AboutPage extends Component {
    render(){
        return(
            <div>
                <div class = "About">
                    <div class="row" id="AboutOurTeam">
                        <div id="aboutimage" class="col-md-7">
                            <img src={groupimage} id="group"/>    
                        </div> 
                        <div id="aboutdescription" class="col-md-5">
                            <div id="aboutinfo">
                                <h1 id="abouttitle"><b>About Our Team</b></h1>
                                <div id="aboutdescrip">
    AggieExplorer was built by a small team of developers and designers during the Winter/Spring 2021 cohort of CodeLab! Our goal was to create a web platform to help students at UC Davis make better decisions on their course choices by providing extra information. Visit our CodeLab site <a href="https://codelabdavis.com/" target="_blank"><b>here</b></a> to learn more about our organization and the different projects we do!</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class = "About2">
                    <div class="row" id="AboutOurTeam2">
                        <div id="aboutimage2">
                            <img src={groupimage} id="group2"/>    
                        </div> 
                        <div id="aboutdescription2">
                            <div id="aboutinfo2">
                                <h1 id="abouttitle2"><b>About Our Team</b></h1>
                                <div id="aboutdescrip2">
    AggieExplorer was built by a small team of developers and designers during the Winter/Spring 2021 cohort of CodeLab! Our goal was to create a web platform to help students at UC Davis make better decisions on their course choices by providing extra information. Visit our CodeLab site <a href="https://codelabdavis.com/" target="_blank"><b>here</b></a> to learn more about our organization and the different projects we do!</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="members">
                    <div class="memberstitle"><b>Current Members</b></div>
                    <div class="container px-5 py-5">
                        <div class="row">
                            <div class="col pr-3 pl-3">
                                <img src={minhtuimage} id="minhtu" class="imageClick" onClick={() => window.open("https://www.linkedin.com/in/minhtumnguyen/")}/>
                                <div class="name"><b>Minh-Tu Nguyen</b></div>
                                <div class="position">Project Manager</div>
                            </div>
                            <div class="col pr-3 pl-3">
                                <img src={keimage} id="ke" class="imageClick" onClick={() => window.open("https://www.linkedin.com/in/keylinn/")}/>
                                <div class="name"><b>Ke Lin</b></div>
                                <div class="position">Designer</div>
                            </div>
                            <div class="col pr-3 pl-3">
                                <div class="kiran"><img src={kiranimage} id="kiran" class="imageClick" onClick={() => window.open("https://www.linkedin.com/in/kiran-poonia-9705a3159/")}/></div>
                                <div class="name"><b>Kiran Poonia</b></div>
                                <div class="position">Designer</div>
                            </div>
                            <div class="col pr-3 pl-3">
                                <img src={johnimage} id="john" class="imageClick" onClick={() => window.open("https://www.linkedin.com/in/johnhyukjung/")}/>
                                <div class="name"><b>John Jung</b></div>
                                <div class="position">Software Developer</div>
                            </div>
                            <div class="col pr-3 pl-3">
                                <img src={salmaimage} id="salma" class="imageClick" onClick={() => window.open("https://www.linkedin.com/in/salmahassen/")}/>
                                <div class="name"><b>Salma Hassen</b></div>
                                <div class="position">Software Developer</div>
                            </div>
                        </div>
                    </div>
                <div class="container px-5 py-5">
                    <div class="row">
                        <div class="col pr-3 pl-3">
                            <img src={elizabethimage} id="elizabeth"/>
                            <div class="name"><b>Elizabeth Hopkins</b></div>
                            <div class="position">Software Developer</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={prabhdeepimage} id="prabhdeep" class="imageClick" onClick={() => window.open("https://www.linkedin.com/in/prabhdeep-kainth/")}/>
                            <div class="name"><b>Prabhdeep Kainth</b></div>
                            <div class="position">Software Developer</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={jamesimage} id="james" class="imageClick" onClick={() => window.open("https://www.linkedin.com/in/jamesjunaidi/")}/>
                            <div class="name"><b>James Junaidi</b></div>
                            <div class="position">VP and Project Mentor</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={omidimage} id="omid" class="imageClick" onClick={() => window.open("https://www.linkedin.com/in/omidmogasemi/")}/>
                            <div class="name"><b>Omid Mogasemi</b></div>
                            <div class="position">VP and Mentor</div>
                        </div>
                        <div class="col pr-3 pl-3">
                            <img src={genniferimage} id="gennifer" class="imageClick" onClick={() => window.open("https://www.linkedin.com/in/gennifer-hom/")}/>
                            <div class="name"><b>Gennifer Hom</b></div>
                            <div class="position">VP of Design</div>
                        </div>
                    </div>
                </div>
            </div>
                    

                    <div class="members2">
                        <div class="memberstitle2"><b>Current Members</b></div>  
                        <div class="container">                    
                            <div class="row">
                                <div class="col-6">
                                    <img src={minhtuimage} id="image2"/>
                                    <div class="name2"><b>Minh-Tu Nguyen</b></div>
                                    <div class="position2">Project Manager</div>
                                </div>
                                <div class="col-6">
                                    <img src={keimage} id="image2r"/>
                                    <div class="name2r"><b>Ke Lin</b></div>
                                    <div class="position2r">Designer</div>
                                </div>
                            </div>
                        </div>
                        <div class="container">
                        <div class="row">
                            <div class="col-6">
                                <div class="kiran2"><img src={kiranimage} id="image2"/></div>
                                <div class="name2"><b>Kiran Poonia</b></div>
                                <div class="position2">Designer</div>
                            </div>
                            <div class="col-6">
                                <img src={johnimage} id="image2r"/>
                                <div class="name2r"><b>John Jung</b></div>
                                <div class="position2r">Software Developer</div>
                            </div>
                        </div>
                        </div>
                        <div class="container">
                        <div class="row">
                            <div class="col-6">
                                <img src={salmaimage} id="image2"/>
                                <div class="name2"><b>Salma Hassen</b></div>
                                <div class="position2">Software Developer</div>
                            </div>
                            <div class="col-6">
                                <img src={elizabethimage} id="image2r"/>
                                <div class="name2r"><b>Elizabeth Hopkins</b></div>
                                <div class="position2r">Software Developer</div>
                            </div>
                        </div>
                        </div>
                        <div class="container">
                        <div class="row">
                            <div class="col-6">
                                <img src={prabhdeepimage} id="image2"/>
                                <div class="name2"><b>Prabhdeep Kainth</b></div>
                                <div class="position2">Software Developer</div>
                            </div>
                            <div class="col-6">
                                <img src={jamesimage} id="image2r"/>
                                <div class="name2r"><b>James Juinadi</b></div>
                                <div class="position2r">VP and Project Mentor</div>
                            </div>
                        </div>
                        </div>
                        <div class="container">
                        <div class="row">
                            <div class="col-6">
                                <img src={omidimage} id="image2"/>
                                <div class="name2"><b>Omid Mogasemi</b></div>
                                <div class="position2">VP and Mentor</div>
                            </div>
                            <div class="col-6">
                                <img src={genniferimage} id="image2r"/>
                                <div class="name2r"><b>Gennifer Hom</b></div>
                                <div class="position2r">VP of Design</div>
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

                <div class="footer2">
                    <div class="footertext2">
                        <a href="course">
                            <span class="footerCatalog2">Catalog</span>
                        </a>
                        <a href="grades">
                            <span class="footerGrades2">Grades</span>
                        </a>
                        <a href="list">
                            <span class="footerEnrollment2">Enrollment</span>
                        </a>
                        <a href="about">
                            <span class="footerAbout2">About</span>
                        </a>
                    </div>
                </div>
            </div>

        )
    }
}
