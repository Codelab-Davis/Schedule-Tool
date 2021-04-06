// unnecessary component
// here for reference, only refers to the course ids of the database

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  course_id: { // information about course id schema
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3 //not sure what we should declare min length
  },
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
