const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    unique: true,
  },
  count: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



const UrlModel = mongoose.model('UrlModel', urlSchema);

module.exports = UrlModel;
