var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var routes = require('./routes');
var http = require('http'),
    db = require('./model/db');


var app = express();



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
app.use('/static', express.static(__dirname + '/node_modules/'));


// app.use('/', index);
// app.use('/users', users);


var env = process.env.NODE_ENV || 'development';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('port', config.server.port);

//when env is development, set dir to the frontend app address
if (env == 'development') {
    console.log(config);
    app.use(express.static(config.frontEndAppDir));
}

//get router path
app
    .use(routes.userRouter)
    .use(routes.teamRouter)
    .use(routes.studySetsRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.use(function (req, res, next) {
    res.set('Content-Type', 'text/html');
    res.sendFile(config.frontEndAppDir + "index.html");
});


module.exports = app;


