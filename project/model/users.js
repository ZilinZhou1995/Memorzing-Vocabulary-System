/**
 * Created by Jiahui on 4/16/17.
 */
var mongoose = require( 'mongoose' );

var usersSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Email: String,
    StudySets: [
        {
            title: {type: String, required: true},
            study_sets : Object,
            reviewTime: Date,
            reviewCount: String
        }],
    team: [
        {
            teamId: String
        }
    ]
});

var Users = exports.module = mongoose.model('Users', usersSchema);