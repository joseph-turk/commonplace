var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  author: {
    type: String
  },
  source: {
    type: String
  },
  sourceauthor: {
    type: String
  }
},
{
  timestamps: true
});

module.exports = QuoteSchema;
