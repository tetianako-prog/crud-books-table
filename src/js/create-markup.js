import rowTemplate from '../templates/row.hbs';
import refs from './refs';

function createMarkup(data) {
  const newData = data.map((item, index) => {
    return {
      ...item,
      idx: index + 1,
    };
  });
  const markup = rowTemplate(newData);
  refs.container.innerHTML = '';
  refs.container.insertAdjacentHTML('beforeend', markup);
}

export default createMarkup;
