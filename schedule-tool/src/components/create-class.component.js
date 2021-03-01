import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateCourse extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCourse_ID = this.onChangeCourse_ID.bind(this);
        this.onChangeInstructor = this.onChangeInstructor.bind(this);
        
        this.onChangeAPlus = this.onChangeAPlus.bind(this);
        this.onChangeA = this.onChangeA.bind(this);
        this.onChangeAMinus = this.onChangeAMinus.bind(this);

        this.onChangeBPlus = this.onChangeBPlus.bind(this);
        this.onChangeB = this.onChangeB.bind(this);
        this.onChangeBMinus = this.onChangeBMinus.bind(this);

        this.onChangeCPlus = this.onChangeCPlus.bind(this);
        this.onChangeC = this.onChangeC.bind(this);
        this.onChangeCMinus = this.onChangeCMinus.bind(this);

        this.onChangeDPlus = this.onChangeDPlus.bind(this);
        this.onChangeD = this.onChangeD.bind(this);
        this.onChangeDMinus = this.onChangeDMinus.bind(this);

        this.onChangeF = this.onChangeF.bind(this);

        this.onChangeQuarter = this.onChangeQuarter.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            course_id: '',
            instructor: '',
            aplus: 0,
            a: 0,
            aminus: 0,
            bplus: 0,
            b: 0,
            bminus: 0,
            cplus: 0,
            c: 0,
            cminus: 0,
            dplus: 0,
            d: 0,
            dminus: 0,
            f: 0,
            quarter: '',
            courses: []
        }

    }
    

    // componentDidMount(){
    //     axios.get('http://localhost:5000/detail/')
    //         .then(response => {
    //             if (response.data.length > 0) {
    //                 this.setState({
    //                     classes: response.data.map(classes => classes.name),
    //                     class_id: response.data[0].class_id
    //                 })
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })

    // }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeCourse_ID(e){
        this.setState({
            course_id: e.target.value
        });
    }

    onChangeInstructor(e){
        this.setState({
            instructor: e.target.value
        });
    }

    onChangeAPlus(e){
        this.setState({
            aplus: e.target.value
        });
    }

    onChangeA(e){
        this.setState({
            a: e.target.value
        });
    }

    onChangeAMinus(e){
        this.setState({
            aminus: e.target.value
        });
    }

    onChangeBPlus(e){
        this.setState({
            bplus: e.target.value
        });
    }

    onChangeB(e){
        this.setState({
            b: e.target.value
        });
    }

    onChangeBMinus(e){
        this.setState({
            bminus: e.target.value
        });
    }
    onChangeCPlus(e){
        this.setState({
            cplus: e.target.value
        });
    }

    onChangeC(e){
        this.setState({
            c: e.target.value
        });
    }

    onChangeCMinus(e){
        this.setState({
            cminus: e.target.value
        });
    }
    onChangeDPlus(e){
        this.setState({
            dplus: e.target.value
        });
    }

    onChangeD(e){
        this.setState({
            d: e.target.value
        });
    }

    onChangeDMinus(e){
        this.setState({
            dminus: e.target.value
        });
    }
    onChangeF(e){
        this.setState({
            f: e.target.value
        });
    }
    onChangeQuarter(e){
        this.setState({
            quarter: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(this.state.name);
        const course = {
            name: this.state.name,
            course_id: this.state.course_id,
            instructor: this.state.instructor,
            aplus: this.state.aplus,
            a: this.state.a,
            aminus: this.state.aminus,
            bplus: this.state.bplus,
            b: this.state.b,
            bminus: this.state.bminus,
            cplus: this.state.cplus,
            c: this.state.c,
            cminus: this.state.cminus,
            dplus: this.state.dplus,
            d: this.state.d,
            dminus: this.state.dminus,
            f: this.state.f,
            quarter: this.state.quarter
        }
        
        console.log(course);

        axios.post('http://localhost:5000/detail/add', course)
            .then(res => console.log(res.data))

        window.location = '/'; 
    }

    render(){
        return(
            <div>
                <h3>Create New Course Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Course Name: </label>
                        <input  type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            />
                    </div>
                    <div className="form-group"> 
                    <label>Course ID: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.course_id}
                        onChange={this.onChangeCourse_ID}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Instructor: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.instructor}
                        onChange={this.onChangeInstructor}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of A+: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.aplus}
                        onChange={this.onChangeAPlus}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of A: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.a}
                        onChange={this.onChangeA}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of A-: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.aminus}
                        onChange={this.onChangeAMinus}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of B+: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.bplus}
                        onChange={this.onChangeBPlus}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of B: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.b}
                        onChange={this.onChangeB}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of B-: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.bminus}
                        onChange={this.onChangeBMinus}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of C+: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.cplus}
                        onChange={this.onChangeCPlus}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of C: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.c}
                        onChange={this.onChangeC}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of C-: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.cminus}
                        onChange={this.onChangeCMinus}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of D+: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.dplus}
                        onChange={this.onChangeDPlus}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of D: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.d}
                        onChange={this.onChangeD}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of D-: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.dminus}
                        onChange={this.onChangeDMinus}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Number of F: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.f}
                        onChange={this.onChangeF}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Quarter: </label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.quarter}
                        onChange={this.onChangeQuarter}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Course Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}