import React from "react";
import { Card, Descriptions } from "antd";
// import "./ComparadorCard.css";

const ComparadorCard = ({
  product,
  productName,
  getPriceStyle,
  getAllergensStyle,
  getIngredientsStyle,
  highlight,
}) => {
  return (
    <div className='card'>
      <Card
        className={`comparador-card ${highlight ? "highlight" : ""}`}
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          className='product-name'
          style={{ color: "#777", fontWeight: "bold" }}
        >
          {productName}
        </h2>
        <h3 className='product-title' style={{ color: "#023859" }}>
          {product.product}
        </h3>
        <Descriptions column={1} className='descriptions'>
          <Descriptions.Item label='Precio' className='description-item'>
            <span className='value' style={getPriceStyle(product.price)}>
              {product.price}€
            </span>
          </Descriptions.Item>
          <Descriptions.Item label='Categoría' className='description-item'>
            <span className='value'>{product.category}</span>
          </Descriptions.Item>
          <Descriptions.Item label='Origen' className='description-item'>
            <span className='value'>{product.origin}</span>
          </Descriptions.Item>
          <Descriptions.Item label='Marca' className='description-item'>
            <span className='value'>{product.brand}</span>
          </Descriptions.Item>
          <Descriptions.Item label='Alérgenos' className='description-item'>
            <span
              className='value'
              style={getAllergensStyle(product.allergens)}
            >
              {product.allergens.join(", ")}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label='Ingredientes' className='description-item'>
            <span
              className='value'
              style={getIngredientsStyle(product.ingredients)}
            >
              {product.ingredients.join(", ")}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label='Descripción' className='description-item'>
            <span className='value'>{product.description}</span>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ComparadorCard;
