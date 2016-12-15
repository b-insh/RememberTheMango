export const updateUser = (formData) => {
  return $.ajax({
    method: "PATCH",
    url: `api/users/${formData.get("user[id]")}`,
    processData: false,
    contentType: false,
    data: formData
  });
};
