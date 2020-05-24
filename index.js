const todos = document.querySelector('#todo');
const addButton = document.querySelector('#addButton');


const renderNewHTML = (item, index) => {
  const grandNewDiv = document.createElement('div');
  grandNewDiv.classList.add('columns');

  const checkBox = document.createElement('button');
  // checkBox.setAttribute('type', 'checkbox');
  checkBox.classList.add('button');
  checkBox.innerHTML = '<i class="far fa-square"></i>';
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

  checkBox.addEventListener('click', () => {
    if (!checkBox.classList.contains('is-active')) {
      newDiv.classList.add('strikethrough');
      checkBox.classList.add('is-active');
      checkBox.innerHTML = '<i class="far fa-check-square"></i>';
    }
    else {
      newDiv.classList.remove('strikethrough');
      checkBox.classList.remove('is-active');
      checkBox.innerHTML = '<i class="far fa-square"></i>';
    }
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
    const data = localStorageDownload();
    data[index] = newDiv.value;
    window.localStorage.setItem('todos', JSON.stringify(data) );
  });

  deleteBtn.addEventListener('click', () => {
    grandNewDiv.remove();
    const data = localStorageDownload().filter((val, i) => i !== index );
    window.localStorage.setItem('todos', JSON.stringify(data));
  });
};

const localStorageDownload = () => {
  let existing = window.localStorage.getItem('todos');
  existing = existing ? JSON.parse(existing) : [];
  return existing;
};

if(window.localStorage.length !== 0) {
  const info = localStorageDownload();
  for(i = 0; i < info.length; i++) {
    renderNewHTML(info[i], i);
  }
}


const addItem = (todos) => {
  const data = localStorageDownload();
  const index = data.length;
  renderNewHTML(todos.value, index);

  data[index] = todos.value;
  window.localStorage.setItem('todos', JSON.stringify(data));

  todos.value = "";
};


addButton.addEventListener('click', () => {
  addItem(todos);
});