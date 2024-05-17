
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

export const updateUser = async (id, userData) => {
  try {
    const response = await fetch (`${URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: { 
        "Content-Type": "aplication/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
       },
    });
    return await response.json();
  } 
  catch (error) {
    return { error : error.message };
  }
}