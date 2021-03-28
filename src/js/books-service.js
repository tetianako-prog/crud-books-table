function getBooks() {
  return fetch('https://605f8a7104b05d0017ba1757.mockapi.io/books')
    .then(res => res.json())
    .catch(error => console.log(error));
}

function addBook(book) {
  return fetch('https://605f8a7104b05d0017ba1757.mockapi.io/books', {
    method: 'POST',
    body: JSON.stringify(book),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
}

function deleteBook(id) {
  return fetch(`https://605f8a7104b05d0017ba1757.mockapi.io/books/${id}`, {
    method: 'DELETE',
  });
}

function updateBook(id, book) {
  return fetch(`https://605f8a7104b05d0017ba1757.mockapi.io/books/${id}`, {
    method: 'PUT',
    body: JSON.stringify(book),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
}
export default {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
};
