const mongoose = require('mongoose');

const popupContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNo: String,
  company: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PopupContact', popupContactSchema);
