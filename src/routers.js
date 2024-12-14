const { getAllBooks, addBooks, detailBook, updateBook, deleteBook } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBooks
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: detailBook,
  },
  {
    method: 'GET',
    path: '/books/{name?}',
    handler: (request, h) => {

    }
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  }

];

module.exports = routes;