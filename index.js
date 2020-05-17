
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
    
    const input = document.createElement('button');
    // input.classList.add('column');
    input.classList.add('delete');
    input.classList.add('level-item');
    grandNewDiv.append(input);
    document.querySelector('#tasks').append(grandNewDiv);

    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {newDiv.classList.add('strikethrough')}
        else {newDiv.classList.remove('strikethrough')}
        console.log(1);
    });
    input.addEventListener('click', () => {
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