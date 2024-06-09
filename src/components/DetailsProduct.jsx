import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tag, Tooltip, Button } from "antd";
import { AiFillEdit } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import { findOneProduct } from "../apiService/productApi";
import ImgCarousel from "./ImgCarousel";
import "./DetailsProduct.css";

const DetailsProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const { handleLAddProductCart } = useContext(CartContext);

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
    <div className="product-details">
      <div className="initial-details">
        <h1 className="product">{product.product}</h1>
        <h4 className="price">{product.price} €</h4>
      </div>

      <div className="carousel-container">
        <ImgCarousel />
      </div>

      <div className="detail-item">
        <label htmlFor="description">Description</label>
        <p className="description">{product.description}</p>
      </div>

      <div className="detail-item">
        <label htmlFor="category">Category</label>
        <p className="category">{product.category}</p>
      </div>

      <div className="detail-item">
        <label htmlFor="brand">Brand</label>
        <p className="brand">{product.brand}</p>
      </div>

      <div className="detail-item">
        <label htmlFor="origin">Origin</label>
        <p className="origin">{product.origin}</p>
      </div>

      <div className="detail-item">
        <label htmlFor="allergens">Allergens</label>
        <div className="allergens">
          {product.allergens.map((allergen, index) => (
            <Tag color="red" key={index}>
              {allergen}
            </Tag>
          ))}
        </div>
      </div>

      <div className="detail-item">
        <label htmlFor="ingredients">Ingredients</label>
        <div className="ingredients">
          {product.ingredients.map((ingredient, index) => (
            <Tag color="blue" key={index}>
              {ingredient}
            </Tag>
          ))}
        </div>
      </div>

      <div>
        <Tooltip title="Edit Product">
          <span>
            <Button
              type="primary"
              onClick={() => navigate(`/editProduct/${id}`)}
            >
              <AiFillEdit className="icon-edit" />
            </Button>
          </span>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Add Product to Cart">
          <span>
            <Button type="link" onClick={() => handleLAddProductCart(product)}>
              <AiFillPlusCircle size={35} color="lightblue" />
            </Button>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default DetailsProduct;
