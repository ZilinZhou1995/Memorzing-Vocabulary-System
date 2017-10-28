/**
 * Created by Jiahui on 4/22/17.
 */
var common = require('./common.js');
var assert = require('assert');
var mongoose = require( 'mongoose' );
var userAPI = require('./user.js');
var _ = require('lodash');


require('../model/db.js');
Users = mongoose.model('Users');

//set env
var env = process.env.NODE_ENV || 'development';

exports.sortRecommendation = function (user, callback) {
    var user_StudySets = user.StudySets;
    user_StudySets = _.sortBy(user_StudySets, ['reviewCount', 'reviewDate']);
    user.StudySets = user_StudySets;
    callback(user);
};