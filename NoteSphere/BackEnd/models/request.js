const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    sender: String,
    status: String
});

module.exports = mongoose.model('Request', userSchema);