/**
 * Created by Jiahui on 4/22/17.
 */
var mongoose = require( 'mongoose' );

var teamSchema = new mongoose.Schema({
    team_name: String,
    team_members: Object,
    team_description: String
});

var Team = exports.module = mongoose.model('Team', teamSchema);