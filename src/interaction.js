import MainFunc from './method.js';

export default class Interact {
    static changeCompletedToDo = (checkstat, id) => {
      const taskList = MainFunc.getListFromStorage();
      taskList[id].completed = checkstat;
      MainFunc.addToStore(taskList);
      MainFunc.genList();
    }

    static checkStatusEvent = () => (
      document.querySelectorAll('.check').forEach((checkbox) => checkbox.addEventListener('change', () => {
        let checkstat;
        let id;
        if (checkbox.id > 0) {
          id = checkbox.id - 1;
        } else {
          id = 0;
        }

        if (checkbox.checked === true) {
          checkstat = true;
        } else if (checkbox.checked !== true) {
          checkstat = false;
        }

        this.changeCompletedToDo(checkstat, id);
      }))
    )

    static clearCompleted = () => {
      let taskList = MainFunc.getListFromStorage();

      taskList = taskList.filter((item) => item.completed !== true);
      MainFunc.indexNew(taskList);
      MainFunc.addToStore(taskList);
      MainFunc.genList();
    }
}