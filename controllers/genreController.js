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
exports.genre_create_post = [
  //this post request takes in an arry that first validates and sanitizes the data entered using the imported 'body' module from express-validator
  //.trim removes whitespaces from both ends, .isLength check to make sure it's not empty, and .escape removes html characters that may be potentially used for cross-site scripting
  body('name', 'Genre should contain at least three characters').trim().isLength({min: 3}).escape(),
  //process the request after validation
  asyncHandler( async (req, res, next) => {
    //extract the validation errors from the request 
    const errors = validationResult(req)

    //then the genre object can be created, p.s, only after validating the input like above
    //p.s - the 'name' is gotten from the form field 'name' called 'name' which we have validated above. 
    const genre = new Genre({ name: req.body.name })

    // now using the errors we extracted with validationResult() above, check if the errors is empty. If there are errors, re-render the form, (this time it should contain the previously inputed and validated data)
    //if there are no errors, proceed to save the newly added genre to the database.
    if (!errors.isEmpty()) {
      res.render('genre_form', { title: 'Create a new Genre', genre: genre, errors: errors.array() })
    }
    //now if the data from the form contains no errors, we have to check if there is an existing genre with the same name.
    //if there is, we simply redirect the user to that [existing] genre's details.
    //if the genre doesnt uet exist, we save it to the database and redirect to the genre detail of the newly created genre
    else {
      const genreExists = await Genre.findOne({name: req.body.name}).exec()

      if(genreExists) {
        //the url here is the the one we created as a virtual in the model definition
        res.redirect(genreExists.url)
      }
      else {
        await genre.save()

        res.redirect(genre.url)
      }
    }
  })
]

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
