import React, { Component, PureComponent } from "react";
import Select, { createFilter } from "react-select";
import axios from "axios";
import WindowedSelect from "react-windowed-select";
import {Area,Line,BarChart,LineChart,Bar,Cell,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from "recharts";
import { ComposedChart } from "recharts";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

// Default class to export
// This component contains two main sections
//    1. selection of course on top of page
//    2. Graph of grades and legend on bottom of page
export default class GradePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.courses = []; //this stores the course jsons from the database
        this.state.formatted_data_for_graph = [];
        this.state.charLegend = [];

        //store the drop down menu opstions
        this.state.course_drop_down_menu_options = [];
        this.state.quarter_drop_down_menu_options = [];
        this.state.instructor_drop_down_menu_options = [];

        //selected values from the drop down menus
        this.state.selected_course_id = null;
        this.state.selected_course_id_quarter = null;
        this.state.selected_course_id_quarter_instructor = null;
        this.state.all_fields_filled_out = false;

        this.handleCourseChangeRef = this.handleCourseChange.bind(this);
        this.handleQuarterChangeRef = this.handleQuarterChange.bind(this);
        this.handleInstructureChangeRef = this.handleInstructureChange.bind(this);

        this.addCourseRef = this.addCourse.bind(this);
        this.handleCourseDeleteRef = this.handleCourseDelete.bind(this);

        // used for placeholder values
        this.courseListRef = React.createRef();
        this.quarterListRef = React.createRef();
        this.instructorListRef = React.createRef();
        this.MAX_X_AXIS_NUM_ELEMENTS = 4;
    }
    componentDidMount(){
        //get all the course id's from the database query
        axios.get("http://localhost:5000/enrollment")
        .then(function(res){
            for (var i = 0; i < res.data.data.length; i++){
                this.state.courses.push(res.data.data[i]);
            }
        })
        .catch(function(err){
            console.log("Could not fetch courses from database:" + err);
        });
        console.log(this.state.courses);         
    }
    handleCourseDelete(event)
    {
        var deleteIndex = parseInt(event.target.getAttribute("data-index"));
        this.COURSE_DETAIL_COLOR.push(this.state.courses[deleteIndex]["info"]["color"]);
        this.state.coursesGradesData.splice(deleteIndex, 1);
        this.format_data();
    }
/*
    format_data()
    {
        var temp_data = [];
        var temp_legend = [];
        this.state.formatted_data_for_graph = [];
        for (var i = 0; i < this.state.)
    }
       */     
        
}

