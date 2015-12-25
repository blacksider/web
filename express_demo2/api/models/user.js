var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define an db object
var userSchema = new Schema({
    username: String,
    password: String
});

// bind module for accessing outside
module.exports = mongoose.model('User', userSchema);