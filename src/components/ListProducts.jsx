import { Card, List, Button } from "antd";
import { useState, useEffect } from "react";
import "./ListProducts.css";
import {
  findProducts,
  editProduct,
  deleteProduct,
} from "../apiService/productApi";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [dummy, refresh] = useState(false);

  const handleLFindProducts = async () => {
    const response = await findProducts();

    if (response.error) {
      console.error("Error al listar productos:", response.error);
    } else {
      console.log("Listado de productos correcto");
      setProducts(response.data);
    }
  };

  const handleLEditProduct = async (id) => {
    const response = await editProduct(id);

    if (response.error) {
      console.error("Error al editar producto:", response.error);
    } else {
      console.log("Edicion correcta");
      refresh(!dummy);
    }
  };

  const handleLDeleteProduct = async (id) => {
    const response = await deleteProduct(id);

    if (response.error) {
      console.error("Error al borrar producto:", response.error);
    } else {
      console.log("Borrado efectudado correctamente");
      refresh(!dummy);
    }
  };

  useEffect(() => {
    handleLFindProducts();
  }, [dummy]);

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
        className="list-products"
        renderItem={(item) => (
          <List.Item>
            <Card key={item._id} title={item.product}>
              <p>{item.description}</p>
              <p>{`Price: ${item.price}`}</p>
              <p>{`Brand: ${item.brand}`}</p>
              <p>{`Origin: ${item.origin}`}</p>
              <p>{`Allergens: ${item.allergens.join(", ")}`}</p>
              <p>{`Ingredients: ${item.ingredients.join(", ")}`}</p>
              <div className="buttons-card">
                <Button
                  type="primary"
                  onClick={() => handleLEditProduct(item._id)}
                >
                  Edit
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleLDeleteProduct(item._id)}
                >
                  Delete
                </Button>
              </div>
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
