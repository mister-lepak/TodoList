const todos = document.querySelector('#todo');
const addButton = document.querySelector('#addButton');


const renderNewHTML = (item, index) => {
  const stats = statsDownload();

  const grandNewDiv = document.createElement('div');
  grandNewDiv.classList.add('columns');

  const newDiv = document.createElement('input');
  newDiv.value = item;
  newDiv.classList.add('input');
  newDiv.classList.add('column');
  newDiv.classList.add('box');
  newDiv.classList.add('is-four-fifths');
  newDiv.disabled = true;
  grandNewDiv.append(newDiv);

  const checkBox = document.createElement('button');
  checkBox.classList.add('button');
  if (stats[index] === 'complete') {
    newDiv.classList.add('strikethrough');
    checkBox.classList.add('is-active');
    checkBox.innerHTML = '<i class="far fa-check-square"></i>';

  } else {
    checkBox.innerHTML = '<i class="far fa-square"></i>';
    newDiv.classList.remove('strikethrough');
    checkBox.classList.remove('is-active');
  }
  grandNewDiv.append(checkBox);

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
    const stats = statsDownload();
    if (!checkBox.classList.contains('is-active')) {
      newDiv.classList.add('strikethrough');
      checkBox.classList.add('is-active');
      checkBox.innerHTML = '<i class="far fa-check-square"></i>';
      stats[index] = 'complete';
      window.localStorage.setItem('status', JSON.stringify(stats));
    }
    else {
      newDiv.classList.remove('strikethrough');
      checkBox.classList.remove('is-active');
      checkBox.innerHTML = '<i class="far fa-square"></i>';
      stats[index] = 'pending';
      window.localStorage.setItem('status', JSON.stringify(stats));
    }
    window.location.reload();
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
    const stats = statsDownload().filter((val, i) => i !== index);
    window.localStorage.setItem('todos', JSON.stringify(data));
    window.localStorage.setItem('status', JSON.stringify(stats));
    window.location.reload();
  });
};

const localStorageDownload = () => {
  let existing = window.localStorage.getItem('todos');
  existing = existing ? JSON.parse(existing) : [];
  return existing;
};

const statsDownload = () => {
  let existing = window.localStorage.getItem('status');
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
  const stats = statsDownload();
  const index = data.length;

  renderNewHTML(todos.value, index);
  data[index] = todos.value;
  stats[index] = 'pending';
  window.localStorage.setItem('status', JSON.stringify(stats));
  window.localStorage.setItem('todos', JSON.stringify(data));


  todos.value = "";
};


addButton.addEventListener('click', () => {
  addItem(todos);
});