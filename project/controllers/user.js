/**
 * Created by Jiahui on 4/11/17.
 */
var common = require('./common.js');
var assert = require('assert');
var mongoose = require( 'mongoose' );
var recommendAPI = require('./recommend.js');

//exports team model
require('../model/db.js');
Users = mongoose.model('Users');

//set env
var env = process.env.NODE_ENV || 'development';

exports.userGet = function (req, res) {
    _userGet(req, res, function (users) {
        res.send(common.get_return_data(true, users[0]));
    })
};

exports.userGetWithUsername = function (username, res, callback) {
    _userGetWithUsername(username, res, callback);
};

function _userGet(req, res, callback) {
    var username = req.body.username;
    if (username) {
        _userGetWithUsername(username, res, function (user) {
            recommendAPI.sortRecommendation(user, function (user) {
                callback(user);
            });
        })
    } else {
        res.send(common.get_return_data(false,'',-1,'server error'));
    }
};

function _userGetWithUsername(username, res, callback) {
    Users.find({
        Username:username
    }, function (err, users) {
        if (err) {
            res.send(common.get_return_data(false,'',-2,'database error'));
        } else {
            if (users.length != 0) {
                callback(users);
            } else {
                res.send(common.get_return_data(false, '',-3, 'user not existed'));
            }
        }
    })
}


exports.userLogin = function (req, res) {
    var user = req.body;
    if (user) {
        Users.find({
            Username: user.username
        }, function (err, users) {
            if (err) {
                res.send(common.get_return_data(false,'',-2,'database error'));
            } else {
                if (users.length != 0) {
                    if ((users[0]).Password == user.password) {
                        res.send(common.get_return_data(true, users[0]));
                    } else {
                        res.send(common.get_return_data(false, '',-4, 'password not match'));
                    }
                } else {
                    res.send(common.get_return_data(false,'',-3,'do not have this user'));

                }
            }
        })
    } else {
        res.send(common.get_return_data(false,'',-1,'server error'));
    }
};



exports.userSignin = function (req, res) {
    var user = req.body;
    if (user) {
        Users.find({
            Username: user.username
        }, function (err, users) {
            if (err) {
                res.send(common.get_return_data(false,'',-2,'database error'));
            } else {
                if (users.length == 0) {
                    Users.create({
                        Username : user.username,
                        Password: user.password,
                        Email: user.email
                    }, function(err, users) {
                        if (err) {
                            res.send(common.get_return_data(false,'',-2,'database error'));
                            console.log(err);
                        } else {
                            res.send(common.get_return_data(true, users));
                            console.log('User created: ' + user);
                        }

                    });
                } else {
                    res.send(common.get_return_data(false,'',-3,'user name have already exist'));
                }
            }
        });

    } else {
        res.send(common.get_return_data(false,'',-1,'server error'));
    }
};
