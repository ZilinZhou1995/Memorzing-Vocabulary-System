var express = require('express'),
  controllers = require('../controllers/user.js');

var common = require('../controllers/common.js');

var userRouter = express.Router();

/* GET users listing. */
userRouter.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});

userRouter.route("/user/signin")
    .post(controllers.userSignin);

userRouter.route("/user/login")
    .post(controllers.userLogin);

userRouter.route("/user/get")
    .post(controllers.userGet);




module.exports = userRouter;
