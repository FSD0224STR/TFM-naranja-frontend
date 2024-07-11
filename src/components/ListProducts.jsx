import { Card, List, Button, Tooltip } from "antd";
import { useState, useEffect, useContext } from "react";
import "./ListProducts.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  findAllProducts,
  findProductsByCategory,
  deleteProduct,
} from "../apiService/productApi";
import Paginate from "./Pagination";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import BreadCrumb from "./BreadCrumb";
import { AuthContext } from "../context/LogContext";
import ProductCard from "./ProductCard";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();
  const { category } = useParams();

  const { handleLAddProductCart } = useContext(CartContext);

  // Variables para controlar el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleLFindAllProducts = async () => {
    let response;

    if (category) {
      response = await findProductsByCategory(category);
    } else {
      response = await findAllProducts();
    }
    if (response.error) {
      console.error("Error al listar productos:", response.error);
    } else {
      setProducts(response.data);
    }
  };

  const handleLViewProduct = (slug) => {
    navigate(`/detailsProduct/${slug}`);
  };

  useEffect(() => {
    handleLFindAllProducts();
  }, [category]);

  useEffect(() => {
    setTotalProducts(products.length);
  }, [products]);

  return (
    <>
      <BreadCrumb title="listProducts" />

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
              <ProductCard
                item={item}
                handleLViewProduct={handleLViewProduct}
                handleLAddProductCart={handleLAddProductCart}
              />
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
    </>
  );
};

export default ListProducts;
