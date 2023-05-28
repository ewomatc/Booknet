const Author = require('../models/author.js')
const asyncHandler = require('express-async-handler')
const Book = require('../models/book.js')
const { body, validationResult } = require('express-validator')
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
  res.render('author_form', { title: 'Create new Author' });
})

//handle author create on POST
exports.author_create_post = [
  body('first_name').trim().isLength({ min: 3}).escape().withMessage('First name must be specified').isAlphanumeric(),
  body('family_name').trim().isLength({ min: 3 }).escape().withMessage('Family name must be specified').isAlphanumeric(),
  //the date of birth and death use the .optional() method to indicate that empty dates can also be accepted
  body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
  body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

  //process the request asynchronously
  asyncHandler(async (req, res, next) => {
    //extract errors from request
    const errors = validationResult(req)

    //create author object with Author model
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    })

    //re-render the page if there are errors
    if (!errors.isEmpty()) {
      res.render('author_form', { title: 'Create new Author', author: author, errors: errors.array() })
    }
    else {
      //there are no errors, save the newly created author
      await author.save()
      res.redirect(author.url)
    }
  })
]
//display author delete form on GET
// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (author === null) {
    // No results.
    res.redirect("/catalog/authors");
  }

  res.render("author_delete", {
    title: "Delete Author",
    author: author,
    author_books: allBooksByAuthor,
  });
});

//handle author delete on POST
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of author and all their books (in parallel)
  const [author, allBooksByAuthor] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (allBooksByAuthor.length > 0) {
    // Author has books. Render in same way as for GET route.
    res.render("author_delete", {
      title: "Delete Author",
      author: author,
      author_books: allBooksByAuthor,
    });
    return;
  } else {
    // Author has no books. Delete object and redirect to the list of authors.
    await Author.findByIdAndRemove(req.body.authorid);
    res.redirect("/catalog/authors");
  }
});
//display author update on GET
exports.author_update_get = asyncHandler( async(req, res, next) => {
  res.send('NOT IMPLEMENTED: GET author update')
})

//handle author update on POST
exports.author_update_post = asyncHandler( async(req, res, next) => {
  res.send('NOT IMPLEMENTED: POST form for author update')
})