var User = require('../models/user.js');

exports.login = function (req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) {
            return res.send(err);
        }
        if (!user) {
            return res.send({message: 'Login error'});
        }
        if (req.body.password != user.password) {
            return res.send({message: 'Login error'});
        }
        var rs = {
            'id': user._id,
            'username': user.username
        };
        req.session.user = rs;
        res.json({message: "Login success", user: rs});
    });
};

exports.create = function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return res.send(err);
        }
        var rs = {
            'id': user._id,
            'username': user.username
        };
        req.session.user = rs;
        res.send({message: 'Add new user', user: rs});
    });
};

exports.logout = function (req, res) {
    req.session.user = null;
    res.send({message: 'Logout user success'});
};