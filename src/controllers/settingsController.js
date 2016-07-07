var mongodb = require('mongodb').MongoClient;
var config = require('../config/mongo.json');
var url = config.dbURL;
var Book = require('../models/bookModel');

var settingsController = function() {

  // Show Create Book View
  var getSettingsCreate = function(req, res) {
    Book.findOne({'creator': req.user.email}, function(err, book) {
      if (book) {
        res.redirect('/');
      } else {
        console.log(req.user);
        var book = new Book;

        book.creator = req.user.email;
        book.settings = {
          title: 'Commonplace'
        };
        book.quotes = [];

        book.save();
        res.redirect('/settings/edit');
      }
    });
  };

  // Show Current Settings
  var getIndex = function(req, res) {
    if (req.user) {
      Book.findOne({'creator': req.user.email}, function(err, book) {
        if (book) {
          res.render('settingsView', {
            book: book,
            user: req.user
          });
        } else {
          res.send('Not logged in');
        }
      });
    } else {
      res.render('index', {
        user: null,
        book: null,
        message: 'Please log in or sign up.'
      });
    }
  };

  // Show Settings Edit Form
  var getSettingsEdit = function(req, res) {
    if (req.user) {
      Book.findOne({'creator': req.user.email}, function(err, book) {
        if (book) {
          res.render('settingsUpdateView', {
            book: book,
            user: req.user
          });
        } else {
          res.send('Not logged in');
        }
      });
    } else {
      res.render('index', {
        user: null,
        book: null,
        message: 'Please log in or sign up.'
      });
    }
  };

  // Send Settings Edit Form Data to DB
  var postSettingsUpdate = function(req, res) {
    Book.findOneAndUpdate(
      {'creator': req.user.email},
      {
        'settings.title': req.body.bookTitle
      },
      function(err, results) {
        res.redirect('/');
      }
    );
  };

  return {
    getSettingsCreate: getSettingsCreate,
    getIndex: getIndex,
    getSettingsEdit: getSettingsEdit,
    postSettingsUpdate: postSettingsUpdate
  };
};

module.exports = settingsController;
