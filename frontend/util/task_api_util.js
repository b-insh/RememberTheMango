export const fetchTasks = (success, error) => {
  return $.ajax({
    url: "/api/tasks",
  });
};

export const fetchTaskDetail = (taskId, success, error) => {
  return $.ajax({
    url: `/api/tasks/${taskId}`,
  });
};

export const createTask = (task, success, error) => {
  return $.ajax({
    method: "POST",
    url: "/api/tasks",
    data: { task: task }
  });
};

export const updateTask = (task, success, error) => {
  debugger
  return $.ajax({
    method: "PATCH",
    url: `/api/tasks/${task.id}`,
    data: { task: task }
  });
};

export const deleteTask = (task, success, error) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/tasks/${task.id}`
  });
};
