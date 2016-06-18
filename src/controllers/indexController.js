var Book = require('../models/bookModel');

var indexController = function() {

  var getIndex = function(req, res) {
    if (req.user) {
      Book.findOne({'creator': req.user.email}, function(err, book) {
        if (book) {
          res.render('index', {
            book: book,
            user: req.user,
            message: null
          });
        } else {
          res.send('Not logged in');
        }
      });
    } else {
      res.render('index', {
        user: null,
        book: null,
        message: null
      });
    }
  };

  return {
    getIndex: getIndex
  };
};

module.exports = indexController;
