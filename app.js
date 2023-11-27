var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//mongoose
const mongoose = require('mongoose')

//routes
const indexRouter = require('./routes/index'); 
const book = require('./models/book');
const { type } = require('os');

//Connects to database
const url = 'mongodb://localhost:27017/project';  
const connect = mongoose.connect(url);
connect.then((books) => {
  console.log("Connected correctly to server from app.js");
    }, (err) => { console.log(err); });

///------------------------------ROUTES---------------------------------------------------------
//sends form info to database from makeBooking.ejs page, renders confirmation page
indexRouter.post('/post-feedback', function (req, res) {
  connect.then(function() {
    const dataSent = req.body;
      console.log("Data in body =>", dataSent);
        book.insertMany(req.body);
          res.render("bookingConfirm", {dataSent: req.body});});    
});
//goes to edit page
indexRouter.post('/edit', async (req, res) => {
  console.log("Workshop ID = >", req.body.selectedID);
    const selectedBooking = await book.findById(req.body.selectedID);
      console.log("Selected database =>",selectedBooking);
        res.render('edit', {data: {booking :selectedBooking}});
});

//updates booking
indexRouter.post('/update', async (req, res) =>{
  console.log("Selected ID to update =>", req.body.selectedIDUpdate);
    console.log("Data to update =>", req.body)
      const dataUpdate = req.body;
        await book.findByIdAndUpdate(req.body.selectedIDUpdate, dataUpdate);
          res.render('editConfirm');
});

//deletes workshop booking
indexRouter.post('/delete', async (req, res) =>{
  console.log("Selected ID to delete =>", req.body.selectedIDDelete);
    await book.findByIdAndDelete(req.body.selectedIDDelete);
      res.render('editConfirm');
});
//searches database and generates report
indexRouter.post('/search', async (req, res) =>{
  console.log("Form =>",req.body);
    const results = await book.find({
      $and: [
        {workshopDate: {$gte: new Date(req.body.startDateSearch)}}, //between date range
        {workshopDate: {$lte: new Date(req.body.endDateSearch)}},
        {$text: {$search : (req.body.fullNameSearch)}}          //name
      ]
    })
      console.log(results);
      res.render('reports', {data: results, name: req.body.fullNameSearch});
});

//-----------------------------------------------------------------------------------------------
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