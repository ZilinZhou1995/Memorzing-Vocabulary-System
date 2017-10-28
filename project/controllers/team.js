/**
 * Created by Jiahui on 4/11/17.
 */
var common = require('./common.js');
var assert = require('assert');
var mongoose = require( 'mongoose' );
var userAPI = require('./user.js');

//exports team model
require('../model/db.js');
Users = mongoose.model('Users');
Team = mongoose.model('Team');



//set env
var env = process.env.NODE_ENV || 'development';

exports.team_create = function (req, res) {
    if (!req) {
        console.log('no req!');
        throw new Error;
    } else {
        var user = req.body.user;
        var team = req.body.team;
        //  verify user is legal or not
        userAPI.userGetWithUsername(user.Username, res, function (user) {
            var user_id = user.id;
            Team.create({
                team_name : team.teamName,
                team_description: team.teamDescription,
                team_members: {$push: user_id}
            }, function(err, team) {
                if (err) {
                    res.send(common.get_return_data(false,'',-2,'database error'));
                    console.log(err);
                } else {
                    Users.findByIdAndUpdate(user_id, {
                        $push: {
                            "Team": {
                                teamId: team.id
                            }}
                    }, function (err, user) {
                        //Bug: how to update the user in the front end??
                        res.send(common.get_return_data(true, team));
                        console.log('team created: ' + team);
                    });
                }

            });
        })

    }
};






