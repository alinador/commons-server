'use strict';

var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./database');
var users = require('./routes/users');
var asks = require('./routes/asks');

database.connect();

var app = express();
app.use(morgan(developmentFormatLine));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/v1.0', users);
app.use('/api/v1.0', asks);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

function developmentFormatLine(tokens, req, res) {
    var status = res._header ? res.statusCode : undefined;

    // get status color
    var color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
        : status >= 300 ? 36 // cyan
        : status >= 200 ? 32 // green
        : 0; // no color

    // get colored function
    var fn = developmentFormatLine[color];

    if (!fn) {
        fn = developmentFormatLine[color] = morgan.compile(
            '\x1b[0m[:date[iso]] :method :url \x1b[' +
            color +
            'm:status \x1b[0m:response-time ms - :res[content-length]\x1b[0m');
    }

    return fn(tokens, req, res);
}

module.exports = app;
