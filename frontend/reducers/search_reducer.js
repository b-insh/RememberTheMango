import { RECEIVE_QUERY_RESULTS } from '../actions/task_actions';

const initialState = {
  searchResults: {},
};

const searchReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_QUERY_RESULTS:
      return action.searchResults;
    default:
      return state;
  }
};

export default searchReducer;
