const mongoose = require('mongoose');
const shortId = require('shortid');

// full url, short url and the number of times we have clicked
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate // automates our short function using generate method
  },
  clicks: {
    type: Number,
    required: true,
    default: 0 // no clicks made 
  } 
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema);