import React, { useState, useEffect, useContext } from "react";
import { addProduct } from "../apiService/productApi";
import Button from "./Button";
import {
  Form,
  Input,
  InputNumber,
  Select,
  TreeSelect,
  notification,
  message,
  Popconfirm,
} from "antd";
import ImgUpload from "./ImgUpload";
import { ProductContext } from "../context/ProductContext";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const AddProduct = () => {
  const [form] = Form.useForm();
  const [productData, setProductData] = useState({
    product: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    origin: "",
    allergens: [],
    ingredients: [],
    images: [],
  });
  const navigate = useNavigate();

  const onSetImages = (newImages) =>
    setProductData((prev) => ({ ...prev, images: newImages }));

  const {
    brandOptions,
    handleLFindBrand,
    categoryOptions,
    handleLFindCategories,
    originOptions,
    handleLFindOrigin,
    allergensData,
    handleLFindAllergens,
    ingredientsData,
    handleLFindIngredients,
  } = useContext(ProductContext);

  const handleLAddProduct = async () => {
    try {
      const response = await addProduct(productData);

      if (response.error) {
        console.error("Error al añadir producto:", response.error);
      } else {
        openNotificationWithIcon("success");
        form.resetFields();
        // navigate(`/detailsProduct/${productData}`);
      }
    } catch (error) {
      console.error("Error al añadir producto:", error);
    }
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Producto añadido con exito",
    });
  };

  useEffect(() => {
    handleLFindCategories();
    handleLFindBrand();
    handleLFindOrigin();
    handleLFindAllergens();
    handleLFindIngredients();
  }, [form]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (images) => {
    setProductData((prevData) => ({ ...prevData, images }));
  };

  return (
    <div className="add-product-form">
      {contextHolder}

      <Form
        form={form}
        {...formItemLayout}
        variant="filled"
        style={{
          maxWidth: 600,
          margin: "3rem",
        }}
      >
        <h2>Add Product</h2>
        <Form.Item
          label="Name Product"
          name="product"
          rules={[
            {
              required: true,
              message: "Introduce name!",
            },
          ]}
        >
          <Input
            value={productData.product}
            onChange={handleInputChange}
            name="product"
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Introduce description!",
            },
          ]}
        >
          <Input.TextArea
            value={productData.description}
            onChange={handleInputChange}
            name="description"
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Introduce Price!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            value={productData.price}
            onChange={(value) =>
              setProductData((prevData) => ({ ...prevData, price: value }))
            }
          />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Introduce category!",
            },
          ]}
        >
          <Select
            value={productData.category}
            onChange={(value) =>
              setProductData((prevData) => ({ ...prevData, category: value }))
            }
            placeholder="Please select brand"
          >
            {categoryOptions.map((categ) => (
              <Select.Option key={categ._id} value={categ._id}>
                {categ.category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Brand"
          name="brand"
          rules={[
            {
              required: true,
              message: "Introduce brand!",
            },
          ]}
        >
          <Select
            value={productData.brand}
            onChange={(value) =>
              setProductData((prevData) => ({ ...prevData, brand: value }))
            }
            placeholder="Please select brand"
          >
            {brandOptions.map((brand) => (
              <Select.Option key={brand._id} value={brand.value}>
                {brand.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Origin"
          name="origin"
          rules={[
            {
              required: true,
              message: "Introduce origin!",
            },
          ]}
        >
          <Select
            value={productData.origin}
            onChange={(value) =>
              setProductData((prevData) => ({ ...prevData, origin: value }))
            }
            placeholder="Please select origin"
          >
            {originOptions.map((orig) => (
              <Select.Option key={orig._id} value={orig.value}>
                {orig.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Allergens"
          name="allergens"
          rules={[
            {
              required: true,
              message: "Introduce allergens!",
            },
          ]}
        >
          <TreeSelect
            showSearch
            style={{
              width: "100%",
            }}
            value={productData.allergens}
            dropdownStyle={{
              maxHeight: 400,
              overflow: "auto",
            }}
            placeholder="Please select allergens"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={(value) =>
              setProductData((prevData) => ({ ...prevData, allergens: value }))
            }
            treeData={allergensData}
          />
        </Form.Item>
        <Form.Item
          label="Ingredients"
          name="ingredients"
          rules={[
            {
              required: true,
              message: "Introduce ingredients!",
            },
          ]}
        >
          <TreeSelect
            showSearch
            style={{
              width: "100%",
            }}
            value={productData.ingredients}
            dropdownStyle={{
              maxHeight: 400,
              overflow: "auto",
            }}
            placeholder="Please select ingredients"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={(value) =>
              setProductData((prevData) => ({
                ...prevData,
                ingredients: value,
              }))
            }
            treeData={ingredientsData}
          />
        </Form.Item>
        <Form.Item>
          <ImgUpload
            onSetImages={onSetImages}
            value={productData.images}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button color="primary" htmlType="submit" onClick={handleLAddProduct}>
            Create Product
          </Button>

          <Popconfirm
            title="Delete Prodcut"
            description="Are you sure to reset this form?"
            onConfirm={() => {
              form.resetFields();
            }}
            onCancel={() => {
              message.error("Operación de reseteo cancelada");
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button htmlType="submit" color="red">
              Reset
            </Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
