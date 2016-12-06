import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export function logout() {
  return (dispatch) => {
    return APIUtil.logout().then( () => {
      dispatch(receiveCurrentUser(null));
    }, errors => { dispatch(receiveErrors(errors.responseJSON));
    });
  };
}

export function login(user) {
  return (dispatch) => {
    return APIUtil.login(user).then(
      currentUser => { dispatch(receiveCurrentUser(currentUser));
    }, errors => { dispatch(receiveErrors(errors.responseJSON));
    });
  };
}

export function signup(user) {
  return (dispatch) => {
    return APIUtil.signup(user).then(currentUser => {
      dispatch(receiveCurrentUser(currentUser));
    }, errors => {
      dispatch(receiveErrors(errors.responseJSON));
    });
  };
}
