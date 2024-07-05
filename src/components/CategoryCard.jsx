import React from "react";
import { Card, Typography, Row, Col } from "antd";
import "./CardComponent.css";
import Button from "./Button";
import { GiOlive } from "react-icons/gi";
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
      {/* <Typography.Text>{text}</Typography.Text> */}
      <br />
      <br />

      <Button
        onClick={() => navigate(`/listProducts/${category._id}`)}
        color="white"
        type="primary"
        style={{ marginTop: 90 }}
      >
        Ver ahora
        {/* {typeof subtitle === "tring"? (
            <span style={{ marginLeft: 10, color: "#FF69B4" }}>{subtitle}</span>
          ) : (
            subtitle
          )} */}
      </Button>
    </Card>
  );
};

export default CategoryCard;
