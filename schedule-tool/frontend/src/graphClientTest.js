import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';



var name = "ECS122A"

const getCoursesQuery = gql`
    query ($name: String!) {  
        course_id(id: $name) {
            name
            instructor
        }
    }
`;

// const params = { name: "ECS120"}

// // `www.google.com/${name}`
// const getCoursesQuery = gql`
//     {         
//         course_id(id: $name) {
//             name
//             instructor
//         }
//     }
// `;

// const getCoursesQuery = gql`
// {
//   courses {
//     name
//     instructor
//   }
// }
// `;

class GraphClientTest extends Component {
    render() {
        console.log(this.props.data);
        console.log("hello there");
        return (
            <div>
                hi
            
            </div>
        )
    }
}

export default graphql(getCoursesQuery, {
    options: (props) => {
        return {
            variables: {
                name: name
            }
        }
    }
})(GraphClientTest);