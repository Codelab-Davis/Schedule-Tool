import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';


import Navbar from "./components/navbar.component.js";
import HomePage from "./components/home-page.component";
import CourseCard from "./components/course-card.component";
import CourseInfo from "./components/course-info.component";
import DetailsList from "./components/class-search.component";
import EditCourse from "./components/edit-class.component";
import CreateCourse from "./components/create-class.component";

function App() {
  return (
    <Router>
        <Navbar />
        <br />
        <Route path="/" exact component={HomePage} />
        <Route path="/course" component={CourseCard} />
        <Route path="/courseinfo" component={CourseInfo} />
        <Route path="/list" component={DetailsList} />
        <Route path="/edit" component={EditCourse} />
        <Route path="/create" component={CreateCourse} />
    </Router>
  );
}

export default App;
