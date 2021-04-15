import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/about-page.css';

export default class AboutPage extends Component {
    render(){
        return(
            <div>
                <div class="members">
                    <img></img> //putting images of all of us 
                    <h1 class="memberstitle"><b>Current Members</b></h1>
                    <h2><b>Project Manager: Minh-Tu Nguyen</b></h2>   
                    <h2><b>Developer: Elizabeth Hopkins</b></h2>     
                    <h2><b>Developer: Prabhdeep Kainth </b></h2>   
                    <h2><b>Developer: Salma Hassen</b></h2>
                    <h2><b>Developer: Hyuk Jung</b></h2>
                    <h2><b>Design: Ke Lin</b></h2> 
                    <h2><b>Design: Kiran Poonia</b></h2> 
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