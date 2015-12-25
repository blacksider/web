var movie = require('../controllers/movie.controller.js');
var express = require('express');
var router = express.Router();

router.route('/movie/all').get(movie.list);
router.route('/movie/').post(movie.create);
router.route('/movie/:id').put(movie.update);
router.route('/movie/:id').delete(movie.delete);

module.exports = router;