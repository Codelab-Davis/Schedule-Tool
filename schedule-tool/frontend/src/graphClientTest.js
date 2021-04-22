import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';


const getCoursesQuery = gql`
{
  courses {
    name
    instructor
  }
}
`;

class GraphClientTest extends Component {
    render() {
        console.log(this.props);
        console.log("hello there");
        return (
            <div>
                <ul id="list">
                <li>Name</li>
                </ul>
            </div>
        )
    }
}

export default graphql(getCoursesQuery)(GraphClientTest);