const selectAllTasks = ( state ) => (
  Object.keys(state.tasks).map(id => state.tasks[id])
);


export default selectAllTasks;
