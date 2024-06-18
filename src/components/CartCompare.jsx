import { Typography, List, Button, Badge, Collapse, Affix } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AiFillCopyrightCircle } from "react-icons/ai";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./CartCompare.css";

const { Title } = Typography;
const { Panel } = Collapse;

const CartCompare = () => {
  const { cartItems, getCartItems, removeCartItem, contextHolder } =
    useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getCartItems();
  }, []);

  const openCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {contextHolder}
      <Affix className="affix-cart">
        {cartItems.length > 0 ? (
          <div className="persistent-cart">
            <div className="cart-header" onClick={openCollapse}>
              <div className="cart-icon">
                <Badge count={cartItems.length}>
                  <AiFillCopyrightCircle size={42} />
                </Badge>
                <Title level={5} className="title-list">
                  Lista de comparación
                </Title>
              </div>
            </div>
            <Collapse activeKey={isOpen ? ["1"] : []} ghost>
              <Panel header="" key="1">
                <div className="cart-list-container">
                  {cartItems.map((item) => (
                    <div className="cart-list-item" key={item._id}>
                      <img
                        src="http://blog.cjo.pl/wp-content/uploads/2020/03/comidas-t%C3%ADpicas.jpg"
                        alt={item.product}
                        className="cart-list-item-avatar"
                      />
                      <span className="cart-list-item-title">
                        {item.product}
                      </span>
                      <Button
                        className="cart-list-item-actions"
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={() => removeCartItem(item._id)}
                        style={{ color: "white" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="compare-button-container">
                  {cartItems.length > 1 ? (
                    <Button type="primary" block className="compare-button">
                      Comparar
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      disabled
                      block
                      className="compare-button"
                    >
                      Comparar
                    </Button>
                  )}
                </div>
              </Panel>
            </Collapse>
          </div>
        ) : (
          <div></div>
        )}
      </Affix>
    </>
  );
};

export default CartCompare;
