export function selectAllTasks(state) {
  return Object.keys(state.tasks).map(id => state.tasks[id]);
}

export function selectAllLists(state) {
  return Object.keys(state.lists).map(id => state.lists[id]);
}
