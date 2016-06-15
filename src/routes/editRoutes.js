var express = require('express');
var editRouter = express.Router();

var router = function() {
  var quoteController = require('../controllers/quoteController.js')();

  // Single Quote View Route
  editRouter.route('/:id')
    .get(quoteController.editById);

  return editRouter;
};

module.exports = router;
