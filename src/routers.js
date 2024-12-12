const { getAllBooks, addBooks } = require('./handler');

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
  }

];

module.exports = routes;