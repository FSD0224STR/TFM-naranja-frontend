const URL = "http://localhost:3000";

export const login = async (name, password) => {
    const reponse = await fetch(`${URL}/login`, {
      method: "POST",
      body: JSON.stringify(dataTask),
      headers: { "Content-Type": "application/json" },
    });
    return  await reponse.json();
};

export const register = async (...dataRegister) => {
    const reponse = await fetch(`${URL}/register`, {
      method: "POST",
      body: JSON.stringify(dataRegister),
      headers: { "Content-Type": "application/json" },
    });
    return await reponse.json();
};