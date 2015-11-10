'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    createTime: Date,
    status: String,
    commons: String,
    content: String,
    isAnonymous: Boolean
});

schema.index({"user": 1}, {unique: false});
schema.index({"createTime": 1}, {unique: false});

module.exports = mongoose.model('Ask', schema);
