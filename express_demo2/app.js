var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorhandler = require('errorhandler');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var movieRoute = require('./api/routes/movie.route.js');
var userRoute = require('./api/routes/user.route.js');
var csurf = require('csurf');
var app = express();
var environment = process.env.NODE_ENV;

// connect to mongodb
var dbName = 'movie';
var url = 'mongodb://192.168.28.234:27017/' + dbName;
var mongoOptions = {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
};
mongoose.connect(url, mongoOptions);
mongoose.connection.on('error', function (err) {
    console.log('Mongodb Error:' + err);
}).on('open', function () {
    console.log('Mongodb connection opened');
});

app.use(session({
    secret: 'express_demo',
    key: 'user',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(csurf({
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS']
}));
app.use(function (req, res, next) {
    res.cookie('_csrf', req.csrfToken());
    next();
});

//var csrfNoGet = csurf({
//    ignoreMethods: ['GET', 'HEAD', 'OPTIONS']
//});
//var csrfWithGet = csurf({
//    ignoreMethods: ['HEAD', 'OPTIONS']
//});
//app.get('/api/movie/all', csrfNoGet, function(req, res, next) {
//    console.log("main page===============")
//    res.cookie('_csrf', req.csrfToken());
//    next()
//});
//
//app.all(/^(?!\/api\/movie\/all).*$/, csrfWithGet, function (req, res, next) {
//    console.log("other page===============")
//    res.cookie('_csrf', req.csrfToken());
//    next()
//});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// url router
app.use('/api', movieRoute);
app.use('/api', userRoute);

switch (environment) {
    case "build":
        console.log('** BUILD **');
        // html router
        app.set('views', path.join(__dirname, './build/src'));
        app.engine('html', require('ejs').__express);
        app.set('view engine', 'html');
        // rewrite to load static resources
        app.use(express.static(path.join(__dirname, './build/src')));
        // static views
        app.get('/*', function (req, res) {
            res.sendFile('index.html', {root: path.join(__dirname, './build/src')});
        });
        break;
    default:
        console.log('** DEV **');
        // html router
        app.set('views', path.join(__dirname, 'public'));
        app.engine('html', require('ejs').__express);
        app.set('view engine', 'html');
        // rewrite to load static resources
        app.use(express.static(path.join(__dirname, 'public')));
        app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

        // static views
        app.all('/*', function (req, res) {
            res.sendFile('index.html', {root: path.join(__dirname, './public')});
        });
        break;
}

// development only
if ('development' === app.get('env')) {
    app.use(errorhandler);
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN')
        return next(err);
    res.status(403);
    res.send('Invalid CSRF token')
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
