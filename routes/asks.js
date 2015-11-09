'use strict';

var express = require('express');
var Ask = require('../model/ask');

var router = express.Router();

router.all(function (req, res, next) {
    next();
});

router.param('id', function (req, res, next, id) {
    next();
});

router.get('/ask', function (req, res) {
    res.json("hello");
});

router.get('/ask/:id', function (req, res) {
    res.json("hello " + req.params.id);
});

module.exports = router;
