import React, { useState, useEffect, useContext } from "react";
import { addProduct } from "../apiService/productApi";

import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  TreeSelect,
  notification,
} from "antd";
import ImgUpload from "./ImgUpload";
import { ProductContext } from "../context/ProductContext";

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
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [origin, setOrigin] = useState("");
  const [allergens, setAllergens] = useState("");
  const [ingredients, setIngredients] = useState("");

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

  const handleLAddProduct = async (productData) => {
    const newProduct = {
      ...productData,
    };

    const response = await addProduct(newProduct);

    if (response.error) {
      console.error("Error al añadir producto:", response.error);
    } else {
      openNotificationWithIcon("success");
      form.resetFields();
    }
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Producto añadido con exito",
    });
  };

  const onChangeAllergens = (newValue) => {
    setAllergens(newValue);
  };

  const onChangeIngredients = (newValue) => {
    setIngredients(newValue);
  };

  useEffect(() => {
    handleLFindCategories();
    handleLFindBrand();
    handleLFindOrigin();
    handleLFindAllergens();
    handleLFindIngredients();
  }, [form]);

  return (
    <div>
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
          <Input value={product} onChange={(e) => setProduct(e.target.value)} />
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={price}
            onChange={(value) => setPrice(value)}
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
            value={category}
            onChange={(value) => setCategory(value)}
            placeholder="Please select brand"
          >
            {categoryOptions.map((categ) => (
              <Select.Option key={categ._id} value={categ.category}>
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
            value={brand}
            onChange={(value) => setBrand(value)}
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
            value={origin}
            onChange={(value) => setOrigin(value)}
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
            value={allergens}
            dropdownStyle={{
              maxHeight: 400,
              overflow: "auto",
            }}
            placeholder="Please select allergens"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={onChangeAllergens}
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
            value={ingredients}
            dropdownStyle={{
              maxHeight: 400,
              overflow: "auto",
            }}
            placeholder="Please select ingredients"
            allowClear
            multiple
            treeDefaultExpandAll
            onChange={onChangeIngredients}
            treeData={ingredientsData}
          />
        </Form.Item>

        <Form.Item>
          <ImgUpload></ImgUpload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button
            style={{
              padding: "0.6rem",
              marginRight: "0.5rem",
            }}
            type="primary"
            htmlType="submit"
            onClick={() =>
              handleLAddProduct({
                product,
                description,
                price,
                brand,
                origin,
                allergens,
                ingredients,
              })
            }
          >
            Create Product
          </Button>
          <Button
            style={{
              padding: "0.6rem",
              marginLeft: "0.5rem",
            }}
            type="primary"
            htmlType="submit"
            danger
            onClick={() => form.resetFields()}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
