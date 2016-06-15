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
        book: {
          settings: {
            title: "Welcome to Commonplace"
          }
        },
        quote: null
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
        book: {
          settings: {
            title: "Welcome to Commonplace"
          }
        },
        quote: null
      });
    }
  };

  // Send Settings Edit Form Data to DB
  var postSettingsUpdate = function(req, res) {
    var updateTitle = function(db, callback) {
        db.collection('books').updateOne(
          {
              'creator': req.user.email
          },
          {
              $set: { 'settings.title': req.body.bookTitle }
          }, function(err, results) {
              callback();
          }
        );
    };

    mongodb.connect(url, function(err, db) {
       updateTitle(db, function() {
           res.redirect('/');
           db.close();
       });
    });
  };

  return {
    getSettingsCreate: getSettingsCreate,
    getIndex: getIndex,
    getSettingsEdit: getSettingsEdit,
    postSettingsUpdate: postSettingsUpdate
  };
};

module.exports = settingsController;
