import { RECEIVE_TASK_DETAIL } from '../actions/task_actions';
import merge from 'lodash/merge';

const defaultTask = {
  id: "",
  title: "",
  start_date: "",
  due_date: "",
  estimate: "",
  location: "",
  completed: ""
};

const taskDetailReducer = (state = defaultTask, action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case RECEIVE_TASK_DETAIL:
      newState = Object.assign({}, state, action.task);
      return newState;
    default:
      return state;
  }
};

export default taskDetailReducer;
