'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    ask: {type: Schema.Types.ObjectId, ref: 'Ask'},
    statusDate: Date,
    status: String,
    muted: Boolean
});

schema.index({"user": 1, "ask": 1}, {unique: true});

module.exports = mongoose.model('UserAsk', schema);
