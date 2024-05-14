const URL = "http://localhost:3000/products";

export const addProduct = async (productData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}`, {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }
  const newProduct = await response.json();
  return newProduct;
};

export const findProducts = async () => {
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
  const products = await response.json();
  return products;
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }
  const data = await response.json();
  return data;
};

export const editProduct = async (id, productData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }

  const data = await response.json();
  return data;
};
