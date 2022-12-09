import './style.css';
const submit = document.querySelector('.sub');
const tasksDiv = document.querySelector('.tasks');
let input = document.querySelector('.input');

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

getDataStorage();

//Add tasks
submit.onclick = function () {
  if (input.value !== '') {
    addTask(input.value);
    input.value = '';
  }
};

function addTask(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    description: taskText,
    completed: false,
    index: 0,
  };

  tasks.push(task);
  // Add Tasks To Page
  addToPage(tasks);
  // Add Tasks To Local Storage
  addToStorage(tasks);
  // console.log(tasks);
  // for (let i = 0; i < tasks.length; i++) {
  //   tasks[i].index = i + 1;
  // }
}

function showMenu() {
  console.log();
}

//fonction to add tasks elements to the page
function addToPage(tasks) {
  tasksDiv.innerHTML = '';
  tasks.forEach((i) => {
    let li = document.createElement('li');
    li.className = 'tskList';
    if (i.completed == true) {
      li.className = 'tskList done';
    }
    let inp = document.createElement('input');
    inp.setAttribute('type', 'checkbox');
    li.appendChild(inp);
    let div = document.createElement('div');
    div.className = 'task';
    li.appendChild(div);
    let textAre = document.createElement('textarea');
    textAre.innerHTML = `${i.description}`;
    div.appendChild(textAre);
    let iEdit = document.createElement('i');
    iEdit.className = 'edit fa-solid fa-ellipsis-vertical';

    iEdit.setAttribute('onclick', showMenu(this));
    div.appendChild(iEdit);

    let idelet = document.createElement('i');
    idelet.className = 'delet fa-solid fa-trash';
    div.appendChild(idelet);
    tasksDiv.appendChild(li);

    iEdit.addEventListener('click', (e) => {
      console.log(e.target.parentElement);
    });

    idelet.addEventListener('click', (e) => {
      e.target.parentElement.parentElement.remove();
    });
  });
}

// function to add tasks to local storrage
function addToStorage(tasks) {
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getDataStorage() {
  let data = window.localStorage.getItem('tasks');
  if (data) {
    let Tasks = JSON.parse(data);
    addToPage(Tasks);
  }
}

// const sortTasks = tasks.sort((a, b) => a.index - b.index);

// function listTasks() {
//   sortTasks.forEach((i) => {
//     Tasks.innerHTML += `<li>
//     <input type="checkbox" />
//     <div class="task">
//       <p>${i.description}</p>
//       <i class="fa-solid fa-ellipsis-vertical"></i>
//     </div>
//   </li>`;
//   });
// }

// listTasks();
