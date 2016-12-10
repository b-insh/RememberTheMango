import { RECEIVE_TASK_DETAIL } from '../actions/task_actions';
import merge from 'lodash/merge';

const initialState = {
  taskDetail: {},
};

const taskDetailReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_TASK_DETAIL:
      return merge({}, action.task);
    default:
      return state;
  }
};

export default taskDetailReducer;
