import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./home-page.component";
import CourseCard from "./course-card.component";
import GradeInfo from "./grade-info.component";
import DetailsList from "./class-search.component";
import EditCourse from "./edit-class.component";
import EnrollmentInfo from "./enrollment-info.component";
import CreateCourse from "./create-class.component";
import AboutPage from "./about-page.component";
import GraphClientTest from "./../graphClientTest";

export default function RouterPage(props) {
    return (
        <Switch>
          <Route
            exact
            path="/grades/:class/:quarter/:instructor1"
            component={(props) => <GradeInfo {...props} />}
          />
          <Route path="/" exact component={HomePage} />
          <Route path="/course" component={CourseCard} />
          <Route path="/grades" component={GradeInfo} />
          <Route path="/list" component={DetailsList} />
          <Route path="/enrollment" component={EnrollmentInfo} />
          <Route path="/edit" component={EditCourse} />
          <Route path="/create" component={CreateCourse} />
          <Route path="/about" component={AboutPage} />
          <Route path="/test" component={GraphClientTest} />
        </Switch>
    )
}

// Example of a route based on a specific course: (uncomment it)
{/* <Route
    exact
    path="/course/:courseId"
    component={(props) => <SomeComponent {...props} />}
/> */}