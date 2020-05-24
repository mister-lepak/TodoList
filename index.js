const todos = document.querySelector('#todo');
const addButton = document.querySelector('#addButton');
const tasks = document.querySelector('#tasks');
const tasksChildren = tasks.children;


const renderNewHTML = () => {
  const grandNewDiv = document.createElement('div');
  grandNewDiv.classList.add('columns');

  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.classList.add('level-item');
  grandNewDiv.append(checkBox);

  const newDiv = document.createElement('div');
  newDiv.innerHTML = `${todos.value}`;
  newDiv.classList.add('column');
  newDiv.classList.add('box');
  newDiv.classList.add('is-four-fifths');
  grandNewDiv.append(newDiv);

  const updateBtn = document.createElement('button');
  updateBtn.classList.add('button');
  updateBtn.innerHTML = '<i class="fas fa-edit"></i>';
  grandNewDiv.append(updateBtn);

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

  updateBtn.addEventListener('click', () => {
    saveEditBtn.classList.remove('is-hidden');
    updateBtn.classList.add('is-hidden');
  });

  saveEditBtn.addEventListener('click', () => {
    saveEditBtn.classList.add('is-hidden');
    updateBtn.classList.remove('is-hidden');
  });

  deleteBtn.addEventListener('click', () => {
    grandNewDiv.remove();
  });
};



const addItem = (todos) => {
  renderNewHTML();
  todos.value = "";
};


addButton.addEventListener('click', () => {
  addItem(todos);
});