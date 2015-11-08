'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:  String,
    email: String,
    createDate: Date,
    facebookId: String,
    facebookAccessToken: String
});

userSchema.index({ "email": 1}, {unique:true});
module.exports = mongoose.model('user', userSchema);
