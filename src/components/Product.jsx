import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  findOneProduct,
  editProduct,
  deleteProduct,
  findAllergens,
  findIngredients,
} from "../apiService/productApi";

import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
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

const Product = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [origin, setOrigin] = useState("");
  const [allergens, setAllergens] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [allergensData, setAllergensData] = useState("");
  const [ingredientsData, setIngredientsData] = useState("");
  const [detailsProduct, setDetailsProduct] = useState({});
  const [dummy, refresh] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  const handleLFindAllergens = async () => {
    try {
      const response = await findAllergens();

      if (response.error) {
        console.error("Error al listar alergenos:", response.error);
        setError(response.error);
      } else {
        console.log("Listado de alergenos correcto");
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
        console.log("Listado de ingredientes correcto");
        setIngredientsData(response.data);
      }
    } catch (error) {
      console.error("Error al ejecutar findIngredients:");
    }
  };

  const handleGetProduct = async () => {
    const response = await findOneProduct(id);

    if (response.error) {
      console.error("Error al obtener producto:", response.error);
    } else {
      console.log("Obteniendo detalles producto");
      form.setFieldsValue({
        product: response.data.product,
        description: response.data.description,
        price: response.data.price,
        brand: response.data.brand,
        origin: response.data.origin,
        allergens: response.data.allergens,
        ingredients: response.data.ingredients,
      });
    }
  };

  const onActiveEdit = () => {
    setIsDisabled(!isDisabled);
  };

  const handleLEditProduct = async (productData) => {
    productData = form.getFieldsValue({
      product,
      description,
      price,
      brand,
      origin,
      allergens,
      ingredients,
    });

    const response = await editProduct(id, productData);

    if (response.error) {
      console.error("Error al editar producto:", response.error);
    } else {
      console.log("Edicion correcta");
      refresh(!dummy);
      setIsDisabled(!isDisabled);
    }
  };

  const handleLDeleteProduct = async (id) => {
    const response = await deleteProduct(id);

    if (response.error) {
      console.error("Error al borrar producto:", response.error);
    } else {
      console.log("Borrado efectudado correctamente");
      navigate("/listProducts");
    }
  };

  const onChangeAllergens = (newValue) => {
    setAllergens(newValue);
  };

  const onChangeIngredients = (newValue) => {
    setIngredients(newValue);
  };

  useEffect(() => {
    handleGetProduct();
    handleLFindAllergens();
    handleLFindIngredients();
  }, [id, dummy, form]);

  return (
    <>
      <Form
        form={form}
        {...formItemLayout}
        disabled={isDisabled}
        variant="filled"
        style={{
          maxWidth: 600,
          margin: "2rem",
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
      </Form>
      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        {!isDisabled ? (
          <Button
            type="primary"
            onClick={() => handleLEditProduct(id, detailsProduct)}
          >
            Save Changes
          </Button>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "4rem",
            }}
          >
            <Button type="primary" onClick={() => onActiveEdit()}>
              Active Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleLDeleteProduct(id)}
            >
              Delete
            </Button>
          </div>
        )}
      </Form.Item>
    </>
  );
};
export default Product;
