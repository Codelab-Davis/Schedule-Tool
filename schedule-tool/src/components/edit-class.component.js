import React, { Component } from 'react';
import axios from 'axios';

export default class EditClass extends Component {
  constructor(props) {
    super(props);
  
      this.className = this.className.bind(this);
      this.class_id = this.class_id.bind(this);
      this.instructor = this.instructor.bind(this);
      this.aplus = this.aplus.bind(this);
      this.a = this.a.bind(this);
      this.aminus = this.aminus.bind(this);
      this.bplus = this.bplus.bind(this);
      this.b = this.b.bind(this);
      this.bminus = this.bminus.bind(this);
      this.cplus = this.cplus.bind(this);
      this.c = this.c.bind(this);
      this.cminus = this.cminus.bind(this);
      this.dplus = this.dplus.bind(this);
      this.dminus = this.dminus.bind(this);
      this.f = this.f.bind(this);
      this.quarter = this.quarter.bind(this);
      
      this.state = {  
        name: '',
        class_id: '',
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
        classes: []
      }
    }

  componentDidMount() {
    axios.get('http://localhost:5000/details/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          Name: response.data.Name,
          class_id: response.data.class_id,
          instructor: response.data.instructor,
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
          quarter: response.data.quarter
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/details/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            classes: response.data.map(classes => classes.name),
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

  onChangeclass_id(e) {
    this.setState({
      class_id: e.target.value
    })
  }

  onChangeInstructor(e) {
    this.setState({
      instructor: e.target.value
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

  onChangeQuarter(e) {
    this.setState({
      quarter: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const classes = {
          name: this.state.name,
          class_id: this.state.class_id,
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
          course: this.state.course,
    }
  
    console.log(classes);
    window.location = '/';  

    axios.post('http://localhost:5000/details/update/' + this.props.match.params.id, classes)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render(){
    return(
        <div>
            <h3>EditClass Log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Class Name: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.className}
                        onChange={this.onChangeName}
                        />
                </div>
                <div className="form-group"> 
                <label>Class ID: </label>
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
                    value={this.state.B}
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
                <label>Quarter: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.quarter}
                    onChange={this.onChangeQuarter}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Class Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
}