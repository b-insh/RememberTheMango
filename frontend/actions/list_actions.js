import * as listAPIUtil from '../util/list_api_util';

export const RECEIVE_LISTS = "RECEIVE_LISTS";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const CREATE_LIST = "CREATE_LIST";
export const DELETE_LIST  = "DELETE_LIST";
export const RECEIVE_LIST_ERRORS = "RECEIVE_LIST_ERRORS";

export const receiveLists = lists => ({
  type: RECEIVE_LISTS,
  lists
});

export const receiveList = list => ({
  type: RECEIVE_LIST,
  list
});

export const createList = list => ({
  type: CREATE_LIST,
  list
});

export const deleteList = list => ({
  type: DELETE_LIST,
  list
});

export const receiveListErrors = errors => ({
  type: RECEIVE_LIST_ERRORS,
  errors
});


export function fetchLists() {
  return (dispatch) => {
    return listAPIUtil.fetchLists().then(
      lists => { dispatch(receiveLists(lists));
    });
  };
}

export function fetchList(listId) {
  return (dispatch) => {
    return listAPIUtil.fetchList(listId).then(
      list => { dispatch(receiveList(list));
    });
  };
}

export function newList(list) {
  return (dispatch) => {
    return listAPIUtil.createList(list).then(
      list => { dispatch(createList(list));
    });
  };
}

export function removeList(list) {
  return (dispatch) => {
    return listAPIUtil.deleteList(list).then(
      list => { dispatch(deleteList(list));
    });
  };
}
