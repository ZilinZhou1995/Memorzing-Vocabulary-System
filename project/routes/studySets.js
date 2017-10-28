/**
 * Created by Jiahui on 4/22/17.
 */
var express = require('express'),
    controllers = require('../controllers/studySets.js');

var common = require('../controllers/common.js');

var studySetsRouter = express.Router();

studySetsRouter.route("/studysets/create")
    .post(controllers.studySets_create);

studySetsRouter.route("/studysets/delete")
    .post(controllers.studySets_delete);


module.exports = studySetsRouter;
