import React, { useState } from "react";
import { addProduct } from "../apiService/productApi";

import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";

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

const allergensData = [
  {
    title: "Gluten",
    value: "gluten",
  },
  {
    title: "Crustaceos",
    value: "crustaceos",
  },
  {
    title: "Huevos",
    value: "huevos",
  },
  {
    title: "Pescado",
    value: "pescado",
  },
  {
    title: "Frutos secos",
    value: "frutos secos",
  },
  {
    title: "Soja",
    value: "soja",
  },
  {
    title: "Lacteos",
    value: "lacteos",
  },
  {
    title: "Frutos con cascara",
    value: "frutos con cascara",
  },
  {
    title: "Apio",
    value: "apio",
  },
  {
    title: "Mostaza",
    value: "mostaza",
  },
  {
    title: "Sésamo",
    value: "sesamo",
  },
  {
    title: "Sulfitos",
    value: "sulfitos",
  },
  {
    title: "Altramuces",
    value: "altramuces",
  },
  {
    title: "Moluscos",
    value: "moluscos",
  },
];

const ingredientsData = [
  {
    title: "Huevos",
    value: "huevos",
  },
  {
    title: "Azúcar",
    value: "azucar",
  },
  {
    title: "Sal",
    value: "sal",
  },
];

const AddProduct = () => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [origin, setOrigin] = useState("");
  const [allergens, setAllergens] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleLAddProduct = async (productData) => {
    const newProduct = {
      ...productData,
    };

    const response = await addProduct(newProduct);

    if (response.error) {
      console.error("Error al añadir producto:", response.error);
    } else {
      console.log("Producto creado con exito:", response.data);
    }
  };

  const onChangeAllergens = (newValue) => {
    setAllergens(newValue);
  };

  const onChangeIngredients = (newValue) => {
    setIngredients(newValue);
  };

  return (
    <Form
      {...formItemLayout}
      variant="filled"
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Name Product"
        name="product"
        rules={[
          {
            required: true,
            message: "Please input!",
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
            message: "Please input!",
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
            message: "Please input!",
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
        label="Brand"
        name="brand"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Origin"
        name="origin"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Select value={origin} onChange={(value) => setOrigin(value)}>
          <Select.Option value="España">España</Select.Option>
          <Select.Option value="Portugal">Portugal</Select.Option>
          <Select.Option value="Alemania">Alemania</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Allergens"
        name="allergens"
        rules={[
          {
            required: true,
            message: "Please input!",
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
          placeholder="Please select"
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
            message: "Please input!",
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
          placeholder="Please select"
          allowClear
          multiple
          treeDefaultExpandAll
          onChange={onChangeIngredients}
          treeData={ingredientsData}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button
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
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
