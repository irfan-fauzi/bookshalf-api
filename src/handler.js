const { nanoid } = require('nanoid');
const books = require('./books');

const getAllBooks = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      books: books.map(({ id, name, publisher }) => ({ id, name, publisher }))
    }
  });
  response.code(200);
  return response;
};

const addBooks = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const finished = pageCount === readPage ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = {
    id: nanoid(16),
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };

  if (!name){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }
  books.push(newBook);
  const isSuccessAddBook = books.filter((book) => book.id === newBook.id).length > 0;
  if (isSuccessAddBook){
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id
      }
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Gagal menamambahkan buku'
  });
  response.code(500);
  return response;

};

const detailBook = (request, h) => {
  const bookId = request.params.bookId;
  const book = books.filter((book) => book.id == bookId)[0];
  if (!book){
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
  }
  const response = h.response({
    status: 'success',
    data: {
      book
    }
  });
  response.code(200);
  return response;
};

module.exports = { getAllBooks, addBooks, detailBook };