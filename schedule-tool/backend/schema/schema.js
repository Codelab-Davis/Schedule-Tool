const graphql = require('graphql');
const _ = require('lodash');
const Detail = require('../models/detail.model')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const CourseType = new GraphQLObjectType({
    name: "Course",
    fields: ( ) => ({
        name: { type: GraphQLString },
        course_id: { type: GraphQLString },
        instructor: { type: GraphQLString },
        aplus: { type: GraphQLString },
        a: { type: GraphQLString },
        aminus: { type: GraphQLString },
        bplus: { type: GraphQLString },
        b: { type: GraphQLString },
        bminus: { type: GraphQLString },
        cplus: { type: GraphQLString },
        c: { type: GraphQLString },
        cminus: { type: GraphQLString },
        dplus: { type: GraphQLString },
        d: { type: GraphQLString },
        dminus: { type: GraphQLString },
        f: { type: GraphQLString },
        quarter: { type: GraphQLString },
        id: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // query for course by id (such as ECS 32)
        course_id: {
            type: new graphql.GraphQLList(CourseType),
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // code to get data from db
                // return Detail.findById(args.id);
                console.log("hit", args.id);
                // return Detail.findOne({"course_id": args.id});
                return Detail.find({"course_id": args.id});
            }
        },
        // query for course by id (mongodb id, not course id)
        course: {
            type: CourseType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args){
                return Detail.findById(args.id);
            }
        },
        // query for all courses
        courses: {
            type: new graphql.GraphQLList(CourseType),
            resolve(parent, args){
                return Detail.find({"course_id": 'ECS32'});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})