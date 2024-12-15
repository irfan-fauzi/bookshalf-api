const responseData = (h, code, data, message) => {
  const response = h.response({
    status: message,
    data: {
      books: data.map(({ id, name, publisher }) => ({ id, name, publisher }))
    }
  });
  response.code(code);
  return response;
};

const responseAdd = (h, code, data, message) => {
  const response = h.response({
    status: 'success',
    message: message,
    data: {
      bookId: data.id
    }
  });
  response.code(code);
  return response;
};

const responsefail = (h, code, message) => {
  const response = h.response({
    status: 'fail',
    message
  });
  response.code(code);
  return response;
};



module.exports = { responseData, responsefail, responseAdd,  };

