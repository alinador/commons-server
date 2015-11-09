'use strict';

var express = require('express');
var User = require('../model/User');
var Ask = require('../model/Ask');
var SkippedAsk = require('../model/SkippedAsk');
var OpenAsk = require('../model/OpenAsk');

var router = express.Router();

router.all(function (req, res, next) {
    next();
});

router.param('_id', function (req, res, next, _id) {
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

router.get('/users/:_id', function (req, res, next) {
    User.findOne({'_id': req.params._id}).exec(function (err, user) {
        if (err) {
            next(err);
            return;
        }

        res.json(user);
    });
});

router.get('/users/:_id/feed', function (req, res, next) {
    Ask.find({})
        .populate('userId')
        .exec(function (err, asks) {
            if (err) {
                next(err);
                return;
            }

            res.json(asks);
        });
});

router.get('/users/:_id/asks', function (req, res, next) {
    Ask.find({'userId': req.params._id})
        .populate('userId')
        .exec(function (err, asks) {
            if (err) {
                next(err);
                return;
            }

            res.json(asks);
        });
});

router.post('/users/:_id/asks', function (req, res, next) {
    var ask = new Ask();
    ask.userId = req.params._id;
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

router.get('/users/:_id/SkippedAsks', function (req, res, next) {
    SkippedAsk.find({'userId': req.params._id})
        .populate('userId')
        .populate('askId')
        .exec(function (err, skippedAsks) {
            if (err) {
                next(err);
                return;
            }

            res.json(skippedAsks);
        });
});

router.post('/users/:_id/SkippedAsks', function (req, res, next) {
    var skippedAsk = new SkippedAsk();
    skippedAsk.userId = req.params._id;
    skippedAsk.askId = req.body.askId;
    skippedAsk.skippedDate = Date.now();

    skippedAsk.save(function (err) {
        if (err) {
            next(err);
        }
    });

    res.json(skippedAsk);
});

module.exports = router;
