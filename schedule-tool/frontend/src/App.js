import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';


import Navbar from "./components/navbar.component.js";
import HomePage from "./components/home-page.component";
import CourseCard from "./components/course-card.component";
import GradeInfo from "./components/grade-info.component";
import DetailsList from "./components/class-search.component";
import EditCourse from "./components/edit-class.component";
import CreateCourse from "./components/create-class.component";
import AboutPage from "./components/about-page.component";

const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Navbar />
          <br />
          <Route path="/" exact component={HomePage} />
          <Route path="/course" component={CourseCard} />
          <Route path="/grades" component={GradeInfo} />
          <Route path="/list" component={DetailsList} />
          <Route path="/edit" component={EditCourse} />
          <Route path="/create" component={CreateCourse} />
          <Route path="/about" component={AboutPage} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
