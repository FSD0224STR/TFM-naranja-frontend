import { Card, List, Button, Tooltip } from "antd";
import { useState, useEffect, useContext } from "react";
import "./ListProducts.css";
import { useNavigate } from "react-router-dom";
import { findAllProducts } from "../apiService/productApi";
import Paginate from "./Pagination";
import { AiFillPlusCircle } from "react-icons/ai";
import { CartContext } from "../context/CartContext";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();

  const { handleLAddProductCart } = useContext(CartContext);

  // Variables para controlar el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleLFindAllProducts = async () => {
    const response = await findAllProducts();

    if (response.error) {
      console.error("Error al listar productos:", response.error);
    } else {
      setProducts(response.data);
    }
  };

  const handleLViewProduct = (id) => {
    navigate(`/detailsProduct/${id}`);
  };

  useEffect(() => {
    handleLFindAllProducts();
  }, []);

  useEffect(() => {
    setTotalProducts(products.length);
  }, [products]);

  return (
    <div className='list-products'>
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
            {/* <Card
              hoverable
              key={item._id}
              title={item.product}
              cover={
                <img
                  alt="example"
                  src="http://blog.cjo.pl/wp-content/uploads/2020/03/comidas-t%C3%ADpicas.jpg"
                />
              }
            > */}
            <Card
              hoverable
              key={item._id}
              title={item.product}
              cover={
                item.images && item.images.length > 0 ? (
                  <img alt={item.product} src={item.images[0]} />
                ) : (
                  <img
                    alt='example'
                    src='http://blog.cjo.pl/wp-content/uploads/2020/03/comidas-t%C3%ADpicas.jpg'
                  />
                )
              }
            >
              <div style={{ display: "flex" }}>
                <Button
                  type='link'
                  onClick={() => handleLViewProduct(item._id)}
                >
                  View Details
                </Button>

                <Tooltip title='Add Product to Cart'>
                  <span>
                    <Button
                      type='link'
                      onClick={() => handleLAddProductCart(item)}
                    >
                      <AiFillPlusCircle size={32} color='lightblue' />
                    </Button>
                  </span>
                </Tooltip>
              </div>
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
