const URL_BASE = import.meta.env.VITE_BACKEND;
const URL = `${URL_BASE}/products`;

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

  const response = await fetch(
    `${URL}/search?searchTerm=${encodeURIComponent(searchTerm)}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Response status:", response.status);

  if (!response.ok) {
    const error = await response.json();
    console.error("Error response:", error);
    throw new Error(error.message);
  }

  const products = await response.json();
  console.log("Products returned:", products);
  return products;
};

export const fetchSuggestions = async (query) => {
  try {
    const token = localStorage.getItem("token");
    const sanitizedQuery = query
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const url = `${URL}/suggestions?query=${encodeURIComponent(sanitizedQuery)}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Error al obtener sugerencias: ${errorDetails}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
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

export const findOneProduct = async (slug) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${URL}/${slug}`, {
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

export const deleteProduct = async (slug) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}/${slug}`, {
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

export const editProduct = async (slug, productData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL}/${slug}`, {
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

export const findProductsByCategory = async (categoryId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${URL}/category/${categoryId}`, {
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

export const getFilterProducts = async ({
  product,
  category,
  minPrice,
  maxPrice,
}) => {
  const token = localStorage.getItem("token");

  const queryParams = new URLSearchParams();
  if (product) queryParams.append("product", product);
  if (category) queryParams.append("category", category);
  if (minPrice) queryParams.append("minPrice", minPrice);
  if (maxPrice) queryParams.append("maxPrice", maxPrice);

  const response = await fetch(`${URL}/filters?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  return data;
};
