'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    email: String,
    avatarUrl: String,
    createDate: Date,
    facebookId: String,
    facebookAccessToken: String
});

schema.index({"email": 1}, {unique: true});
schema.index({"facebookId": 1}, {unique: true});

module.exports = mongoose.model('User', schema);
