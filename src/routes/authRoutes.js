var express = require('express');
var passport = require('passport');
var Book = require('../models/bookModel');

var authRouter = express.Router();

var router = function() {
  authRouter.route('/google/callback')
    .get(passport.authenticate('google', {
      successRedirect: '/settings/create',
      failureRedirect: '/error/'
    }));

  authRouter.route('/google')
    .get(passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
    }));



  return authRouter;
};

module.exports = router;
