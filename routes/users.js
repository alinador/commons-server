'use strict';

var _ = require('underscore');
var express = require('express');
var User = require('../model/User');
var Ask = require('../model/Ask');
var UserAsk = require('../model/UserAsk');

var router = express.Router();

router.all(function (req, res, next) {
    next();
});

router.all(function (req, res, next) {
    next();
});

router.get('/users', function (req, res, next) {

    var transform = function (users) {
        if (_.isNull(users)) {
            return [];
        }

        return _.map(users, function (user) {
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
                createTime: user.createTime,
                facebookId: user.facebookId
            };
        });
    };

    User.find()
        .exec(function (err, users) {
            if (err) {
                next(err);
                return;
            }

            res.json(transform(users));
        });
});

router.get('/users/:userid', function (req, res, next) {

    var transform = function (user) {
        if (_.isNull(user)) {
            return {};
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
            createTime: user.createTime,
            facebookId: user.facebookId
        };
    };

    User.findOne()
        .where({'_id': req.params.userid})
        .exec(function (err, user) {
            if (err) {
                next(err);
                return;
            }

            res.json(transform(user));
        });
});

router.post('/users/register', function (req, res, next) {

    var transform = function (user) {
        return {
            id: user._id
        };
    };

    User.findOne({'facebookId': req.body.facebookId}).exec(function (err, user) {
        if (err) {
            next(err);
            return;
        }

        if (_.isNull(user)) {
            user = new User();
        }

        user.createTime = Date.now();
        user.name = req.body.name;
        user.email = req.body.email;
        user.avatarUrl = req.body.avatarUrl;
        user.facebookId = req.body.facebookId;
        user.facebookAccessToken = req.body.facebookAccessToken;

        user.save(function (err) {
            if (err) {
                next(err);
                return;
            }

            res.json(transform(user));
        });
    });
});

router.get('/users/:userid/feed', function (req, res, next) {

    var transform = function (asks) {
        return _.map(asks, function (ask) {
            return {
                id: ask._id,
                owner: {
                    id: ask.user._id,
                    name: ask.user.name,
                    avatarUrl: ask.user.avatarUrl,
                    relationship: "other"
                },
                "recentReplies": [],
                "totalReplies": 0,
                "createTime": ask.createTime,
                "common": "friends",
                "content": ask.content,
                "isAnonymous": ask.isAnonymous
            };
        });
    };

    Ask.find()
        .where('user').ne(req.params.userid)
        .where('status').equals('active')
        .populate('user', 'name avatarUrl')
        .sort('-createTime')
        .exec(function (err, asks) {
            if (err) {
                next(err);
                return;
            }

            res.json(transform(asks));
        });
});

router.post('/users/:userid/asks', function (req, res, next) {

    var transform = function (ask) {
        return {
            id: ask._id
        };
    };

    var ask = new Ask();
    ask.user = req.params.userid;
    ask.createTime = Date.now();
    ask.status = 'active';
    ask.commons = 'friends';
    ask.content = req.body.content;
    ask.isAnonymous = req.body.isAnonymous;

    ask.save(function (err) {
        if (err) {
            next(err);
            return;
        }

        res.json(transform(ask));
    });
});

router.get('/users/:userid/asks/:status', function (req, res, next) {

    if(!_.contains(['followed', 'skipped', 'archived'], req.params.status)) {
        next();
        return;
    }

    var transform = function (userAsks) {
        return _.map(userAsks, function (userAsk) {
            return {
                id: userAsk.ask._id,
                owner: {
                    id: userAsk.user._id,
                    name: userAsk.user.name,
                    avatarUrl: userAsk.user.avatarUrl,
                    relationship: "other"
                },
                "createTime": userAsk.ask.createTime,
                "common": "friends",
                "content": userAsk.ask.content,
                "isAnonymous": userAsk.ask.isAnonymous
            };
        });
    };

    UserAsk.find()
        .where('user').equals(req.params.userid)
        .where('status').equals(req.params.status)
        .populate('user', 'name avatarUrl')
        .populate('ask', 'createTime content isAnonymous')
        .exec(function (err, userAsks) {
            if (err) {
                next(err);
                return;
            }

            res.json(transform(userAsks));
        });
});

router.post('/users/:userid/SkippedAsks', function (req, res, next) {
    var userAsk = new UserAsk();
    userAsk.user = req.params.userid;
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
