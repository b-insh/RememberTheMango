export const fetchTasks = (success, error) => {
  return $.ajax({
    url: "/api/tasks",
  });
};

export const fetchTask = (task, success, error) => {
  return $.ajax({
    url: `/api/session/${task.id}`,
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
