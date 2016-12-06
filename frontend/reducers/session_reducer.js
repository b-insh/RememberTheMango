import { RECEIVE_ERRORS, RECEIVE_CURRENT_USER, CLEAR_ERRORS } from '../actions/session_actions';

const initialState = {
  currentUser: null,
  errors: []
};

const sessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        currentUser: action.currentUser,
        errors: []
      };
    case RECEIVE_ERRORS:
      return {
        currentUser: null,
        errors: action.errors
      };
    case CLEAR_ERRORS:
      return {
        currentUser: state.currentUser,
        errors: []
      };
    default:
      return state;
  }
};

export default sessionReducer;
