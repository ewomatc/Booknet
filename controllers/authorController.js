const Author = require('../models/author.js')
const asyncHandler = require('express-async-handler')

//display a list of all authors
exports.author_list = asyncHandler( async(req, res, next) => {
  res.send('NOT IMPLEMENTED: Author list')
})

//display details page of a specific author by id
exports.author_detail = asyncHandler( async(req, res, next) => {
  res.send(`NOT IMPLEMENTED: author detail ${req.params.id}`)
})

//display author create form on GET
exports.author_create_get = asyncHandler( async(req, res, next) => {
  res.send('NOT IMPLEMENTED: GET author create')
})

//handle author create on POST
exports.author_create_post = asyncHandler( async(req, res, next) => {
  res.send('NOT IMPLEMENTED: POST form for author create')
})

//display author delete form on GET
exports.author_delete_get = asyncHandler( async(req, res, next) => {
  res.send('NOT IMPLEMENTED: GET author delete')
})

//handle author delete on POST
exports.author_delete_post = asyncHandler( async(req, res, next) => {
  res.send('NOT IMPLEMENTED: POST form for author delete')
})

//display author update on GET
exports.author_update_get = asyncHandler( async(req, res, next) => {
  res.send('NOT IMPLEMENTED: GET author update')
})

//handle author update on POST
exports.author_update_post = asyncHandler( async(req, res, next) => {
  res.send('NOT IMPLEMENTED: POST form for author update')
})