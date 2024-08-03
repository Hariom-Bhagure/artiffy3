const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

const contactModel = mongoose.model('contacts', contactSchema);
module.exports = contactModel;
