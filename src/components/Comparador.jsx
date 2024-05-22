import React, { useState } from 'react';
import ComparadorInputs from './ComparadorInputs';

function Comparador() {
  const [productNames, setProductNames] = useState([]);
  const [comparisonResult, setComparisonResult] = useState([]);

  const handleCompare = async () => {
    if (productNames.length === 0) {
      setComparisonResult([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/products?names=${productNames.join(',')}`);
      const data = await response.json();
      setComparisonResult(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setComparisonResult([]);
    }
  };

  return (
    <div>
      <h1>Dynamic Input Fields</h1>
      <ComparadorInputs onInputChange={setProductNames} />
      <button onClick={handleCompare}>Comparar</button>
      <div>
        {comparisonResult.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {comparisonResult.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron productos para comparar.</p>
        )}
      </div>
    </div>
  );
}

export default Comparador;
