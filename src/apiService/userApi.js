const URL = "http://localhost:3000";

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
};

/*const URL = "http://localhost:3000";
export const login = async (username, password) => {
    const response = await fetch(`${URL}/Login`, {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return {error: response.statusText};
    return  await response.json();
};
export const register = async (userData) => {
    const response = await fetch(`${URL}/Register`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
    const error = await response.json()
    return {error: error.message};
    }
    const newlyCreatedUser = await response.json();
    return {data: newlyCreatedUser}
};*/
