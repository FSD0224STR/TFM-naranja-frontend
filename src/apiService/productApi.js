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

export const findProducts = async (searchTerm) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}/search?searchTerm=${encodeURIComponent(searchTerm)}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const products = await response.json();
  return products;
};

export const findAllProducts = async () => {
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

export const findOneProduct = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${URL}/${id}`, {
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

export const findOrigin = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}/origin`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }
  const origin = await response.json();
  return origin;
};

export const findAllergens = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}/allergens`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }
  const allergens = await response.json();
  return allergens;
};

export const findIngredients = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}/ingredients`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }
  const ingredients = await response.json();
  return ingredients;
};

export const findBrand = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}/brand`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }
  const brands = await response.json();
  return brands;
};
