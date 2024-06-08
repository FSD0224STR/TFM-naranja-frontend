import { Drawer, List, Button, Badge, Table, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AiFillCopyrightCircle } from "react-icons/ai";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartCompare = () => {
  const [open, setOpen] = useState(false);

  const { cartItems, getCartItems, removeCartItem } = useContext(CartContext);

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
          onClick={() => removeCartItem(record._id)}
        ></Button>
      ),
    },
  ];

  useEffect(() => {
    getCartItems();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Badge count={cartItems.length}>
        <Button
          type="primary"
          shape="square"
          icon={<AiFillCopyrightCircle />}
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
        <Table dataSource={cartItems} columns={columns} rowKey="_id" />

        {cartItems.length > 1 ? (
          <Button disabled={false}>Compare</Button>
        ) : (
          <Button disabled={true}>Compare</Button>
        )}
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
