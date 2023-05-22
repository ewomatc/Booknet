const Author = require('../models/author.js')
const asyncHandler = require('express-async-handler')
const Book = require('../models/book.js')

//display a list of all authors
exports.author_list = asyncHandler( async(req, res, next) => {
  const allAuthors = await Author.find().sort({family_name: 1}).exec()

  res.render('author_list', {title: 'Author list', author_list: allAuthors})
})

//display details page of a specific author by id
exports.author_detail = asyncHandler( async(req, res, next) => {
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (author === null) {
    // No results.
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.render('author_detail', {title: "Author Detail", author: author, author_books: allBooksByAuthor });
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