const mongoose = require('mongoose');

const arModalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: true }  // Adjust this based on how you're handling files
});

const ARmodal = mongoose.model('ARmodal', arModalSchema);

module.exports = ARmodal;
