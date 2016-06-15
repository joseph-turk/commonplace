var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuoteSchema = require('./quoteModel');

var BookSchema = new Schema({
  creator: {
    type: String
  },
  settings: {
    type: Object
  },
  quotes: {
    type: [QuoteSchema]
  }
});

module.exports = mongoose.model('Book', BookSchema);
