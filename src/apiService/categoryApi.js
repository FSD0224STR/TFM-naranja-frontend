const URL_BASE = import.meta.env.VITE_BACKEND;
const URL = `${URL_BASE}/categories`;

export const findCategories = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }
  const categories = await response.json();
  return categories;
};
