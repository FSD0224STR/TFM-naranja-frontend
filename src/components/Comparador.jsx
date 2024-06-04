import React, { useState } from "react";
import { findProducts } from "../apiService/productApi";
import ComparadorInputs from "./ComparadorInputs";
import "./Comparador.css";
import Button from "./Button";

function Comparador() {
  const [productNames, setProductNames] = useState([]);
  const [comparisonResult, setComparisonResult] = useState([]);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    if (
      productNames.length === 0 ||
      productNames.every((name) => name.trim() === "")
    ) {
      setComparisonResult([]);
      return;
    }

    try {
      const data = await findProducts(productNames);
      setComparisonResult(data.data);
      setError(null);
    } catch (error) {
      setError("Error fetching products. Please try again.");
      setComparisonResult([]);
    }
  };

  return (
    <>
      <div className='comparador'>
        <h1>Comparador de Productos</h1>
        <ComparadorInputs onInputChange={setProductNames} />
        <Button className='comparadorButton' onClick={handleCompare}>
          Comparar
        </Button>
        <div className='comparadorResult'>
          {!comparisonResult ? (
            <p>
              {error ? error : "No se encontraron productos para comparar."}
            </p>
          ) : (
            <div>
              {comparisonResult.map((product) => (
                <div className='comparadorProduct' key={product._id}>
                  <h3>{product.product}</h3>
                  <p>Precio: {product.price}</p>
                  <p>Descripción: {product.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Comparador;
