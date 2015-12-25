var user = require('../controllers/user.controller.js');
var express = require('express');
var router = express.Router();

router.route('/user/login').post(user.login);
router.route('/user/').post(user.create);
router.route('/user/logout').delete(user.logout);

module.exports = router;