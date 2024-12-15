const { nanoid } = require('nanoid');
const books = require('./books');
const { responseData, responsefail, responseAdd } = require('./utils');


// GET ALL BOOKS

const getAllBooks = (request, h) => {
  const { name, reading } = request.query;
  if (reading == 0) {
    const readingBook = books.filter((book) => book.reading == false);
    return responseData(h, 200, readingBook, 'success');
  };
  if (reading == 1) {
    const readingBook = books.filter((book) => book.reading == true);
    return responseData(h, 200, readingBook, 'success');
  }
  if (!name) return responseData(h, 200, books, 'success');
  const patern = new RegExp(`\\b${  name  }\\b`, 'i');
  const filteredBooks = books.filter((book) => patern.test(book.name));
  return responseData(h, 200, filteredBooks, 'success');
};

// ADD NEW BOOK
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

  if (!name) return responsefail(h, 400, 'Gagal menambahkan buku. Mohon isi nama buku');
  if (readPage > pageCount) return responsefail(h, 400, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  books.push(newBook);
  const isSuccessAddBook = books.filter((book) => book.id === newBook.id).length > 0;
  if (isSuccessAddBook) return responseAdd(h, 201, newBook, 'Buku berhasil ditambahkan');
  return responsefail(h, 500, 'Gagal menambahkan buku');

};

// DETAIL BOOK
const detailBook = (request, h) => {
  const bookId = request.params.bookId;
  const book = books.filter((book) => book.id == bookId)[0];
  if (!book) return responsefail(h, 404, 'Buku tidak ditemukan');
  const response = h.response({
    status: 'success',
    data: {
      book
    }
  });
  response.code(200);
  return response;
};

// UPDATE BOOK
const updateBook = (request, h) => {
  const id = request.params.bookId;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const index = books.findIndex((book) => book.id == id);

  if (index === -1) return responsefail(h, 404, 'Gagal memperbarui buku. Id tidak ditemukan');
  if (!name) return responsefail(h, 400, 'Gagal memperbarui buku. Mohon isi nama buku');
  if (readPage > pageCount) return responsefail(h, 400, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');

  books[index].name = name;
  books[index].year = year;
  books[index].author = author;
  books[index].summary = summary;
  books[index].publisher = publisher;
  books[index].pageCount = pageCount;
  books[index].readPage = readPage;
  books[index].reading = reading;

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  });
  response.code(200);
  return response;

};

// DELETE SELECTED BOOK
const deleteBook = (request, h) => {
  const id = request.params.bookId;
  const index = books.findIndex((book) => book.id == id);
  if (index === -1) return responsefail(h, 404, 'Buku gagal dihapus. Id tidak ditemukan');
  books.splice(index, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus'
  });
  response.code(200);
  return response;
};



module.exports = { getAllBooks, addBooks, detailBook, updateBook, deleteBook,  };