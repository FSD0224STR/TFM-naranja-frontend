import { Card, List, Button, Pagination } from "antd";
import { useState, useEffect } from "react";
import "./ListProducts.css";
import { useNavigate } from "react-router-dom";
import { findProducts } from "../apiService/productApi";
import Paginate from "./Pagination";
import { AiFillPlusCircle } from "react-icons/ai";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();

  // Variables para controlar el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleLFindProducts = async () => {
    const response = await findProducts();

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

  const handleLAddProductCart = (dataProduct) => {
    const storedCartItems = localStorage.getItem("cartData");
    if (storedCartItems) {
      let cartItems = JSON.parse(storedCartItems);
      cartItems.push(dataProduct);
      localStorage.setItem("cartData", JSON.stringify(cartItems));
    } else {
      localStorage.setItem("cartData", JSON.stringify(dataProduct));
    }
  };

  useEffect(() => {
    handleLFindProducts();
  }, []);

  useEffect(() => {
    setTotalProducts(products.length);
  }, [products]);

  return (
    <div className="list-products">
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
        dataSource={currentProducts}
        renderItem={(item) => (
          <List.Item>
            <Card key={item._id} title={item.product}>
              <p>{item.description}</p>
              <Button type="link" onClick={() => handleLViewProduct(item._id)}>
                View Details
              </Button>
              <Button type="link" onClick={() => handleLAddProductCart(item)}>
                <AiFillPlusCircle size={25} color="lightblue" />
              </Button>
            </Card>
          </List.Item>
        )}
      />

      <Paginate
        current={currentPage}
        total={totalProducts}
        pageSize={pageSize}
        onChange={(page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        }}
      ></Paginate>
    </div>
  );
};

export default ListProducts;
