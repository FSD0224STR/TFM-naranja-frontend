import React, { useState, useEffect, useContext } from "react";
import {
  addProduct,
  findOrigin,
  findAllergens,
  findIngredients,
} from "../apiService/productApi";

import { Form, Input, InputNumber, Select, TreeSelect } from "antd";
import ImgUpload from "./ImgUpload";
import { ProductContext } from "../context/ProductContext";
import Button from "./Button";
import "./AddProduct.css";

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
      console.log("Producto creado con exito:", response.data);
      form.resetFields();
    }
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
    <div className='add-product-form'>
      <h2>Add Product</h2>
      <Form
        form={form}
        {...formItemLayout}
        variant='filled'
        style={{
          maxWidth: 600,
          margin: "3rem",
        }}
      >
        <label>Name Product:</label>
        <Input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          rules={[
            {
              required: true,
              message: "Introduce name!",
            },
          ]}
        />
        <label>Description:</label>
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rules={[
            {
              required: true,
              message: "Introduce description!",
            },
          ]}
        />
        <label>Price:</label>
        <InputNumber
          style={{
            width: "100%",
            borderRadius: 25,
          }}
          value={price}
          onChange={(value) => setPrice(value)}
          rules={[
            {
              required: true,
              message: "Introduce Price!",
            },
          ]}
        />
        <label>Select category:</label>
        <Select
          style={{
            width: "100%",
            borderRadius: 25,
          }}
          value={category}
          onChange={(value) => setCategory(value)}
          placeholder='Please select category'
          rules={[
            {
              required: true,
              message: "Introduce category!",
            },
          ]}
        >
          {categoryOptions.map((categ) => (
            <Select.Option key={categ._id} value={categ.category}>
              {categ.category}
            </Select.Option>
          ))}
        </Select>
        <label>Brand:</label>
        <Select
          value={brand}
          onChange={(value) => setBrand(value)}
          rules={[
            {
              required: true,
              message: "Introduce brand!",
            },
          ]}
        >
          {brandOptions.map((brand) => (
            <Select.Option key={brand._id} value={brand.value}>
              {brand.label}
            </Select.Option>
          ))}
        </Select>
        <label>Origin:</label>
        <Select
          value={origin}
          onChange={(value) => setOrigin(value)}
          rules={[
            {
              required: true,
              message: "Introduce origin!",
            },
          ]}
        >
          {originOptions.map((orig) => (
            <Select.Option key={orig._id} value={orig.value}>
              {orig.label}
            </Select.Option>
          ))}
        </Select>
        <label>Allergies:</label>
        <TreeSelect
          showSearch
          style={{
            width: "100%",
            borderRadius: 25,
          }}
          value={allergens}
          dropdownStyle={{
            maxHeight: 800,
            width: 200,
            overflow: "auto",
          }}
          allowClear
          multiple
          treeDefaultExpandAll
          onChange={onChangeAllergens}
          treeData={allergensData}
          rules={[
            {
              required: true,
              message: "Introduce allergens!",
            },
          ]}
        />
        <label>Ingredients:</label>

        <TreeSelect
          showSearch
          style={{
            width: "100%",
            borderRadius: 25,
          }}
          value={ingredients}
          dropdownStyle={{
            maxHeight: 800,
            width: 200,
            overflow: "auto",
          }}
          allowClear
          multiple
          treeDefaultExpandAll
          onChange={onChangeIngredients}
          treeData={ingredientsData}
          rules={[
            {
              required: true,
              message: "Introduce ingredients!",
            },
          ]}
        />
        <ImgUpload></ImgUpload>
        <div className='centered-buttons'>
          <Button
            color='primary'
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
            {" Create Product"}
          </Button>

          <Button
            color='red'
            type='primary'
            htmlType='submit'
            danger
            onClick={() => form.resetFields()}
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
