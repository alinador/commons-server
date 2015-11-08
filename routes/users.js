'use strict';

var express = require('express');
var router = express.Router();

router.param('user_id', function(req, res, next, id) {
    next();
});

router.route('/users')
    .all(function(req, res, next) {
        next();
    })
    .get(function(req, res, next) {
        res.json("hello");
    });

module.exports = router;
