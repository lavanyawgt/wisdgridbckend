const mongoose = require('mongoose');

// Define the structure of the form data
const ContactSchema = new mongoose.Schema({
  title: String,
  firstname: String,
  lastname: String,
  compname: String,
  email: String,
  phone: String,
  city: String,
  selectdevcat: String,
  devlookingfor: String,
  country: String,
  state: String,
  sub: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model to use in other parts
module.exports = mongoose.model('Contact', ContactSchema);
