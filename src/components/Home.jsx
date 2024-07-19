import React, { useState, useEffect } from "react";
import { findCategories } from "../apiService/categoryApi";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";
import { message } from "antd";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const response = await findCategories();
    if (response.error) {
      message.error("Error al obtener categorías");
    } else {
      setCategories(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          borderRadius: 10,
        }}
      >
        {categories.map((category) => (
          <Link to={`/listProducts/${category.category}`} key={category._id}>
            <CategoryCard category={category} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
