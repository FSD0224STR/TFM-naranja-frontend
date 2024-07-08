import React, { useState } from 'react';
import { findProducts } from "../apiService/productApi";
import ComparadorInputs from './ComparadorInputs';
import { Card, Descriptions, Row, Col, Button } from 'antd';

function Comparador() {
  const [productNames, setProductNames] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    if (productNames.length !== 2) {
      setError('Debes proporcionar exactamente dos nombres de productos para comparar.');
      return;
    }

    try {
      const [firstProductResult, secondProductResult] = await Promise.all([
        findProducts(productNames[0].trim()),
        findProducts(productNames[1].trim())
      ]);

      if (firstProductResult.data.length === 0) {
        setError(`No se encontraron productos para "${productNames[0]}"`);
        return;
      }

      if (secondProductResult.data.length === 0) {
        setError(`No se encontraron productos para "${productNames[1]}"`);
        return;
      }

      const firstCategory = firstProductResult.data[0].category;
      const secondCategory = secondProductResult.data[0].category;

      if (firstCategory !== secondCategory) {
        setError(`El segundo producto debe ser de la misma categoría que "${productNames[0]}"`);
        return;
      }

      setComparisonResults([firstProductResult.data[0], secondProductResult.data[0]]);
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
                    <Descriptions.Item label="Categoría">
                      {product.category}
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
        {error && <p>{error}</p>}
      </div>
    </>
  );
}

export default Comparador;
