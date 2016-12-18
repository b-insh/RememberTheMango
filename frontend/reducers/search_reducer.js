import { RECEIVE_QUERY_RESULTS, DELETE_TASK, CREATE_TASK, UPDATE_TASK } from '../actions/task_actions';
import merge from 'lodash/merge';

const initialState = {};

const searchReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case RECEIVE_QUERY_RESULTS:
      return action.searchResults;
    case DELETE_TASK:
      newState = merge({}, state);
      delete newState[action.task.id];
      return newState;
    case UPDATE_TASK:
      newState = merge({}, state);
      newState[action.task.id] = action.task;
      return newState;
    default:
      return state;
  }
};

export default searchReducer;


// case CREATE_TASK:
// newState = merge({}, state);
// newState[action.task.id] = action.task;
// return newState;
