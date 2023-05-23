const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");
const Book = require('../models/book')
const {body, validationResult} = require('express-validator')

// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenre = await Genre.find().sort({name: 1}).exec()

  res.render('genre_list', ({title: 'Genre List', genre_list: allGenre}))
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([ Genre.findById(req.params.id).exec(), Book.find({genre: req.params.id}, 'title summary').exec() ])

  //check if genre exists
  if(genre === null) {
    const err = new Error('Genre not found')
    err.status = 404;
    return next(err)
  }

  res.render('genre_detail', {title: 'Genre Detail', genre: genre, genre_books: booksInGenre})
});

// Display Genre create form on GET.
//n.b - The async handler is not needed here because the route does not contain any code that might throw an exception.
exports.genre_create_get =  (req, res, next) => {
  res.render('genre_form', {title: 'Create a new Genre'})
};

// Handle Genre create on POST.
exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre create POST");
});

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
