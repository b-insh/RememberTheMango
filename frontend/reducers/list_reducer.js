import { RECEIVE_LISTS, RECEIVE_LIST, CREATE_LIST, DELETE_LIST, RECEIVE_LIST_ERRORS } from '../actions/list_actions';
import merge from 'lodash/merge';

const initialState = {
  lists: {},
  listErrors: [],
};

const listReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = {};
  switch(action.type) {
    case RECEIVE_LISTS:
      debugger
      return action.lists;
    case RECEIVE_LIST:       //do i need this
      return action.list;
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
        listErrors: actions.errors
      };
    default:
      return state;
  }
};

export default listReducer;
