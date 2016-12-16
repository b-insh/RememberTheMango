import {
  RECEIVE_TASKS,
  RECEIVE_TASK_DETAIL,
  RECEIVE_QUERY_RESULTS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK } from '../actions/task_actions';

import {
  RECEIVE_LIST,
  RECEIVE_LISTS,
  CREATE_LIST,
  DELETE_LIST } from '../actions/list_actions';

import {
  UPDATE_USER } from '../actions/user_actions';

  const initialState = {
    loading: false
  };

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_TASKS:
    case RECEIVE_TASK_DETAIL:
    case RECEIVE_QUERY_RESULTS:
    case RECEIVE_LIST:
    case RECEIVE_LISTS:
      return initialState;
    case CREATE_TASK:
    case UPDATE_TASK:
    case DELETE_TASK:
    case CREATE_LIST:
    case DELETE_LIST:
    case UPDATE_USER:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
};

export default loadingReducer;
