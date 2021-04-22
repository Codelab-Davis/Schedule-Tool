import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';


const getCoursesQuery = gql`
{
  course_id(id: "AAS178") {
    name
    instructor
  }
}
`;

class GraphClientTest extends Component {
    render() {
        console.log(this.props.data.courses);
        console.log("hello there");
        return (
            <div>
                hi
            
            </div>
        )
    }
}

export default graphql(getCoursesQuery)(GraphClientTest);