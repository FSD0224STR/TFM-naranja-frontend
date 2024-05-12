import { Card, List, Button } from "antd";
import { useState } from "react";
import { findProducts } from "../apiService/productApi";

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  const handleLFindProducts = async () => {
    const response = await findProducts();

    if (response.error) {
      console.error("Error al listar productos:", response.error);
    } else {
      console.log("Listado de productos correcto");
      setProducts(response.data);
    }
  };

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
        renderItem={(item) => (
          <List.Item>
            <Card key={item._id} title={item.product}>
              <p>{item.description}</p>
              <p>{`Price: ${item.price}`}</p>
              <p>{`Brand: ${item.brand}`}</p>
              <p>{`Origin: ${item.origin}`}</p>
              <p>{`Allergens: ${item.allergens.join(", ")}`}</p>
              <p>{`Ingredients: ${item.ingredients.join(", ")}`}</p>
            </Card>
          </List.Item>
        )}
      />
      <Button
        type="primary"
        htmlType="submit"
        className="list-products"
        onClick={() => handleLFindProducts()}
      >
        List Products
      </Button>
    </div>
  );
};

export default ListProducts;
