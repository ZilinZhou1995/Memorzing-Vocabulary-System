/**
 * Created by Jiahui on 4/22/17.
 */
var common = require('./common.js');
var assert = require('assert');
var mongoose = require( 'mongoose' );
var userAPI = require('./user.js');
var recommendAPI = require('./recommend.js');


//exports team model
require('../model/db.js');
Users = mongoose.model('Users');

//set env
var env = process.env.NODE_ENV || 'development';

exports.studySets_create = function (req, res) {
    if (!req) {
        console.log("req not there");
        throw new Error;
    } else {
        var user = req.body.user;
        if (!user) {
            console.log('no user here');
            common.get_return_data(false,'', -1, 'no user, cannot create studySets');
        } else {

           Users.findOneAndUpdate({
               Username: user.Username
           }, {
               $push: {
                   "StudySets": {
                       title: req.body.study_sets.title,
                       study_sets: req.body.study_sets.study_sets,
                       reviewTime: new Date(),
                       reviewCount: '0'
                   }}
           }, {safe: true, upsert: true, new : true}, function (err, users) {
               if (err) {
                   console.log(err);
                   res.send(common.get_return_data(false, err, -5, 'database inside error'));
               } else {
                   if (users) {
                       recommendAPI.sortRecommendation(user, function (users) {
                           res.send(common.get_return_data(true, users));
                       });
                   } else {
                       res.send(common.get_return_data(false, '', -5, 'database error'));
                   }
               }
           })
        }
    }
};

exports.studySets_delete = function (req, res) {
    if (!req) {
        console.log("req not there");
        throw new Error;
    } else {
        var user = req.body.user;
        if (!user) {
            console.log('no user here');
            common.get_return_data(false,'', -1, 'no user, cannot create studySets');
        } else {
            Users.findOneAndUpdate({
                Username: user.Username
            }, {
                $pull: {
                    "StudySets": {
                        title: req.body.study_sets.title,
                        study_sets: req.body.study_sets.study_sets,
                        reviewTime: new Date(),
                        reviewCount: '0'
                    }}
            }, {safe: true, upsert: true, new : true}, function (err, users) {
                if (err) {
                    console.log(err);
                    res.send(common.get_return_data(false, err, -5, 'database inside error'));
                } else {
                    if (users) {
                        res.send(common.get_return_data(true, users));
                    } else {
                        res.send(common.get_return_data(false, '', -5, 'database error'));
                    }
                }
            })
        }
    }
};

exports.studySets_review = function (req, res) {
    if (!req) {
        console.log("req not there");
        throw new Error;
    } else {
        var user = req.body.user;
        if (!user) {
            console.log('no user here');
            common.get_return_data(false,'', -1, 'no user, cannot create studySets');
        } else {

            Users.findOneAndUpdate({
                Username: user.Username
            }, {
                $replace: {
                    "StudySets": {
                        title: req.body.study_sets.title,
                        study_sets: req.body.study_sets.study_sets,
                        reviewTime: new Date(),
                        reviewCount: count+1
                    }}
            }, {safe: true, upsert: true, new : true}, function (err, users) {
                if (err) {
                    console.log(err);
                    res.send(common.get_return_data(false, err, -5, 'database inside error'));
                } else {
                    if (users) {
                        recommendAPI.sortRecommendation(user, function (users) {
                            res.send(common.get_return_data(true, users));
                        });
                    } else {
                        res.send(common.get_return_data(false, '', -5, 'database error'));
                    }
                }
            })
        }
    }
};






