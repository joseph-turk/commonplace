var express = require('express');
var quoteRouter = express.Router();

var router = function() {
  var quoteController = require('../controllers/quoteController.js')();

  // List View Route
  quoteRouter.route('/')
    .get(quoteController.getIndex);

  // Quote Add View Route
  quoteRouter.route('/new')
    .get(quoteController.getQuoteAdd);

  // Post Data to New Quote
  quoteRouter.route('/add')
    .post(quoteController.postQuoteAdd);

  // Post Data to Update Quote
  quoteRouter.route('/update')
    .post(quoteController.postQuoteUpdate);

  // Single Quote View Route
  quoteRouter.route('/:id')
    .get(quoteController.getById);
  
  return quoteRouter;
};

module.exports = router;
