/**
 * Created by Jiahui on 4/22/17.
 */
var express = require('express'),
    controllers = require('../controllers/team.js');

var common = require('../controllers/common.js');

var teamRouter = express.Router();

teamRouter.route("/team/create")
    .post(controllers.team_create);

module.exports = teamRouter;
