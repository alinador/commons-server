'use strict';

var express = require('express');
var mongoose = require('mongoose');
var User = require('../model/user');

var router = express.Router();

router.all(function (req, res, next) {
    next();
});

router.param('id', function (req, res, next, id) {
    next();
});

router.get('/user', function (req, res) {
    res.json("hello");
});

router.get('/user/:id', function (req, res) {
    res.json("hello " + req.params.id);
});

router.post('/user/register', function (req, res, next) {
    User.findOne({'facebookId': req.body.facebookId}).exec(function (err, user) {
        if (err) {
            next(err)

        } else if (user == null) {
            user = new User();
            user.name = req.body.name;
            user.email = null;
            user.createDate = Date.now();
            user.facebookId = req.body.facebookId;
            user.facebookAccessToken = req.body.facebookAccessToken;

            user.save(function (err) {
                if (err) {
                    next(err)
                }
            });
        }

        res.json(user);
    });
});

module.exports = router;
