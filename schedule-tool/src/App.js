import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';


import Navbar from "./components/navbar.component.js";
import ClassSearch from "./components/class-search.component";
import EditClass from "./components/edit-class.component";
import CreateClass from "./components/create-class.component";

function App() {
  return (
    <Router>
        <Navbar />
        <br />
        <Route path="/" exact component={ClassSearch} />
        <Route path="/edit/:id" component={EditClass} />
        <Route path="/create" component={CreateClass} />
    </Router>
  );
}

export default App;
