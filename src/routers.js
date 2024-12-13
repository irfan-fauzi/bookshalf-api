const { getAllBooks, addBooks, detailBook, updateBook } = require('./handler');

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
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  }

];

module.exports = routes;