import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootstrap from "react-bootstrap"

export default class Navbar extends Component {

  render() {
    return (
      <ReactBootstrap.Navbar collapseOnSelect expand="md" variant="dark" id="navbar">
        <ReactBootstrap.Navbar.Brand href="/" id="navbartitle">Aggie Explorer</ReactBootstrap.Navbar.Brand>
        <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootstrap.Nav className="ml-auto" id="navlinks">
            <ReactBootstrap.Nav.Link href="/course" id="navlinksspace" >Catalog</ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link href="/grades" id="navlinksspace">Grades</ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link href="/enrollment" id="navlinksspace">Enrollment</ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link href="/about" id="navlinksspace">About</ReactBootstrap.Nav.Link>
          </ReactBootstrap.Nav>
          
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Navbar>
    );
  }
}

{/* <nav id="navbar" className="navbar navbar-dark navbar-expand-lg">
        <Link id="navbartitle" to="/" className="navbar-brand">AggieExplorer</Link>
        <button class="navbar-toggler ml-auto" 
                type="button"
                data-toggle="collapse" 
                data-target="#nav2">
            <span class="navbar-toggler-icon">
          </span>
        </button>
        <div id="navlinks" className="navlinks collpase navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item">
            <Link id="navlinksspace" to="/course" className="nav-link">Catalog</Link>
            </li>
            <li className="navbar-item">
            <Link id="navlinksspace" to="/grades" className="nav-link">Grades</Link>
            </li>
            <li className="navbar-item">
            <Link id="navlinksspace" to="/enrollment" className="nav-link">Enrollment</Link>
            </li>
            <li className="navbar-item">
            <Link id="navlinksspace" to="/about" className="nav-link">About</Link>
            </li>
          </ul>
        </div>
      </nav> */}