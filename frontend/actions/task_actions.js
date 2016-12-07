import * as taskAPIUtil from '../util/task_api_util';

export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const UPDATE_TASK = "UPDATE_TASK";
export const CREATE_TASK = "CREATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const RECEIVE_TASK_ERRORS = "RECEIVE_TASK_ERRORS";

export const receiveTaskErrors = errors => ({
  type: RECEIVE_TASK_ERRORS,
  errors
});

export const receiveTasks = tasks => ({
  type: RECEIVE_TASKS,
  tasks
});

export const createTask = task => ({
  type: CREATE_TASK,
  task
});

export const updateTask = task => ({
  type: UPDATE_TASK,
  task
});

export const deleteTask = task => ({
  type: DELETE_TASK,
  task
});

export function fetchTasks() {
  return (dispatch) => {
    return taskAPIUtil.fetchTasks().then(
      tasks => { dispatch(receiveTasks(tasks));
    });
  };
}

export function newTask(task) {
  return (dispatch) => {
    return taskAPIUtil.createTask(task).then(
      task => { dispatch(createTask(task));
    });
  };
}

export function editTask(task) {
  return (dispatch) => {
    return taskAPIUtil.updateTask(task).then(
      task => { dispatch(updateTask(task));
    });
  };
}

export function removeTask(task) {
  return (dispatch) => {
    return taskAPIUtil.deleteTask(task).then(
      task => { dispatch(deleteTask(task));
    });
  };
}
