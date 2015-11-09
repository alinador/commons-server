'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    createDate: Date,
    status: String,
    content: String,
    isAnonymous: Boolean
});

schema.index({"userId": 1}, {unique: false});
schema.index({"createDate": 1}, {unique: false});

module.exports = mongoose.model('Ask', schema);
