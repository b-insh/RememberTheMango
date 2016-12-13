export const fetchLists = () => {
  return $.ajax({
    url: "/api/lists"
  });
};

export const fetchList = (listId) => {
  return $.ajax({
    url: `/api/lists/${listId}`
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
