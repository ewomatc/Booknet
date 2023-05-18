const mongoose = require('mongoose')

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 100
  }
})

//virtual for genre url
GenreSchema.virtual('url').get(function() {
  return `/catalog/genre/${this._id}`
})


module.exports = mongoose.model('Genre', GenreSchema)