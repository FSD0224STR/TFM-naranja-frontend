import React, { useState } from 'react';
import { findProducts } from "../apiService/productApi";
import ComparadorInputs from './ComparadorInputs';
import { Card, Descriptions, Row, Col, Button, message } from 'antd';

function Comparador() {
  const [productNames, setProductNames] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    if (productNames.length === 0 || productNames.every(name => name.trim() === '')) {
      setComparisonResults([]);
      setError('No se han proporcionado nombres de productos.');
      return;
    }

try {
      const results = await Promise.all(
        productNames
          .filter(name => name.trim() !== '')
          .map(name => findProducts(name.trim()))
      );

      const dataResults = results.map(result => result.data);
      setComparisonResults(dataResults);
      setError(null);
      
      dataResults.forEach((result, index) => {
        if (result.length === 0) {
          setError(`No se encontraron productos para "${productNames[index]}"`);
        }
      });

    } catch (error) {
      setError('Error fetching products. Please try again.');
      setComparisonResults([]);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Comparador de Productos</h1>
      <ComparadorInputs onInputChange={setProductNames} />
      <Button type="primary" onClick={handleCompare}>Comparar</Button>
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <Row gutter={16} justify="center">
          {comparisonResults.map((result, index) => (
            <Col span={8} key={index}>
              {result.length > 0 && (
                <Card>
                  <h2>{productNames[index]}</h2>
                  {result.map(product => (
                    <Card
                      key={product._id}
                      title={product.product}
                      bordered={false}
                      style={{ marginBottom: '16px' }}
                    >
                      <Descriptions column={1}>
                        <Descriptions.Item label="Precio">{product.price}</Descriptions.Item>
                        <Descriptions.Item label="Categoría">{product.category}</Descriptions.Item>
                        <Descriptions.Item label="Origen">{product.origin}</Descriptions.Item>
                        <Descriptions.Item label="Marca">{product.brand}</Descriptions.Item>
                        <Descriptions.Item label="Alérgenos">{product.allergens}</Descriptions.Item>
                        <Descriptions.Item label="Ingredientes">{product.ingredients}</Descriptions.Item>
                        <Descriptions.Item label="Descripción">{product.description}</Descriptions.Item>
                      </Descriptions>
                    </Card>
                  ))}
                </Card>
              )}
            </Col>
          ))}
        </Row>
        {error && <p>{error}</p>}
      </div>
    </>
  );
}

export default Comparador;