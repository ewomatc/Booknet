//import the express Router() module
const router = require('express').Router()


//require all controller modules
const book_controller = require('../controllers/bookController.js')
const author_controller = require('../controllers/authorController.js')
const genre_controller = require('../controllers/genreController.js')
const book_instance_controller = require('../controllers/bookinstanceController.js')


/// ALL ROUTES RELATING TO BOOK ///

// GET catalog home page, also the app's home page
router.get('/', book_controller.index)

//GET request to create a book
router.get('/book/create', book_controller.book_create_get)

//POST request to create a book
router.post('/book/create', book_controller.book_create_post)

//GET request to display all books
router.get('/books', book_controller.book_list)

//GET request to list one book by id
router.get('/book/:id', book_controller.book_detail)

//GET request for delete form
router.get('/book/:id/delete', book_controller.book_delete_get)

//POST request for delete form
router.post('/book/:id/delete', book_controller.book_delete_post)

// GET request to update Book.
router.get("/book/:id/update", book_controller.book_update_get);

// POST request to update Book.
router.post("/book/:id/update", book_controller.book_update_post);



/// ALL ROUTES RELATING TO AUTHOR ///

//GET request to create a book
router.get('/author/create', author_controller.author_create_get)

//POST form for creating author
router.post('/author/create', author_controller.author_create_post)

//GET request to display all authors
router.get('/authors', author_controller.author_list)

//GET request to display one author by id
router.get('/author/:id', author_controller.author_detail)

//GET req to delete author
router.get('/author/:id/delete', author_controller.author_delete_get)

// POST request to delete Author.
router.post("/author/:id/delete", author_controller.author_delete_post);

// GET request to update Author.
router.get("/author/:id/update", author_controller.author_update_get);

// POST request to update Author.
router.post("/author/:id/update", author_controller.author_update_post);



/// ROUTES FOR GENRE ///

//GET req to create a genre
router.get('/genre/create', genre_controller.genre_create_get)

//POST request to create a genre
router.post('/genre/create', genre_controller.genre_create_post)

//GET req to display all genres
router.get('/genres', genre_controller.genre_list)

//GET request to display one genre by id
router.get('/genre/:id', genre_controller.genre_detail)

//GET request for update form
router.get('/genre/:id/update', genre_controller.genre_update_get)

//POST req for genre update
router.post('/genre/:id/update', genre_controller.genre_update_post)

// GET request to delete Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genre_controller.genre_delete_post);



/// BOOK INSTANCE  ROUTES ///

//GET request to create new bookinstance
router.get('/bookinstance/create',book_instance_controller.bookinstance_create_get);

//POST request for creating new bookinstance
router.post('/bookinstance/create',book_instance_controller.bookinstance_create_post);

//GET req to list all bookinstances
router.get('/bookinstances', book_instance_controller.bookinstance_list)

//GET req to list one book by id
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail)

// GET request to update BookInstance.
router.get("/bookinstance/:id/update", book_instance_controller.bookinstance_update_get);

// POST request to update BookInstance.
router.post("/bookinstance/:id/update", book_instance_controller.bookinstance_update_post);

// GET request to delete BookInstance.
router.get("/bookinstance/:id/delete", book_instance_controller.bookinstance_delete_get);

// POST request to delete BookInstance.
router.post("/bookinstance/:id/delete",book_instance_controller.bookinstance_delete_post);


module.exports = router;