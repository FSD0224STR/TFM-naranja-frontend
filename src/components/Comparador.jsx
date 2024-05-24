import React, { useState } from 'react';
import { findProducts } from "../apiService/productApi";
import ComparadorInputs from './ComparadorInputs';

function Comparador() {
  const [productNames, setProductNames] = useState([]);
  const [comparisonResult, setComparisonResult] = useState([]);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    if (productNames.length === 0 || productNames.every(name => name.trim() === '')) {
      setComparisonResult([]);
      return;
    }

    try {
      const data = await findProducts(productNames);
      setComparisonResult(data.data);
      setError(null);
    } catch (error) {
      setError('Error fetching products. Please try again.');
      setComparisonResult([]);
    }
  };

  return (
    <>
      <h1>Comparador de Productos</h1>
      <ComparadorInputs onInputChange={setProductNames} />
      <button onClick={handleCompare}>Comparar</button>
      <div>
        {!comparisonResult ? (
          <p>{error ? error : "No se encontraron productos para comparar."}</p>
            ) : (
          <div>
            {comparisonResult.map(product => (
              <div key={product._id}>
                <h3>{product.product}</h3>
                <p>Precio: {product.price}</p>
                <p>Descripción: {product.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Comparador;


