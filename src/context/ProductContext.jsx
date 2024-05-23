import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findBrand } from "../apiService/productApi";

export const ProductContext = React.createContext();

export const ProductContextProvider = ({ children }) => {
  const [brandOptions, setBrandOptions] = useState([]);

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

  const productContextValue = { brandOptions, handleLFindBrand };

  return (
    <ProductContext.Provider value={productContextValue}>
      {children}
    </ProductContext.Provider>
  );
};
