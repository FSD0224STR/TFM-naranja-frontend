import React, { useState } from 'react';
import { findProducts } from "../apiService/productApi";
import ComparadorInputs from './ComparadorInputs';
import { Card, Descriptions, Row, Col, Button } from 'antd';

function Comparador() {
  const [productNames, setProductNames] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    if (productNames.length < 2) {
      setError('Debes proporcionar al menos dos nombres de productos para comparar.');
      return;
    }

    // Obtener la primera palabra de cada producto para comparación
    const firstKeyword = productNames[0].trim().split(' ')[0].toLowerCase();
    const allContainKeyword = productNames.every(name => name.trim().split(' ')[0].toLowerCase() === firstKeyword);

    if (!allContainKeyword) {
      setError('Todos los productos deben pertenecer al mismo tipo.');
      return;
    }

    try {
      const results = await Promise.all(productNames.map(name => findProducts(name.trim())));
      const validResults = results.map(result => result.data[0]).filter(Boolean);

      if (validResults.length !== productNames.length) {
        setError('No se encontraron todos los productos.');
        return;
      }

      setComparisonResults(validResults);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products. Please try again.');
      setComparisonResults([]);
    }
  };

  const getPriceStyle = (price) => {
    return { color: price > 7 ? 'red' : 'green' };
  };

  const getAllergensStyle = (allergens) => {
    return { color: allergens.length > 3 ? 'red' : 'green' };
  };

  const getIngredientsStyle = (ingredients) => {
    return { color: ingredients.length < 5 ? 'red' : 'green' };
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Comparador de Productos</h1>
      <ComparadorInputs onInputChange={setProductNames} />
      <Button type="primary" onClick={handleCompare}>Comparar</Button>
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <Row gutter={16} justify="center">
          {comparisonResults.map((product, index) => (
            <Col span={8} key={index}>
              <Card>
                <h2>{productNames[index]}</h2>
                <Card
                  key={product._id}
                  title={product.product}
                  bordered={false}
                  style={{ marginBottom: '16px' }}
                >
                  <Descriptions column={1}>
                    <Descriptions.Item label="Precio" style={getPriceStyle(product.price)}>
                      {product.price}€
                    </Descriptions.Item>
                    <Descriptions.Item label="Origen">
                      {product.origin}
                    </Descriptions.Item>
                    <Descriptions.Item label="Marca">
                      {product.brand}
                    </Descriptions.Item>
                    <Descriptions.Item label="Alérgenos" style={getAllergensStyle(product.allergens)}>
                      {product.allergens.join(', ')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ingredientes" style={getIngredientsStyle(product.ingredients)}>
                      {product.ingredients.join(', ')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Descripción">
                      {product.description}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Card>
            </Col>
          ))}
        </Row>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  );
}

export default Comparador;
