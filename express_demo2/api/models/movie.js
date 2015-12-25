var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define an db object
var movieSchema = new Schema({
    title: String,
    releaseYear: String,
    director: String,
    genre: String
});

// bind module for accessing outside
module.exports = mongoose.model('Movie', movieSchema);