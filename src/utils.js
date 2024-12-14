const responseAllBooks = (h, code, data, message) => {
  const response = h.response({
    status: message,
    data: {
      books: data.map(({ id, name, publisher }) => ({ id, name, publisher }))
    }
  });
  response.code(code);
  return response;
};

module.exports = { responseAllBooks };