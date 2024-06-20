import React, { useState, useEffect, useContext } from "react";
import { useNavi
gate, useParams } from "react-router-dom";
import {
  findOneProduct,
  editProduct,
  deleteProduct,
} from "../apiService/productApi";
import Button from "./Button";
// import "./Product.css";
import {
  Form,
  Input,
  InputNumber,
  Select,
  TreeSelect,
  message,
  Popconfirm,
  Upload,
  Modal,
} from "antd";
import { ProductContext } from "../context/ProductContext";
// import { } from "antd";
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

const EditProduct = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { id } = useParams();

  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [origin, setOrigin] = useState("");
  const [allergens, setAllergens] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [detailsProduct, setDetailsProduct] = useState({});

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

  const [dummy, refresh] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGetProduct = async () => {
    try {
      const response = await findOneProduct(id);

      if (response.error) {
        console.error("Error al obtener producto:", response.error);
      } else {
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
    } catch (error) {
      console.error("Error al ejecutar findOneProduct:");
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

    try {
      const response = await editProduct(id, productData);

      if (response.error) {
        console.error("Error al editar producto:", response.error);
      } else {
        refresh(!dummy);
        setIsDisabled(!isDisabled);
      }
    } catch (error) {
      console.error("Error al ejecutar editProduct:");
    }
  };

  const confirm = () => {
    handleLDeleteProduct(id);
    message.success("Producto Borrado con exito");
  };
  const cancel = () => {
    message.error("Operación de eliminación cancelada");
  };

  const handleLDeleteProduct = async (id) => {
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const response = await deleteProduct(id);

      if (response.error) {
        console.error("Error al borrar producto:", response.error);
      } else {
        navigate("/listProducts");
      }
    } catch (error) {
      console.error("Error al ejecutar editProduct:");
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeAllergens = (newValue) => {
    setAllergens(newValue);
  };

  const onChangeIngredients = (newValue) => {
    setIngredients(newValue);
  };

  useEffect(() => {
    handleGetProduct();
    handleLFindCategories();
    handleLFindBrand();
    handleLFindOrigin();
    handleLFindAllergens();
    handleLFindIngredients();
  }, [id, dummy, form]);

  return (
    <>
      <div
        style={{
          maxWidth: 1500,
          margin: "2rem",
          display: "flex",
          // justifyContent: "center",
        }}
      >
        <Form
          form={form}
          {...formItemLayout}
          disabled={isDisabled}
          variant='filled'
          style={{
            maxWidth: 1000,
            width: 800,
            margin: "2rem",
            // justifyContent: "center",
            // justifyItems: "center",
            // textAlign: "center", // add this
          }}
        >
          <Form.Item
            label='Name Product'
            name='product'
            rules={[
              {
                required: true,
                message: "Introduce name!",
              },
            ]}
          >
            <Input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
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
            label='Price'
            name='price'
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
            label='Category'
            name='category'
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
              placeholder='Please select brand'
            >
              {categoryOptions.map((categ) => (
                <Select.Option key={categ._id} value={categ.category}>
                  {categ.category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Brand'
            name='brand'
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
              placeholder='Please select origin'
            >
              {brandOptions.map((brand) => (
                <Select.Option key={brand._id} value={brand.value}>
                  {brand.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Origin'
            name='origin'
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
              placeholder='Please select origin'
            >
              {originOptions.map((orig) => (
                <Select.Option key={orig._id} value={orig.value}>
                  {orig.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Allergies'
            name='allergens'
            rules={[
              {
                required: true,
                message: "Introduce allergies!",
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
              placeholder='Please select allergens'
              allowClear
              multiple
              treeDefaultExpandAll
              onChange={onChangeAllergens}
              treeData={allergensData}
            />
          </Form.Item>

          <Form.Item
            label='Ingredients'
            name='ingredients'
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
              placeholder='Please select ingredients'
              allowClear
              multiple
              treeDefaultExpandAll
              onChange={onChangeIngredients}
              treeData={ingredientsData}
            />
          </Form.Item>
          <Form.Item
          // wrapperCol={{
          //   offset: 2,
          //   span: 10,
          // }}
          >
            {!isDisabled ? (
              <Button
                color='primary'
                onClick={() => handleLEditProduct(id, detailsProduct)}
              >
                Save Changes
              </Button>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "1.5rem",
                }}
              >
                <Button color='primary' onClick={() => onActiveEdit()}>
                  Active Edit
                </Button>
                <Button
                  color='white'
                  danger
                  onClick={() => handleLDeleteProduct(id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </Form.Item>
        </Form>
        <Modal
          title='Confirm Delete'
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <p>Are you sure you want to delete this product?</p>
        </Modal>
      </div>
    </>
  );
};

export default Product;
