const books = require('./books.js');

const getAllBooks = () => ({
  status: 'success',
  data: {
    books
  }
});

module.exports = { getAllBooks };