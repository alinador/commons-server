'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    askId: { type: Schema.Types.ObjectId, ref: 'Ask' },
    openDate: Date
});

schema.index({"userId": 1, "askId": 1}, {unique: true});

module.exports = mongoose.model('OpenAsk', schema);
