import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  findAllergens,
  findBrand,
  findIngredients,
  findOrigin,
} from "../apiService/productApi";
import { findCategories } from "../apiService/categoryApi";

export const ProductContext = React.createContext();

export const ProductContextProvider = ({ children }) => {
  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [originOptions, setOriginOptions] = useState([]);
  const [allergensData, setAllergensData] = useState("");
  const [ingredientsData, setIngredientsData] = useState("");

  const handleLFindCategories = async () => {
    try {
      const response = await findCategories();

      if (response.error) {
        console.error(
          "Error al listar categorias del producto:",
          response.error
        );
      } else {
        const data = Array.isArray(response.data) ? response.data : [];
        setCategoryOptions(data);
      }
    } catch (error) {
      console.error("Error al ejecutar findCategories:");
    }
  };

  const handleLFindBrand = async () => {
    try {
      const response = await findBrand();

      if (response.error) {
        console.error("Error al listar marca del producto:", response.error);
      } else {
        const data = Array.isArray(response.data) ? response.data : [];
        setBrandOptions(data);
      }
    } catch (error) {
      console.error("Error al ejecutar findBrands:");
    }
  };

  const handleLFindOrigin = async () => {
    try {
      const response = await findOrigin();

      if (response.error) {
        console.error("Error al listar origen del producto:", response.error);
      } else {
        const data = Array.isArray(response.data) ? response.data : [];
        setOriginOptions(data);
      }
    } catch (error) {
      console.error("Error al ejecutar findOrigin:");
    }
  };

  const handleLFindAllergens = async () => {
    try {
      const response = await findAllergens();

      if (response.error) {
        console.error("Error al listar alergenos:", response.error);
        setError(response.error);
      } else {
        setAllergensData(response.data);
      }
    } catch (error) {
      console.error("Error al ejecutar findAllergens:");
    }
  };

  const handleLFindIngredients = async () => {
    try {
      const response = await findIngredients();

      if (response.error) {
        console.error("Error al listar ingredientes:", response.error);
      } else {
        setIngredientsData(response.data);
      }
    } catch (error) {
      console.error("Error al ejecutar findIngredients:");
    }
  };

  const productContextValue = {
    brandOptions,
    handleLFindBrand,
    categoryOptions,
    handleLFindCategories,
    originOptions,
    handleLFindOrigin,
    allergensData,
    handleLFindAllergens,
    ingredientsData,
    handleLFindIngredients,
  };

  return (
    <ProductContext.Provider value={productContextValue}>
      {children}
    </ProductContext.Provider>
  );
};
