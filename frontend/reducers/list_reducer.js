import { RECEIVE_LISTS, RECEIVE_LIST, CREATE_LIST, DELETE_LIST, RECEIVE_LIST_ERRORS } from '../actions/list_actions';
import { DELETE_TASK, CREATE_TASK, UPDATE_TASK } from '../actions/task_actions';
import merge from 'lodash/merge';

const initialState = {
  lists: {},
  selectedList: {},
  listErrors: [],
};

const listReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = {};
  newState = Object.assign({}, state);
  switch(action.type) {
    case RECEIVE_LISTS:
      newState.lists = action.lists;
      return newState;
    case RECEIVE_LIST:
      newState.selectedList = action.list;
      return newState;
    case CREATE_LIST:
      newState = merge({}, state);
      newState[action.list.id] = action.list;
      return newState;
    case DELETE_LIST:
      newState = merge({}, state);
      delete newState[action.list.id];
      return newState;
    case RECEIVE_LIST_ERRORS:
      return {
        lists: state.lists,
        listErrors: action.errors
      };

    case CREATE_TASK:
      newState.selectedList.tasks[action.task.id] = action.task;
      return newState;
    case DELETE_TASK:
      delete newState.selectedList.tasks[action.task.id];
      return newState;
    case UPDATE_TASK:
      newState.selectedList.tasks[action.task.id] = action.task;
      return newState;
    default:
      return state;
  }
};

export default listReducer;
