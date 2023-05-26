const Book = require("../models/book");
const Author = require('../models/author')
const BookInstance = require('../models/bookinstance')
const Genre = require('../models/genre')
const asyncHandler = require("express-async-handler");
const {body, validationResult} = require('express-validator')


//will display the site home page
exports.index = asyncHandler(async (req, res, next) => {
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({status: 'Available'}).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ])

  res.render('index', {
    title: 'Booknet Home',
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    author_count: numAuthors,
    genre_count: numGenres,
  })
});

// Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, 'author title').sort({'title': 1}).populate('author').exec()

  res.render('book_list', {title: 'All Books', book_list: allBooks})
});

// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    BookInstance.find({ book: req.params.id }).exec(),
  ]);

  if (book === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }

  res.render("book_detail", {
    title: book.title,
    book: book,
    book_instances: bookInstances,
  });
});

// Display book create form on GET.
//we want the user to be able to select an existing author and genre when creating a new book, so we have to render all authors and genres
exports.book_create_get = asyncHandler(async (req, res, next) => {
  //the promise.all() method is used to await on several processes in parallel
  const [ allAuthors, allGenres ] = await Promise.all([
    Author.find().exec(),
    Genre.find().exec()
  ])

  //render the form as well as all the authors and genres
  res.render('book_form', { title: 'Create new Book', authors: allAuthors, genres: allGenres })
});

// Handle book create on POST.
exports.book_create_post = [
  //first step, get the genrre from a request and convert it to an array
  (req, res, next) => {
    //this line is what checks if the genre is an array
    if (!Array.isArray(req.body.genre)) {
      //this part checks for the type of the genre object, if its undefined, we return an empty array, if not, we wrap the returned genre object in an array
      req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre]
    }
    next()
  },
  //now we can write the form fields validators
  body('title', 'Title cannot be empty').trim().isLength({ min: 3 }).escape(),
  body('author', 'select an author').trim().isLength({ min: 3 }).escape(),
  body('summary', 'summary cannot be empty').trim().isLength({ min: 5 }).escape(),
  body('isbn', 'ISBN cannot be empty').trim().isLength({min: 3}).escape(),
  //we use the wildcard (*) to select all genre items in genre array
  body('genre.*').escape(),

  //now we can process the request
  asyncHandler(async (req, res, next) => {
    //extract validation errors from request
    const errors = validationResult(req)

    //create the book object with alrerady sanitized data
    const book = new Book({
      title: req.body.title,
      author: req.body.title,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    })

    //check if there are errors and re-render the form with error messages, else, save the created book
    if (!errors.isEmpty()) {
      //we have to re-render the form, so we need to fetch all genres and authors from the database
      const [ allAuthors, allGenres ] = await Promise.all([
        Author.find().exec(),
        Genre.find().exec()
      ])

      //marked the selected genre (by it's id) as checked
      for (const genre of allGenres) {
        if (book.genre.includes(genre._id)) {
          genre.checked = 'true'
        }
      }

      res.render('book_form', { title: 'Create new book', author: allAuthors, genre: allGenres, book: book, errors: errors.array() })
    }
    else {
      await book.save()

      res.redirect(book.url)
    }
  })

]

// Display book delete form on GET.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});
