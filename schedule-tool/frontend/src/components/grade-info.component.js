import React, { PureComponent } from 'react';
//import { Link } from 'react-router-dom';
import { Area, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ComposedChart } from 'recharts';
//import axios from 'axios';

//var MongoClient = require()


// var aplus = props.detail.aplus
// var a = props.detail.a
// var aminus = props.detail.aminus
// var bplus = props.detail.bplus
// var b = props.detail.b
// var bminus = props.detail.bminus
// var cplus = props.detail.cplus
// var c = props.detail.c
// var cminus = props.detail.cminus
// var dplus = props.detail.dplus
// var d = props.detail.d
// var dminus = props.detail.dminus
// var f = props.detai.f
// var I = props.detail.I
// var P = props.detail.P
// var NP = props.detail.NP
// var Y = props.detail.Y

// let grades = [aplus, a, aminus, bplus, b, bminus, cplus, c, cminus, dplus, d, dminus, fplus, f, I, P, NP, Y]

// function genDist(grades) {
//   let grade_name = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'I', 'P', 'NP', 'Y']
//   var res = []
//   for (var i = 0; i < grades.length; i++){
//     var dict = {}
//     dict['name'] = grade_name[i]
//     dict['uv'] = grades[i]
//     res.push(dict)
//   }
//   return res
// }
// for (var i = 0; i < res.length; i++){
//   System.out.println(res[i])
// }

// create GradeInfoHelper object
// pass in grade distribution
//    e.g. [numA+, numA, numA-, ...]
// call object.getDist() -> this will return array of dictionaries

const CourseStuff = props => (
    <tr>
      <td>{props.detail.name}</td> 
      <td>{props.detail.course_id}</td>
      <td>{props.detail.instructor}</td>
      <td>{props.detail.aplus}</td>
      <td>{props.detail.a}</td>
      <td>{props.detail.aminus}</td>
      <td>{props.detail.bplus}</td>
      <td>{props.detail.b}</td>
      <td>{props.detail.bminus}</td>
      <td>{props.detail.cplus}</td>
      <td>{props.detail.c}</td>
      <td>{props.detail.cminus}</td>
      <td>{props.detail.dplus}</td>
      <td>{props.detail.d}</td>
      <td>{props.detail.dminus}</td>
      <td>{props.detail.fplus}</td>
      <td>{props.detail.I}</td>
      <td>{props.detail.P}</td>
      <td>{props.detail.NP}</td>
      <td>{props.detail.Y}</td>
      <td>{props.detail.quarter}</td>
    </tr>
  )

  const data = [
    {
      name: 'A+',
      uv: 8,
    },
    {
      name: 'B',
      uv: 6,
    },
    {
      name: 'C',
      uv: 12,
    },
    {
      name: 'D',
      uv: 2,
    },
    {
      name: 'D-',
      uv: 2,
    },
    {
      name: 'F',
      uv: 1,
    },
    {
      name: 'P',
      uv: 15,
    },
  ];

// var details; // contains a course's set of data:

// const data = {
//   {
//     name: 'A+',
//     uv: details.aplus,
//   }
// };

  
/*export default class GradeInfo extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: 'Computer Architecture',
            course_id: 'ECS150',
            instructor: '',
            aplus: 20,
            a: 10,
            aminus: 19,
            bplus: 12,
            b: 20,
            bminus: 10,
            cplus: 6,
            c: 3,
            cminus: 1,
            dplus: 2,
            d: 4,
            dminus: 0,
            f: 1,
            I: 1,
            P: 2,
            NP: 2,
            Y: 0,
            quarter: 'FQ2020'
        }
    }*/

    export default class Example extends PureComponent {
        static demoUrl = 'https://codesandbox.io/s/tiny-bar-chart-35meb';
      
        render() {
          return (
            <div style={{ width: 500, height: 300 }}>
				<ResponsiveContainer>
					<ComposedChart
						width={500}
						height={400}
						data={data}
						margin={{
							top: 20, right: 20, bottom: 20, left: 20,
						}}
					>
						<CartesianGrid stroke="#f5f5f5" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						{/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
						  <Bar dataKey="uv" barSize={20} fill="#413ea0" />
						{/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
					</ComposedChart>
				</ResponsiveContainer>
			</div>
          );
        }
      }
      