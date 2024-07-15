// const URL = "http://localhost:3000/users";
// const URL = `${import.meta.env.BACKEND}/users`;
const URL_BASE = import.meta.env.BACKEND || "http://localhost:3000";
const URL = `${URL_BASE}/users`;

export const login = async (email, password) => {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }

  const data = await response.json();
  return { token: data.token, isAdmin: data.isAdmin };
};

export const register = async (firstname, lastname, email, password) => {
  const response = await fetch(`${URL}/register`, {
    method: "POST",
    body: JSON.stringify({ firstname, lastname, email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }
  const newlyCreatedUser = await response.json();
  return { data: newlyCreatedUser };
};

export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "aplication/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const getUser = async (email) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}/getDataUser`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.data) {
    const error = await response.json();
    return error;
  }
  const user = await response.json();
  return user;
};
