import './style.css';

import MainFunc from './modules/method.js';

const userInput = document.querySelector('.add-item');
const addActivity = document.querySelector('.add-activity');

userInput.addEventListener('submit', (e) => {
  e.preventDefault();
  MainFunc.addTodo(addActivity.value);
  addActivity.value = '';
});

MainFunc.genList();
