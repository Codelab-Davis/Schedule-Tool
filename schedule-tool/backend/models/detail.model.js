const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detailSchema = new Schema({
  name: { type: String, required: true },
  class_id: { type: String, required: true },
  instructor: { type: String, required: true },
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
  quarter: { type: String, required: true },
}, {
  timestamps: true,
});

const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;