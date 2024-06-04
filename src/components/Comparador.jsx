import React, { useState } from "react";
import { findProducts } from "../apiService/productApi"; // Asegúrate de que esta función esté bien definida
import ComparadorInputs from "./ComparadorInputs";

function Comparador() {
  const [productNames, setProductNames] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    if (
      productNames.length === 0 ||
      productNames.every((name) => name.trim() === "")
    ) {
      setComparisonResults([]);
      setError("No se han proporcionado nombres de productos.");
      return;
    }

    try {
      const results = await Promise.all(
        productNames
          .filter((name) => name.trim() !== "")
          .map((name) => findProducts(name.trim()))
      );
      setComparisonResults(results.map((result) => result.data));
      setError(null);
    } catch (error) {
      setError("Error fetching products. Please try again.");
      setComparisonResults([]);
    }
  };

  return (
    <>
      <h1>Comparador de Productos</h1>
      <ComparadorInputs onInputChange={setProductNames} />
      <button onClick={handleCompare}>Comparar</button>
      <div>
        {error ? (
          <p>{error}</p>
        ) : (
          comparisonResults.map((result, index) => (
            <div key={index}>
              {result.length === 0 ? (
                <p>No se encontraron productos para "{productNames[index]}"</p>
              ) : (
                result.map((product) => (
                  <div key={product._id}>
                    <h3>{product.product}</h3>
                    <p>Precio: {product.price}</p>
                    <p>Categoria: {product.category}</p>
                    <p>Origen: {product.origin}</p>
                    <p>Marca: {product.brand}</p>
                    <p>Alérgenos: {product.allergens}</p>
                    <p>Ingredientes: {product.ingredients}</p>
                    <p>Descripción: {product.description}</p>
                  </div>
                ))
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Comparador;
