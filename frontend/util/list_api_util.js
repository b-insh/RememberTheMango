export const fetchLists = () => {
  debugger
  return $.ajax({
    url: "/api/lists"
  });
};

export const fetchList = (list) => {
  return $.ajax({
    url: `/api/lists/${list.id}`
  });
};

export const createList = (list) => {
  return $.ajax({
    method: "POST",
    url: "/api/lists",
    data: { list: list }
  });
};

export const deleteList = (list) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/lists/${list.id}`
  });
};
