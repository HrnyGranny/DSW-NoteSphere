const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    owner: String
});

module.exports = mongoose.model('Note', noteSchema);
