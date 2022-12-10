import Lists from './listClass.js';

export default class MainFunc {
  // get the to do list items from storage
    static getListFromStorage = () => {
      let taskList;

      if (JSON.parse(localStorage.getItem('listData')) === null) {
        taskList = [];
      } else {
        taskList = JSON.parse(localStorage.getItem('listData'));
      }
      return taskList;
    };

    // add to the local storage
    static addToStore = (taskList) => {
      const item = JSON.stringify(taskList);
      localStorage.setItem('listData', item);
    };

    // get index for list
    static indexNew = (taskList) => {
      taskList.forEach((item, i) => {
        item.index = i + 1;
      });
    }

      static deleteListItem = (id) => {
        let taskList = this.getListFromStorage();
        const taskToDelete = taskList[id];

        taskList = taskList.filter((listitem) => listitem !== taskToDelete);

        this.indexNew(taskList);
        this.addToStore(taskList);
      };

      // update the input

      static inputUpdate = (newDescription, id) => {
        const taskList = this.getListFromStorage();
        const targetUpdate = taskList[id];

        taskList.forEach((item) => {
          if (item === targetUpdate) {
            item.description = newDescription;
          }
        });

        this.addToStore(taskList);
        this.genList();
      };

      // remove N ELEMENT
      static listRemoveBtn = () => {
        document.querySelectorAll('.btn-remove').forEach((button) => button.addEventListener('click', (event) => {
          event.preventDefault();
          let id;
          if (button.id > 0) {
            id = button.id - 1;
          } else {
            id = 0;
          }
          this.deleteListItem(id);
          this.genList();
        }));
      };

      // DYNAMIC SECTION
      static taskListHtml = ({ description, index }, checkStat, completedstate) => {
        const ul = document.createElement('ul');
        ul.classList = 'to-do-list';
        ul.innerHTML = `
          <li><input id="${index}" class="check"  type="checkbox" ${checkStat}></li> 
          <li><input class="todo${completedstate}" id="TEST${index}" type="text" size="100" value="${description}" readonly></li>
          <li class="remove-edit">
          <button class="btn-edit" id="${index}"><i class="fa fa-ellipsis-v icon"></i></button>
          <button class="btn-remove" id="${index}"><i class="fa fa-trash-can icon"></i></button>
          </li>
        `;
        return ul;
      }

      // ADD A TODO
      static addTodo = (description) => {
        const taskList = this.getListFromStorage();
        const index = taskList.length + 1;
        const newtask = new Lists(description, false, index);

        taskList.push(newtask);
        this.addToStore(taskList);
        this.genList();
      }

      // GENERATE THE LIST
      static genList = () => {
        const taskList = this.getListFromStorage();
        document.querySelector('.toDoSection').innerHTML = '';
        taskList.forEach((item) => {
          let checkStat;
          let completedstate;
          if (item.completed === true) {
            checkStat = 'checked';
            completedstate = 'completed';
          } else {
            checkStat = '';
            completedstate = '';
          }
          document.querySelector('.toDoSection').appendChild(this.taskListHtml(item, checkStat, completedstate));
        });

        this.listRemoveBtn();
        this.editListItem();
        this.updateBtnEvent();

        const event = new Event('listUpdated');
        document.dispatchEvent(event);
      };

        // update the event
        static updateBtnEvent = () => {
          document.querySelectorAll('.todo').forEach((input) => input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              const idIput = 'TEST';
              const idSelect = event.currentTarget.id;
              let idItem;

              if (!idSelect.includes('TEST')) {
                idItem = idIput.concat(idSelect);
              } else {
                idItem = idSelect;
              }

              document.getElementById(idItem).setAttribute('readonly', 'readonly');
              this.inputUpdate(document.getElementById(idItem).value, (Number(idItem.replace('TEST', '')) - 1));
            }
          }));
        }

      static editListItem = () => {
        let previousList = null;
        document.querySelectorAll('.btn-edit').forEach((button) => button.addEventListener('click', (event) => {
          event.preventDefault();
          const idIput = 'TEST';
          const idSelect = event.currentTarget.id;
          let idItem;

          if (!idSelect.includes('TEST')) {
            idItem = idIput.concat(idSelect);
          } else {
            idItem = idSelect;
          }

          if (previousList !== null) {
            previousList.getElementById(idItem).removeAttribute('readonly');
          }

          const listItem = event.target.closest('li');
          previousList = listItem;
          const ulItem = event.target.closest('ul');

          ulItem.style.background = '#d3d3d3';
          const itemId = document.getElementById(idItem);

          itemId.removeAttribute('readonly');
          itemId.focus();
          itemId.style.background = '#d3d3d3';
          listItem.querySelector('.btn-remove').style.display = 'block';
        }));
      };
}