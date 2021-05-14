import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const courseFilterQuery = gql `
    query ($course_name: String!, $instructor_name: String!, $units_count: String!) {
        course_filter(course_id: $course_name, instructor: $instructor_name, units: $units_count) {
            name
            course_id
            units
            instructor
        }
    }
`;

export { courseFilterQuery };