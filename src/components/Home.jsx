import React, { useState, useEffect } from "react";
import Comparador from "./Comparador";
import { findCategories } from "../apiService/categoryApi";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const response = await findCategories();
    if (response.error) {
      console.error("Error al obtener categorías:", response.error);
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
      <Comparador />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          borderRadius: 10,
        }}
      >
        {categories.map((category) => (
          <Link to={`/listProducts/${category._id}`} key={category._id}>
            <CategoryCard category={category} />
          </Link>
          // <Link to={`/listProducts/${category._id}`} key={category._id}>
          //   <CategoryCard category={category} loading={loading} />
          // </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
