import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Descriptions, Tag } from "antd";

import { findOneProduct } from "../apiService/productApi";

const DetailsProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const handleGetProduct = async () => {
    try {
      const response = await findOneProduct(id);

      if (response.error) {
        console.error("Error al obtener producto:", response.error);
      } else {
        setProduct(response.data);
      }
    } catch (error) {
      console.error("Error al ejecutar findOneProduct:");
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Card title={product.product} style={{ margin: "20px" }}>
      <Descriptions bordered>
        <Descriptions.Item label="Nombre">{product.product}</Descriptions.Item>

        <Descriptions.Item label="Descripción">
          {product.description}
        </Descriptions.Item>

        <Descriptions.Item label="Precio">{product.price}</Descriptions.Item>

        <Descriptions.Item label="Categoría">
          {product.category}
        </Descriptions.Item>

        <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>

        <Descriptions.Item label="Origin">{product.origin}</Descriptions.Item>

        <Descriptions.Item label="Allergens">
          {product.allergens.map((allergen, index) => (
            <Tag color="red" key={index}>
              {allergen}
            </Tag>
          ))}
        </Descriptions.Item>

        <Descriptions.Item label="Ingredients">
          {product.ingredients.map((ingredient, index) => (
            <Tag color="blue" key={index}>
              {ingredient}
            </Tag>
          ))}
        </Descriptions.Item>
      </Descriptions>
      <Button
        type="primary"
        onClick={() => navigate(`/editProduct/${id}`)}
        style={{ marginTop: "20px" }}
      >
        Edit Producto
      </Button>
    </Card>
  );
};

export default DetailsProduct;
