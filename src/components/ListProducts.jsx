import { Card, List, Button } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findAllProducts } from "../apiService/productApi";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleLFindAllProducts = async () => {
    const response = await findAllProducts();

    if (response.error) {
      console.error("Error al listar productos:", response.error);
    } else {
      console.log("Listado de productos correcto");
      setProducts(response.data);
    }
  };

  const handleLViewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    handleLFindAllProducts();
  }, []);

  return (
    <div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={products}
        style={{
          margin: "2rem",
        }}
        renderItem={(item) => (
          <List.Item>
            <Card key={item._id} title={item.product}>
              <p>{item.description}</p>
              {/* <p>{`Price: ${item.price}`}</p>
              <p>{`Brand: ${item.brand}`}</p>
              <p>{`Origin: ${item.origin}`}</p>
              <p>{`Allergens: ${item.allergens.join(", ")}`}</p>
              <p>{`Ingredients: ${item.ingredients.join(", ")}`}</p> */}

              <Button type="link" onClick={() => handleLViewProduct(item._id)}>
                View Details
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListProducts;
