'use strict';

var express = require('express');
var User = require('../model/user');
var Ask = require('../model/ask');

var router = express.Router();

router.all(function (req, res, next) {
    next();
});

router.param('id', function (req, res, next, id) {
    next();
});

router.post('/users/register', function (req, res, next) {
    User.findOne({'facebookId': req.body.facebookId}).exec(function (err, user) {
        if (err) {
            next(err);
            return;
        }

        if (user === null) {
            user = new User();
            user.name = req.body.name;
            user.email = null;
            user.createDate = Date.now();
            user.facebookId = req.body.facebookId;
            user.facebookAccessToken = req.body.facebookAccessToken;

            user.save(function (err) {
                if (err) {
                    next(err);
                }
            });
        }

        res.json(user);
    });
});

router.get('/users', function (req, res, next) {
    User.find().exec(function (err, users) {
        if (err) {
            next(err);
            return;
        }

        res.json(users);
    });
});

router.get('/users/:id', function (req, res, next) {
    User.findOne({'_id': req.params.id}).exec(function (err, user) {
        if (err) {
            next(err);
            return;
        }

        res.json(user);
    });
});

router.get('/users/:id/feed', function (req, res, next) {
    Ask.find({}).exec(function (err, asks) {
        if (err) {
            next(err);
            return;
        }

        res.json(asks);
    });
});

router.get('/users/:id/asks', function (req, res, next) {
    Ask.find({'userId': req.params.id}).exec(function (err, asks) {
        if (err) {
            next(err);
            return;
        }

        res.json(asks);
    });
});

router.post('/users/:id/asks', function (req, res, next) {
    var ask = new Ask();
    ask.userId = req.params.id;
    ask.createDate = Date.now();
    ask.status = req.body.status;
    ask.content = req.body.content;
    ask.isAnonymous = req.body.isAnonymous;

    ask.save(function (err) {
        if (err) {
            next(err);
        }
    });

    res.json(ask);
});

module.exports = router;
