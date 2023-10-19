var express = require('express');
var router = express.Router();

const book = require('../models/book')



router.get('/', function(req, res, next) {
  res.render('booking');
});

module.exports = router;