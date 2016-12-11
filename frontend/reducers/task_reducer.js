import { RECEIVE_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK, RECEIVE_TASK_ERRORS } from '../actions/task_actions';
import merge from 'lodash/merge';

const initialState = {
  tasks: {},
  taskErrors: [],
};

const taskReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case RECEIVE_TASKS:
      return action.tasks;
    case CREATE_TASK:
      newState = merge({}, state);
      newState[action.task.id] = action.task;
      return newState;
    case UPDATE_TASK:
      debugger
      newState = merge({}, state);
      newState[action.task.id] = action.task;
      return newState;
    case DELETE_TASK:
      newState = merge({}, state);
      delete newState[action.task.id];
      return newState;
    case RECEIVE_TASK_ERRORS:
      return {
        tasks: state.tasks,
        taskErrors: action.errors
      };
    default:
      return state;
  }
};

export default taskReducer;
