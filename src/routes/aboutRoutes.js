var express = require('express');

var aboutRouter = express.Router();

var router = function() {
  var aboutController = require('../controllers/aboutController.js')();

  aboutRouter.route('/')
    .get(aboutController.getIndex);

  return aboutRouter;
};

module.exports = router;
