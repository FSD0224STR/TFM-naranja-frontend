import React, { useState, useEffect } from "react";
import {
  addProduct,
  findOrigin,
  findAllergens,
  findIngredients,
} from "../apiService/productApi";

import { Button, Form, Input, InputNumber, Select, TreeSelect } from "antd";
import ImgUpload from "./ImgUpload";

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
  const [brand, setBrand] = useState("");
  const [origin, setOrigin] = useState("");
  const [allergens, setAllergens] = useState("");
  const [ingredients, setIngredients] = useState("");

  const [originOptions, setOriginOptions] = useState([]);
  const [allergensData, setAllergensData] = useState("");
  const [ingredientsData, setIngredientsData] = useState("");

  const handleLAddProduct = async (productData) => {
    const newProduct = {
      ...productData,
    };

    const response = await addProduct(newProduct);

    if (response.error) {
      console.error("Error al añadir producto:", response.error);
    } else {
      console.log("Producto creado con exito:", response.data);
      form.resetFields();
    }
  };

  const handleLFindOrigin = async () => {
    try {
      const response = await findOrigin();

      if (response.error) {
        console.error("Error al listar origen del producto:", response.error);
      } else {
        const data = Array.isArray(response.data) ? response.data : [];
        setOriginOptions(data);
      }
    } catch (error) {
      console.error("Error al ejecutar findOrigin:");
    }
  };

  const handleLFindAllergens = async () => {
    try {
      const response = await findAllergens();

      if (response.error) {
        console.error("Error al listar alergenos:", response.error);
        setError(response.error);
      } else {
        setAllergensData(response.data);
      }
    } catch (error) {
      console.error("Error al ejecutar findAllergens:");
    }
  };

  const handleLFindIngredients = async () => {
    try {
      const response = await findIngredients();

      if (response.error) {
        console.error("Error al listar ingredientes:", response.error);
      } else {
        setIngredientsData(response.data);
      }
    } catch (error) {
      console.error("Error al ejecutar findIngredients:");
    }
  };

  const onChangeAllergens = (newValue) => {
    setAllergens(newValue);
  };

  const onChangeIngredients = (newValue) => {
    setIngredients(newValue);
  };

  useEffect(() => {
    handleLFindOrigin();
    handleLFindAllergens();
    handleLFindIngredients();
  }, [form]);

  return (
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
        label="Brand"
        name="brand"
        rules={[
          {
            required: true,
            message: "Introduce brand!",
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
          type="primary"
          htmlType="submit"
          danger
          onClick={() => form.resetFields()}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
