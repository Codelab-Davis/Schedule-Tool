const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentThingies = new Schema({
    name: {type: String, required: true},
    course_id: {type: String, required: true},
    crn: {type: String, required: true},
    instructor: {type: String, required: true},
    ge_list: {type: Array, required: true},
    units: {type: String, required: true},
    seats: {type: Array, required: true},
    max_seats: {type: Number, required: true},
    description: {type: String, required: true},
    quarter: {type: String, required: true},},
    {
        timestamps: true,
        collection: "enrollment"
    }
);

const Entrollment = mongoose.model('enrollment', enrollmentThingies);
module.exports = Entrollment;