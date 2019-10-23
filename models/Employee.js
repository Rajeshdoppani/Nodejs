const mongoose = require('mongoose');

const EmpSchema = mongoose.Schema({
    name: String,
    age: Number,
    designation: String
});

module.exports = mongoose.model('Employee', EmpSchema);