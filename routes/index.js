var express = require('express');
var router = express.Router();

// Get home page
router.get('/', function(req, res, next) {
  res.render('index');
});
//Get booking page
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