function createBook(refEl) {
  return {
    title: refEl.children[1].firstChild.value,
    author: refEl.children[2].firstChild.value,
    genre: refEl.children[3].firstChild.value,
    rating: refEl.children[4].firstChild.value,
  };
}

export default createBook;
