import './styles.css';
import booksService from './js/books-service';
import createMarkup from './js/create-markup';
import refs from './js/refs';
import newRow from './templates/new-row.hbs';
import createBook from './js/create-book';
import checkFields from './js/check-fields';

booksService.getBooks().then(createMarkup);

let addBtnIsClicked = false;

refs.addButton.addEventListener('click', () => {
  if (!addBtnIsClicked) {
    addBtnIsClicked = true;
    refs.addBtnLabel.textContent = 'Cохранить';
    const markup = newRow();
    refs.container.insertAdjacentHTML('beforeend', markup);
  } else {
    const newRowRef = document.querySelector('.new-row');
    if (checkFields(newRowRef)) {
      alert('Заполните все поля');
      return;
    }
    refs.addButton.disabled = true;
    refs.addBtnLabel.textContent = 'Добавляем';
    refs.spinner.classList.remove('is-hidden');
    booksService
      .addBook(createBook(newRowRef))
      .then(response => {
        response.ok && booksService.getBooks().then(createMarkup);
        refs.addButton.disabled = false;
        addBtnIsClicked = false;
        refs.addBtnLabel.textContent = 'Добавить';
        refs.spinner.classList.add('is-hidden');
      })
      .catch(err => console.log(err));
  }
});

let editBtnIsClicked = false;
refs.table.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  if (e.target.classList.contains('remove-btn')) {
    const idToDelete = e.target.dataset.id;
    e.target.disabled = true;
    e.target.textContent = 'Удаляем';
    booksService
      .deleteBook(idToDelete)
      .then(response => {
        response.ok && booksService.getBooks().then(createMarkup);
      })
      .catch(error => console.log(error));
  }

  if (e.target.classList.contains('edit-btn')) {
    const index = e.target.dataset.idx;
    const id = e.target.dataset.id;
    const row = document.querySelector(`[data-index="${index}"]`);
    if (!editBtnIsClicked) {
      for (let i = 1; i < 5; i += 1) {
        row.children[i].firstChild.disabled = false;
      }
      e.target.textContent = 'Сохранить';
      editBtnIsClicked = true;
    } else {
      if (checkFields(row)) {
        alert('Заполните все поля');
        return;
      }
      e.target.disabled = true;
      e.target.textContent = 'Сохраняем';
      booksService
        .updateBook(id, createBook(row))
        .then(response => {
          response.ok && booksService.getBooks().then(createMarkup);
          editBtnIsClicked = false;
          e.target.disabled = false;
          e.target.textContent = 'Редактировать';
        })
        .catch(err => console.log(err));
    }
  }
});
