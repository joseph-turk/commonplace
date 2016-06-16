var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var Book = require('../models/bookModel');
var Quote = require('../models/quoteModel');

var quoteController = function() {

  // Get All Quotes for List View
  var getIndex = function(req, res) {
    if (req.user) {
      Book.findOne({'creator': req.user.email}, function(err, book) {
        res.render('quoteListView', {
          quotes: book.quotes,
          user: req.user
        });
      });
    } else {
      res.render('index', {
        user: null,
        book: {
          settings: {
            title: "Welcome to Commonplace"
          }
        },
        quote: null,
        message: "Please log in or sign up."
      });
    }
  };

  // Get Single Quote by ID
  var getById = function(req, res) {
    var id = new ObjectID(req.params.id);

    Book.findOne({'creator': req.user.email}, function(err, book) {
      res.render('quoteView', {
        quote: book.quotes.id(id),
        user: req.user
      })
    });
  };

  // Edit Single Quote by ID
  var editById = function(req, res) {
    var id = new ObjectID(req.params.id);

    Book.findOne({'creator': req.user.email}, function(err, book) {
      res.render('quoteEditView', {
        quote: book.quotes.id(id),
        user: req.user,
        quoteid: id
      });
    });
  };

  // Show Quote Add Form
  var getQuoteAdd = function(req, res) {
    if (req.user) {
      res.render('quoteAddView', {
        user: req.user
      });
    } else {
      res.render('index', {
        user: null,
        book: {
          settings: {
            title: "Welcome to Commonplace"
          }
        },
        quote: null,
        message: "Please log in or sign up."
      });
    }
  };

  // Send Quote Add Form Data to DB
  var postQuoteAdd = function(req, res) {
    Book.findOne({'creator': req.user.email}, function(err, book) {
      if (book) {
        book.quotes.push({
          title: req.body.quoteTitle,
          body: req.body.quoteBody,
          author: req.body.quoteAuthor,
          source: req.body.quoteSource,
          sourceauthor: req.body.quoteSourceAuthor,
          iscover: req.body.quoteMakeCover
        });

        book.save();
        res.redirect('/quotes');
      } else {
        res.send('Not logged in');
      }
    });
  };

  // Update Quote
  var postQuoteUpdate = function(req, res) {
    var id = new ObjectID(req.body.quoteID);

    Book.findOneAndUpdate(
      {'creator': req.user.email, 'quotes._id': id},
      {
        'quotes.$.title': req.body.quoteTitle,
        'quotes.$.body': req.body.quoteBody,
        'quotes.$.author': req.body.quoteAuthor,
        'quotes.$.source': req.body.quoteSource,
        'quotes.$.sourceauthor': req.body.quoteSourceAuthor,
        'quotes.$.updatedAt': new Date()
      },
      function(err, results) {
        res.redirect('/quotes/' + id);
      }
    );
  };

  // Delete Quote
  var getQuoteDelete = function(req, res) {
    var id = new ObjectID(req.params.id);

    Book.findOne({'creator': req.user.email}, function(err, book) {
      if (book) {
        book.quotes.pull(id);

        book.save();
        res.redirect('/quotes');
      } else {
        res.send('Not logged in');
      }
    });
  }

  return {
    getIndex: getIndex,
    getById: getById,
    editById: editById,
    getQuoteAdd: getQuoteAdd,
    postQuoteAdd: postQuoteAdd,
    postQuoteUpdate: postQuoteUpdate,
    getQuoteDelete: getQuoteDelete
  };
};

module.exports = quoteController;
