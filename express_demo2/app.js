var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorhandler = require('errorhandler');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var movies = require('./routes/movies');
var app = express();

// connect to mongodb
var dbName = 'movie';
var url = 'mongodb://localhost:27017/' + dbName;
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
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// html router
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
// rewrite to load static resources
app.use(express.static(path.join(__dirname, 'public')));

// url router
app.use('/api', movies);

// static views
app.all('/*', function (req, res) {
    res.sendfile('index.html', {root: path.join(__dirname, 'public')});
});

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

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
