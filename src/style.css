import './style.css';

const tasks = [
  {
    description: 'task A',
    completed: true,
    index: 1,
  },
  {
    description: 'task B',
    completed: true,
    index: 2,
  },
  {
    description: 'task C',
    completed: false,
    index: 4,
  },
  {
    description: 'task D',
    completed: false,
    index: 3,
  },
];

const Tasks = document.querySelector('.tasks');
const sortTasks = tasks.sort((a, b) => a.index - b.index);

function listTasks() {
  sortTasks.forEach((i) => {
    Tasks.innerHTML += `<li>
    <input type="checkbox" />
    <div class="task">
      <p>${i.description}</p>
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </div>
  </li>`;
  });
}

listTasks();
