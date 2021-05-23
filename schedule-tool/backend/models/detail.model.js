// contains all information about courses

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detailSchema = new Schema({ //components of a class/what are defined within a certain class
  name: { type: String, required: true },
  course_id: { type: String, required: true },
  instructor: { type: String, required: true },
  ge: { type: String, required: true },
  aplus: { type: Number, required: true },
  a: { type: Number, required: true },
  aminus: { type: Number, required: true },
  bplus: { type: Number, required: true },
  b: { type: Number, required: true },
  bminus: { type: Number, required: true },
  cplus: { type: Number, required: true },
  c: { type: Number, required: true },
  cminus: { type: Number, required: true },
  dplus: { type: Number, required: true },
  d: { type: Number, required: true },
  dminus: { type: Number, required: true },
  f: { type: Number, required: true },
  I: { type: Number, required: true },//incomplete
  P: { type: Number, required: true }, //pass
  NP: { type: Number, required: true },//no pass
  Y: { type: Number, required: true },//pending judicial action
  quarter: { type: String, required: true },
  enrollment: { type: Array, required: true},
}, {
  timestamps: true,
  collection: "details",
});

const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;