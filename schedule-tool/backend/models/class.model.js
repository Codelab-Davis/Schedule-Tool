const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classSchema = new Schema({
  class_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3 //not sure what we should declare min length
  },
}, {
  timestamps: true,
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
