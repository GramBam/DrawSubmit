const mongoose = require('mongoose')

const entrySchema = mongoose.Schema({
  dataURL: {
    type: String,
  },
  title: {
    type: String,
  },
}, { timestamps: true })

module.exports = mongoose.model('Entry', entrySchema)