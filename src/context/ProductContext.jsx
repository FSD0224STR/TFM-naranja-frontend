import React, { useState } from "react";
import {
  findAllergens,
  findBrand,
  findIngredients,
  findOrigin,
} from "../apiService/productApi";
import { findCategories } from "../apiService/categoryApi";
import { message } from "antd";

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
        message.error(
          "Error al listar categorias del producto",
          response.error
        );
      } else {
        const data = Array.isArray(response.data) ? response.data : [];
        setCategoryOptions(data);
      }
    } catch (error) {
      message.error("Error al ejecutar funcion de obtener categorías");
    }
  };

  const handleLFindBrand = async () => {
    try {
      const response = await findBrand();

      if (response.error) {
        message.error("Error al listar marca del producto");
      } else {
        const data = Array.isArray(response.data) ? response.data : [];
        setBrandOptions(data);
      }
    } catch (error) {
      message.error("Error al ejecuta funcion recuperar marcas");
    }
  };

  const handleLFindOrigin = async () => {
    try {
      const response = await findOrigin();

      if (response.error) {
        message.error("Error al listar origen del producto:", response.error);
      } else {
        const data = Array.isArray(response.data) ? response.data : [];
        setOriginOptions(data);
      }
    } catch (error) {
      message.error("Error al ejecutar funcion recuperar origen de producto");
    }
  };

  const handleLFindAllergens = async () => {
    try {
      const response = await findAllergens();

      if (response.error) {
        message.error("Error al listar alergenos");
        setError(response.error);
      } else {
        setAllergensData(response.data);
      }
    } catch (error) {
      message.error(
        "Error al ejecutar funcion recuperar alergenos del producto"
      );
    }
  };

  const handleLFindIngredients = async () => {
    try {
      const response = await findIngredients();

      if (response.error) {
        message.error("Error al listar ingredientes");
      } else {
        setIngredientsData(response.data);
      }
    } catch (error) {
      message.error("Error al ejecutar recuperar ingredientes del producto");
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
