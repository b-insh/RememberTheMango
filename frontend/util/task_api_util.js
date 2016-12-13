export const fetchTasks = () => {
  return $.ajax({
    url: "/api/tasks"
  });
};

export const fetchTaskDetail = (taskId) => {
  return $.ajax({
    url: `/api/tasks/${taskId}`
  });
};

export const createTask = (task) => {
  return $.ajax({
    method: "POST",
    url: "/api/tasks",
    data: { task: task }
  });
};

export const updateTask = (task) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/tasks/${task.id}`,
    data: { task: task }
  });
};

export const deleteTask = (task) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/tasks/${task.id}`
  });
};

export const createTaskForList = (task, listId) => {
  return $.ajax({
    method: "POST",
    url: `api/tasks?filter=${listId}`,
    data: { task: task }
  });
};
