export function selectAllTasks(state) {
  return Object.keys(state.tasks).map(id => state.tasks[id]);
}

export function selectAllLists(state) {
  if (Object.keys(state.lists.lists).length !== 0) {
    return Object.keys(state.lists.lists).map(id => state.lists.lists[id]);
  } else {
    return [];
  }
}
