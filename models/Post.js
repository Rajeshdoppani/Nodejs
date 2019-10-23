const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    description: String,
    message: String,
});

module.exports = mongoose.model('Posts', PostSchema);