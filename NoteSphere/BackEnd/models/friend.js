const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    username : String,
    friend : String
});

module.exports = mongoose.model('Friend', noteSchema);
