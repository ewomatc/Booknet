const BookInstance = require('../models/bookinstance.js')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const Book = require('../models/book.js')

//display a list of all book instances
exports.bookinstance_list = asyncHandler( async(req, res, next) => {
  const allBookInstanceList = await BookInstance.find().populate('book').exec()

  res.render('bookinstance_list', {title: 'List all Book Instances', bookinstance_list: allBookInstanceList})
})

//display detail page for a single book instance
exports.bookinstance_detail = asyncHandler( async(req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookInstance === null) {
    // No results.
    const err = new Error("Book copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("bookinstance_detail", {
    title: "Book:",
    bookinstance: bookInstance,
  });
})

// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, 'title').exec()

  res.render('bookinstance_form', { title: 'Book List', book_list: allBooks })
});

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  body('book', 'book must be specified').trim().isLength({ min: 3 }).escape(),
  body('imprint', 'imprint must be specified').trim().isLength({min: 3}).escape(),
  body('status').escape(),
  body('due_back').optional({values: 'falsy'}).isISO8601().toDate(),

  //process request after validation
  asyncHandler(async (req, res, next) => {
    //extract validation errors
    const errors = validationResult(req)

    //create the bookinstance object with sanitized data
    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    })
    //check if there are errors or not and do the needful for each case
    if(!errors.isEmpty()) {
      res.render('bookinstance_form', {title: "Create BookInstance",
      book_list: allBooks,
      selected_book: bookInstance.book._id,
      errors: errors.array(),
      bookinstance: bookInstance,})
    }
    else {
      await bookInstance.save();
      res.redirect(bookInstance.url);
    }

  })
]


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