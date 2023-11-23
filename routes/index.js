var express = require('express');
const book = require('../models/book');
var router = express.Router();

// Get home page that displays bookings, use async
router.get('/', async (req, res) => {
  const bookings = await book.find()
  res.render('index', {data:bookings})
});
//Get make a booking page
router.get('/book', function(req,res,next){
  res.render('makeBooking');
});
// Get help page
router.get('/help', function(req, res, next) {
  res.render('help');
});
// Get about page
router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;