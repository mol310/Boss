var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var addItem=require("./routes/addItem");
var addType=require("./routes/addType");
var addLevel=require("./routes/addLevel");
var addPeople=require("./routes/addPeople");
var user=require("./routes/user");
var checkPwd=require("./routes/checkPwd");
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/additem",addItem);
app.use("/addtype",addType);
app.use("/addlevel",addLevel);
app.use("/addpeople",addPeople);
app.use("/user",checkPwd,user);
app.use("/public",express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
