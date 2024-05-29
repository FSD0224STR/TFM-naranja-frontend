import { Drawer, List, Button, Badge, Table, Modal } from "antd";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const CartCompare = () => {
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Remove",
      key: "remove",
      render: (_, record) => (
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => removeItem(record.id)}
        />
      ),
    },
  ];

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartData");
    console.log("storedCartItems Cart: ", storedCartItems);
    console.log("type Cart", typeof storedCartItems);
    if (storedCartItems) {
      try {
        const parsedCartItems = JSON.parse(storedCartItems);
        if (Array.isArray(parsedCartItems)) {
          setCartItems(parsedCartItems);
        } else {
          console.error("cartData is not an array");
        }
      } catch (error) {
        console.error("Error parsing cartData from localStorage", error);
      }
    }
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const removeItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartData", JSON.stringify(updatedCartItems));
  };

  return (
    <div>
      <Badge count={cartItems.length}>
        <Button
          type="primary"
          shape="square"
          icon={<ShoppingCartOutlined />}
          onClick={showDrawer}
        />
      </Badge>
      <Modal
        title="Compare Products"
        onCancel={onClose}
        footer={null}
        open={open}
        width={720}
      >
        <Table dataSource={cartItems} columns={columns} rowKey="id" />
      </Modal>
      {/* <Drawer
        title="Compare Products"
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        width={720}
      >
        <Table dataSource={cartItems} columns={columns} rowKey="id" />
      </Drawer> */}
    </div>
  );
};

export default CartCompare;
