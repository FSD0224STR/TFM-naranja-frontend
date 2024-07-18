import React from "react";
import { Card, Typography, Row, Col } from "antd";
import "./CardComponent.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      title={category.category}
      style={{
        width: "100%",
        font: "Outfit",
        height: "100%",
        backgroundImage: `url(${category.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography.Title level={2}>{category.category}</Typography.Title>
      <br />
      <br />

      <Button
        onClick={() => navigate(`/listProducts/${category.category}`)}
        color="white"
        type="primary"
        style={{ marginTop: 90 }}
      >
        Ver ahora
      </Button>
    </Card>
  );
};

export default CategoryCard;
