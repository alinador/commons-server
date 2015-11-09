'use strict';

var express = require('express');
var Ask = require('../model/ask');

var router = express.Router();

router.all(function (req, res, next) {
    next();
});

router.param('_id', function (req, res, next, id) {
    next();
});

router.get('/asks', function (req, res, next) {
    Ask.find().exec(function (err, ask) {
        if (err) {
            next(err);
            return;
        }

        res.json(ask);
    });
});

router.get('/asks/:_id', function (req, res, next) {
    Ask.findOne({'_id': req.params._id}).exec(function (err, ask) {
        if (err) {
            next(err);
            return;
        }

        res.json(ask);
    });
});

module.exports = router;
