var express = require('express');

var indexRouter = express.Router();

var router = function() {
  var indexController = require('../controllers/indexController.js')();

  // List View Route
  indexRouter.route('/')
    .get(indexController.getIndex);

  return indexRouter;
};

module.exports = router;
