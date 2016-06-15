var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var config = require('../config/mongo.json');
var url = config.dbURL;
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
        user: req.user
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
    var id = new ObjectID(req.params.id);
    console.log(id);
    //console.log(req.body);


    Book.findOneAndUpdate(
      {'creator': req.user.email, 'quotes._id': id},
      {
        'quotes.$.title': req.body.quoteTitle
      }
    );




    // res.redirect('/quotes');

    // mongodb.connect(url, function(err, db) {
    //   var collection = db.collection('quotes');
    //
    //   var quote = collection.find({_id: id});
    //
    //   console.log(quote);
    //   res.redirect('/quotes');
    //   var quote = {
    //     _id: id,
    //     title: req.body.quoteTitle,
    //     body: req.body.quoteBody,
    //     author: req.body.quoteAuthor,
    //     source: req.body.quoteSource,
    //     sourceauthor: req.body.quoteSourceAuthor,
    //     isCover: req.body.quoteMakeCover
    //   };
    //
    //   // Clear Cover Quote Setting if Present in New Quote
    //   if (req.body.quoteMakeCover) {
    //     collection.update({}, { $set: { isCover: null } }, { multi: true });
    //   }
    //
    //   collection.update({ _id: id }, { $set: {
    //     title: req.body.quoteTitle,
    //     body: req.body.quoteBody,
    //     author: req.body.quoteAuthor,
    //     source: req.body.quoteSource,
    //     sourceauthor: req.body.quoteSourceAuthor,
    //     isCover: req.body.quoteMakeCover
    //   } }, { upsert: true, multi: false });
    //
    //   res.redirect('/quotes');
    //   db.close();
    // });
  };

  return {
    getIndex: getIndex,
    getById: getById,
    editById: editById,
    getQuoteAdd: getQuoteAdd,
    postQuoteAdd: postQuoteAdd,
    postQuoteUpdate: postQuoteUpdate
  };
};

module.exports = quoteController;
