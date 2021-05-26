import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css';

export default class Navbar extends Component {

  render() {
    return (
      <nav id="navbar" className="navbar navbar-dark navbar-expand-lg">
        <Link id="navbartitle" to="/" className="navbar-brand">AggieExplorer</Link>
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
      </nav>
    );
  }
}