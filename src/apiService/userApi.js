/*const URL = "http://localhost:3000";

export const login = async (name, password) => {
  const reponse = await fetch(`${URL}/login`, {
    method: "POST",
    body: JSON.stringify(dataTask),
    headers: { "Content-Type": "application/json" },
  });
  return await reponse.json();
};

export const register = async (...dataRegister) => {
  const reponse = await fetch(`${URL}/register`, {
    method: "POST",
    body: JSON.stringify(dataRegister),
    headers: { "Content-Type": "application/json" },
  });
  return await reponse.json();
};*/

const URL = "http://localhost:3000/users";
export const login = async (email, password) => {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) return { error: response.statusText };
  const token = await response.json();
  return { data: token };
};

export const register = async (name, lastName, email, password) => {
  console.log("front", (name, lastName, email, password));
  const response = await fetch(`${URL}/register`, {
    method: "POST",
    body: JSON.stringify({ name, lastName, email, password }),
    headers: { "Content-Type": "application/json" },
  });
  console.log("front", response);
  if (!response.ok) {
    const error = await response.json();
    return { error: error.message };
  }
  const newlyCreatedUser = await response.json();
  return { data: newlyCreatedUser };
};
