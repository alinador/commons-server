'use strict';

var logger = require('log4js').getLogger('database');
var mongoose = require('mongoose');

var database = {
    connect: connect
};

module.exports = database;

function connect() {
    logger.info('Connecting to database.');

    mongoose.connection.on('error', function (callback) {
        logger.error('Connecting to database failed.');
    });

    mongoose.connection.once('open', function (callback) {
        logger.info('Connecting to database success.');
    });

    mongoose.connect('mongodb://localhost/commons');
}
