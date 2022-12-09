import './style.css';

import MainFunc from './modules/method.js';
import Interact from './modules/interaction.js';

const userInput = document.querySelector('.add-item');
const addActivity = document.querySelector('.add-activity');

userInput.addEventListener('submit', (e) => {
  e.preventDefault();
  MainFunc.addTodo(addActivity.value);
  addActivity.value = '';
});

document.querySelector('.clearBtn').addEventListener('click', Interact.clearCompleted);

window.addEventListener('load', () => {
  document.addEventListener('listUpdated', () => {
    Interact.checkStatusEvent();
  }, false);
  Interact.checkStatusEvent();
});

MainFunc.genList();
