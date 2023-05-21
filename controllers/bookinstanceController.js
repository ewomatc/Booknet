const BookInstance = require('../models/bookinstance.js')
const asyncHandler = require('express-async-handler')

//display a list of all book instances
exports.bookinstance_list = asyncHandler( async(req, res, next) => {
  const allBookInstanceList = await BookInstance.find().populate('book').exec()

  res.render('bookinstance_list', {title: 'List all Book Instances', bookinstance_list: allBookInstanceList})
})

//display detail page for a single book instance
exports.bookinstance_detail = asyncHandler( async(req, res, next) => {
  res.send(`NOT SET: Bookinstance detail: ${req.params.id}`)
})

// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
});

// Handle BookInstance create on POST.
exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
});

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
});

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
});

// Display BookInstance update form on GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});

// Handle bookinstance update on POST.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});