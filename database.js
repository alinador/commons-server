'use strict';

var logger = require('log4js').getLogger('db');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commons');

var connection = mongoose.connection;
connection.on('error', function (callback) {
    logger.error('Connection to database failed.');
});

connection.once('open', function (callback) {
    logger.info('Connection to database success.');
});
