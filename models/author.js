const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
})

//virtual for author's full name
AuthorSchema.virtual('name').get(function () {
  let fullname = ''

  //check if the names fields have a value
  if (this.first_name && this.family_name) {
    fullname = `${this.first_name}, ${this.family_name}`
  }
  if(!this.first_name || !this.family_name) {
    fullname = ''
  }
  return fullname
})

//virtual for author's url
AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`
})


module.exports = mongoose.model('Author', AuthorSchema)