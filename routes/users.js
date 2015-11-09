'use strict';

var express = require('express');
var User = require('../model/User');
var Ask = require('../model/Ask');
var UserAsk = require('../model/UserAsk');

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
                    return;
                }

                res.json(user);
            });

            return;
        }

        res.json(user);
    });
});

router.get('/users', function (req, res, next) {
    User.find()
        .exec(function (err, users) {
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
    Ask.find()
        .where('user').ne(req.params._id)
        .populate('user', 'name')
        .sort('-createDate')
        .exec(function (err, asks) {
            if (err) {
                next(err);
                return;
            }

            res.json(asks);
        });
});

router.get('/users/:_id/asks', function (req, res, next) {
    Ask.find()
        .where('user').equals(req.params._id)
        .sort('-createDate')
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
    ask.user = req.params._id;
    ask.createDate = Date.now();
    ask.status = 'active';
    ask.content = req.body.content;
    ask.isAnonymous = req.body.isAnonymous;

    ask.save(function (err) {
        if (err) {
            next(err);
            return;
        }

        res.json(ask);
    });
});

router.get('/users/:_id/OpenAsks', function (req, res, next) {
    UserAsk.find()
        .where('user').equals(req.params._id)
        .where('status').equals('open')
        .populate('user', 'name')
        .populate('ask', 'createDate status content')
        .exec(function (err, skippedAsks) {
            if (err) {
                next(err);
                return;
            }

            res.json(skippedAsks);
        });
});

router.post('/users/:_id/OpenAsks', function (req, res, next) {
    var userAsk = new UserAsk();
    userAsk.user = req.params._id;
    userAsk.ask = req.body.askId;
    userAsk.statusDate = Date.now();
    userAsk.status = 'open';

    userAsk.save(function (err) {
        if (err) {
            next(err);
            return;
        }

        res.json(userAsk);
    });
});

router.get('/users/:_id/SkippedAsks', function (req, res, next) {
    UserAsk.find()
        .where('user').equals(req.params._id)
        .where('status').equals('skipped')
        .populate('user', 'name')
        .populate('ask', 'createDate status content')
        .exec(function (err, skippedAsks) {
            if (err) {
                next(err);
                return;
            }

            res.json(skippedAsks);
        });
});

router.post('/users/:_id/SkippedAsks', function (req, res, next) {
    var userAsk = new UserAsk();
    userAsk.user = req.params._id;
    userAsk.ask = req.body.askId;
    userAsk.statusDate = Date.now();
    userAsk.status = 'skipped';

    userAsk.save(function (err) {
        if (err) {
            next(err);
            return;
        }

        res.json(userAsk);
    });
});

module.exports = router;
