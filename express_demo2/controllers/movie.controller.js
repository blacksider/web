var Movie = require('../models/movie.js');

// get all movies
exports.list = function(req, res){
    Movie.find(function (err, movies) {
        if (err) {
            return res.send(err);
        }
        res.json(movies);
    })
};

// create new movie
exports.create = function(req, res){
    var movie = new Movie(req.body);

    movie.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.send({message: 'add a movie'});
    });
};

// update a movie
exports.update = function (req, res) {
    //Movie.findById(req.params.id, callback)
    Movie.findOne({_id: req.params.id}, function (err, movie) {
        if (err) {
            return res.send(err);
        }
        for (prop in req.body) {
            movie[prop] = req.body[prop];
        }

        movie.save(function (err) {
            if (err) {
                return res.send(err);
            }
            res.json({message: "update a movie"});
        });
    });
};

//delete a movie
exports.delete = function (req, res) {
    Movie.remove({_id: req.params.id}, function (err, movie) {
        if (err) {
            return res.send(err);
        }
        res.json({message: 'delete a movie'});
    });
};