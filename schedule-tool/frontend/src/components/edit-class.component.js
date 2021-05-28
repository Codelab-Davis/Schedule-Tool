import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditCourse extends Component {
  constructor(props) {
    super(props);
  
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCourse_ID = this.onChangeCourse_ID.bind(this);
    this.onChangeInstructor = this.onChangeInstructor.bind(this);
    this.onChangeGE = this.onChangeGE.bind(this);
    
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
    this.onChangeI = this.onChangeI.bind(this);
    this.onChangeP = this.onChangeP.bind(this);
    this.onChangeNP = this.onChangeNP.bind(this);
    this.onChangeY = this.onChangeY.bind(this);

    this.onChangeQuarter = this.onChangeQuarter.bind(this);
    this.onChangeEnrollment = this.onChangeEnrollment.bind(this);
      
      this.state = {  
        name: '',
        course_id: '',
        instructor: '',
        ge: '',
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
        I:0,
        P: 0,
        NP: 0,
        Y: 0,
        quarter: '',
        enrollment: [],
        courses: []
      }
    }

  componentDidMount() {
    axios.get('https://backend.aggieexplorer.com/details/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          Name: response.data.Name,
          course_id: response.data.course_id,
          instructor: response.data.instructor,
          ge: response.data.ge,
          aplus: response.data.aplus,
          a: response.data.a,
          aminus: response.data.aminus,
          bplus: response.data.bplus,
          b: response.data.b,
          bminus: response.data.bminus,
          cplus: response.data.cplus,
          c: response.data.c,
          cminus: response.data.cminus,
          dplus: response.data.dplus,
          d: response.data.d,
          dminus: response.data.dminus,
          f: response.data.f,
          I: response.data.I,
          P: response.data.P,
          NP: response.data.NP,
          Y: response.data.Y,
          quarter: response.data.quarter,
          enrollment: response.data.enrollment
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('https://backend.aggieexplorer.com/details/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            courses: response.data.map(courses => courses.name),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeCourse_ID(e) {
    this.setState({
      course_id: e.target.value
    })
  }

  onChangeInstructor(e) {
    this.setState({
      instructor: e.target.value
    })
  }

  onChangeGE(e) {
    this.setState({
      ge: e.target.value
    })
  }

  onChangeAPlus(e) {
    this.setState({
      aplus: e.target.value
    })
  }
  
  onChangeA(e) {
    this.setState({
      a: e.target.value
    })
  }

  onChangeAMinus(e) {
    this.setState({
      aminus: e.target.value
    })
  }

  onChangeBPlus(e) {
    this.setState({
      bplus: e.target.value
    })
  }

  onChangeB(e) {
    this.setState({
      b: e.target.value
    })
  }

  onChangeBMinus(e) {
    this.setState({
      bminus: e.target.value
    })
  }

  onChangeC(e) {
    this.setState({
      C: e.target.value
    })
  }

  onChangeCPlus(e) {
    this.setState({
      cplus: e.target.value
    })
  }

  onChangeCMinus(e) {
    this.setState({
      cminus: e.target.value
    })
  }

  onChangeDPlus(e) {
    this.setState({
      dplus: e.target.value
    })
  }

  onChangeD(e) {
    this.setState({
      d: e.target.value
    })
  }

  onChangeDMinus(e) {
    this.setState({
      dminus: e.target.value
    })
  }

  onChangeF(e) {
    this.setState({
      f: e.target.value
    })
  }

  onChangeI(e) {
    this.setState({
      I: e.target.value
    })
  }

  onChangeP(e) {
    this.setState({
      P: e.target.value
    })
  }

  onChangeNP(e) {
    this.setState({
      NP: e.target.value
    })
  }

  onChangeY(e) {
    this.setState({
      Y: e.target.value
    })
  }

  onChangeQuarter(e) {
    this.setState({
      quarter: e.target.value
    })
  }

  onChangeEnrollment(e) {
    this.setState({
      enrollment: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const courses = {
          name: this.state.name,
          courses_id: this.state.course_id,
          instructor: this.state.instructor,
          ge: this.state.ge,
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
          I: this.state.I,
          P: this.state.P,
          NP: this.state.NP,
          Y: this.state.Y,
          course: this.state.course,
          enrollment: this.state.enrollment
    }
  
    console.log(courses);
    window.location = '/';  

    axios.post('https://backend.aggieexplorer.com/details/update/' + this.props.match.params.id, courses)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render(){
    return(
        <div>
            <h3>Edit Courses Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Course Name: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        />
                </div>
                <div className="form-group"> 
                <label>Course ID: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.class_id}
                    onChange={this.onChangeClass_ID}
                    />
                </div>
                <div className="form-group"> 
                <label>Instructor: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.instructor}
                    onChange={this.onChangeInstructor}
                    />
                </div>
                <div className="form-group"> 
                <label>GE: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.ge}
                    onChange={this.onChangeGE}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of A+: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.aplus}
                    onChange={this.onChangeAPlus}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of A: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.a}
                    onChange={this.onChangeA}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of A-: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.aminus}
                    onChange={this.onChangeAMinus}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of B+: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.bplus}
                    onChange={this.onChangebPlus}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of B: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.b}
                    onChange={this.onChangeB}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of B-: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.bminus}
                    onChange={this.onChangebminus}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of C+: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.cplus}
                    onChange={this.onChangecPlus}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of C: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.c}
                    onChange={this.onChangeC}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of C-: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.cminus}
                    onChange={this.onChangeCMinus}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of D+: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.dplus}
                    onChange={this.onChangeDPlus}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of D: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.d}
                    onChange={this.onChangeD}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of D-: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.dminus}
                    onChange={this.onChangeDMinus}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of F: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.f}
                    onChange={this.onChangeF}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of I: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.I}
                    onChange={this.onChangeI}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of P: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.P}
                    onChange={this.onChangeP}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of NP: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.NP}
                    onChange={this.onChangeNP}
                    />
                </div>
                <div className="form-group"> 
                <label>Number of Y: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.Y}
                    onChange={this.onChangeY}
                    />
                </div>
                <div className="form-group"> 
                <label>Quarter: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.quarter}
                    onChange={this.onChangeQuarter}
                    />
                </div>
                <div className="form-group"> 
                <label>Enrollment: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.enrollment}
                    onChange={this.onChangeEnrollment}
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