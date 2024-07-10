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
import { AuthContext } from "../context/LogContext"

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();
  const { category } = useParams();

  const { handleLAddProductCart } = useContext(CartContext);
  const { isAdmin } = useContext(AuthContext); 

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

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
              <Card
                hoverable
                key={item._id}
                title={item.product}
                cover={
                  item.images && item.images.length > 0 ? (
                    <img alt={item.product} src={item.images[0]} />
                  ) : (
                    <img
                      alt="example"
                      src="http://blog.cjo.pl/wp-content/uploads/2020/03/comidas-t%C3%ADpicas.jpg"
                    />
                  )
                }
              >
                <div style={{ display: "flex" }}>
                  <Button
                    type="link"
                    onClick={() => handleLViewProduct(item.slug)}
                  >
                    View Details
                  </Button>

                  <Tooltip title="Add Product to Cart">
                    <span>
                      <Button
                        type="link"
                        onClick={() => handleLAddProductCart(item)}
                      >
                        <AiFillPlusCircle size={32} color="lightblue" />
                      </Button>
                    </span>
                  </Tooltip>
                  {isAdmin && ( 
                    <Tooltip title="Delete Product">
                      <span>
                        <Button type="link" onClick={() => handleDelete(item._id)}>
                          <AiFillDelete size={32} color="red" />
                        </Button>
                      </span>
                    </Tooltip>
                  )}
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
    </>
  );
};

export default ListProducts;
