const todos = document.querySelector('#todo');
const addButton = document.querySelector('#addButton');


const renderNewHTML = (item) => {
  const grandNewDiv = document.createElement('div');
  grandNewDiv.classList.add('columns');

  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  grandNewDiv.append(checkBox);

  const newDiv = document.createElement('input');
  newDiv.value = item;
  // newDiv.innerHTML = `${todos.value}`;
  newDiv.classList.add('input');
  newDiv.classList.add('column');
  newDiv.classList.add('box');
  newDiv.classList.add('is-four-fifths');
  newDiv.disabled = true;
  grandNewDiv.append(newDiv);

  const editBtn = document.createElement('button');
  editBtn.classList.add('button');
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  grandNewDiv.append(editBtn);

  const saveEditBtn = document.createElement('button');
  saveEditBtn.classList.add('button');
  saveEditBtn.classList.add('is-hidden');
  saveEditBtn.innerHTML = '<i class="fas fa-save"></i>';
  grandNewDiv.append(saveEditBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  grandNewDiv.append(deleteBtn);

  document.querySelector('#tasks').append(grandNewDiv);

  checkBox.addEventListener('change', () => {
    if (checkBox.checked) {newDiv.classList.add('strikethrough')}
    else {newDiv.classList.remove('strikethrough')}
  });

  editBtn.addEventListener('click', () => {
    saveEditBtn.classList.remove('is-hidden');
    editBtn.classList.add('is-hidden');
    newDiv.disabled = false;
  });

  saveEditBtn.addEventListener('click', () => {
    saveEditBtn.classList.add('is-hidden');
    editBtn.classList.remove('is-hidden');
    newDiv.disabled = true;
    // window.localStorage.setItem(index, JSON.stringify(newDiv.value));
  });

  deleteBtn.addEventListener('click', () => {
    grandNewDiv.remove();
    const data = localStorageDownload().filter(val => val !== item);
    window.localStorage.setItem('todos', data.toString());
  });
};

const localStorageDownload = () => {
  let existing = window.localStorage.getItem('todos');
  existing = existing ? existing.split(',') : [];
  return existing;
};

if(window.localStorage.length !== 0) {
  const info = localStorageDownload();
  for(i = 0; i < info.length; i++) {
    renderNewHTML(info[i]);
  }
}


const addItem = (todos) => {
  renderNewHTML(todos.value);

  const data = localStorageDownload();
  data.push(todos.value);
  window.localStorage.setItem('todos', data.toString());

  todos.value = "";
};


addButton.addEventListener('click', () => {
  addItem(todos);
});