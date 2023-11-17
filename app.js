var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose')
//sets routes
const indexRouter = require('./routes/index'); 
const book = require('./models/book');

//Connects to database
const url = 'mongodb://localhost:27017/project';  
const connect = mongoose.connect(url);
connect.then((books) => {
  console.log("Connected correctly to server from app.js");
}, (err) => { console.log(err); });

//sends form info to database from makeBooking.ejs page
indexRouter.post('/post-feedback', function (req, res) {
  connect.then(function() {
      book.insertMany(req.body);
  });    
  res.render("bookingConfirm");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;