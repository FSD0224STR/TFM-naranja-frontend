import React, { useState, useRef } from "react";
import { findProducts } from "../apiService/productApi";
import ComparadorInputs from "./ComparadorInputs";
import { Row, Col, message } from "antd";
import Button from "./Button";
import './Comparador.css'; // Asegúrate de importar el archivo CSS

function Comparador() {
  const [productNames, setProductNames] = useState([]);
  const [comparisonNames, setComparisonNames] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [error, setError] = useState(null);
  
  // Crear una referencia para acceder a la función de reseteo
  const comparadorInputsRef = useRef(null);

  const handleCompare = async () => {
    if (productNames.length < 2) {
      setError('Debes proporcionar al menos dos nombres de productos para comparar.');
      return;
    }

    // Verificar si hay productos duplicados
    const uniqueProductNames = new Set(productNames.map(name => name.trim().toLowerCase()));
    if (uniqueProductNames.size !== productNames.length) {
      setError('No puedes comparar el mismo producto consigo mismo.');
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

      setComparisonNames(productNames); // Actualizar los nombres de comparación
      setComparisonResults(validResults);
      setError(null);
      comparadorInputsRef.current.resetInputs(); // Llamar a la función de reseteo
    } catch (error) {
      message.error("Error recuperando productos");
      setError("Error fetching products. Please try again.");
      setComparisonResults([]);
    }
  };

  const getPriceClass = (price) => {
    return price > 7 ? "price-high" : "price-low";
  };

  const getAllergensClass = (allergens) => {
    return allergens.length > 3 ? "allergens-high" : "allergens-low";
  };

  const getIngredientsClass = (ingredients) => {
    return ingredients.length < 5 ? "ingredients-low" : "ingredients-high";
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", padding: "20px", color: "#011c26" }}>
          Comparador de Productos
        </h1>
        <ComparadorInputs ref={comparadorInputsRef} onInputChange={setProductNames} />
        <Button color='primary' type='primary' onClick={handleCompare}>
          Comparar
        </Button>
      </div>
      <div
        style={{ marginTop: "16px", textAlign: "center", marginBottom: "40px" }}
      >
        <Row gutter={16} justify="center">
          {comparisonResults.map((product, index) => (
            <Col span={8} key={index}>
              <Card>
                <h2>{comparisonNames[index]}</h2> {/* Usar comparisonNames en lugar de productNames */}
                <Card
                  key={product._id}
                  title={product.product}
                  bordered={false}
                  style={{ marginBottom: '16px' }}
                >
                  <Descriptions column={1}>
                    <Descriptions.Item label="Precio" className={getPriceClass(product.price)}>
                      {product.price}€
                    </Descriptions.Item>
                    <Descriptions.Item label="Origen">
                      {product.origin}
                    </Descriptions.Item>
                    <Descriptions.Item label="Marca">
                      {product.brand}
                    </Descriptions.Item>
                    <Descriptions.Item label="Alérgenos" className={getAllergensClass(product.allergens)}>
                      {product.allergens.join(', ')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ingredientes" className={getIngredientsClass(product.ingredients)}>
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
