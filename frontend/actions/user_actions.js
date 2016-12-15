import * as userAPIUtil from '../util/user_api_util';

export const UPDATE_USER = "UPDATE_USER";

export const updateUser = user => ({
  type: UPDATE_USER,
  user
});

export function editUser(user) {
  return (dispatch) => {
    return userAPIUtil.updateUser(user).then(
      user => { dispatch(updateUser(user));
    });
  };
}
