const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  message: { type: String },
  resumePath: { type: String }, // stores path/link of uploaded resume
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Career', careerSchema);
