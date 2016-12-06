export const signup = (user, success, error) => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user: user }
  });
};

export const login = (user, success, error) => {
  return $.ajax({
    method: "POST",
    url: "/api/session",
    data: { user: user }
  });
};

export const logout = (success, error) => {
  return $.ajax({
    method: "DELETE",
    url: "/api/session"
  });
};
