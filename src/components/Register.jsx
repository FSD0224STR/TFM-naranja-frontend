import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { register } from "../apiService/userApi";
import { useNavigate } from "react-router-dom";
import {
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
import Button from "./Button";
//import Captcha from "./Captcha";
import "./Register.css";
import Breadcrumb from "./BreadCrumb";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [isHuman, setIsHuman] = useState(false);
  const navigate = useNavigate();
  // const [componentDisabled, setComponentDisabled] = useState(true);

  const handleRegister = async (email, password, name, lastName) => {
    const response = await register(email, password, name, lastName);
    // if (!isHuman) {
    //   console.error("Por favor, complete el CAPTCHA");
    //   return;
    // }
    if (response.error) {
      console.error("Error al registrar usuario:", response.error);
    } else {
      const token = response.data;
      localStorage.setItem("token", token);
      navigate("/");
    }
  };

  /*const handleCaptchaChange = (value) => {
    setIsHuman(value);
  };*/

  return (
    <>
      <Breadcrumb title="register" />
      <div className="container">
        <Form
          name="form__container"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          // disabled={componentDisabled}
          // style={{
          //   maxWidth: 600,
          // }}
        >
          <h1>Create a user account</h1>
          <br />
          <Form.Item label="">
            <Input
              value={name}
              placeholder="First Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="">
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="">
            <Input
              placeholder="Email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="">
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          {/* <Form.Item label="">
            <Captcha onChange={handleCaptchaChange} />
          </Form.Item> */}

          <Form.Item label="">
            <Select placeholder="User Type">
              <Select.Option value="">User</Select.Option>
              <Select.Option value="">Producer</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="">
            <Button
              color="primary"
              id="Register_btn"
              onClick={() => handleRegister(name, lastName, email, password)}
            >
              Register now!
            </Button>
          </Form.Item>

          <p>
            Do you already have an account ID?{" "}
            <Link to="/login" className="forget-password">
              Login
            </Link>{" "}
          </p>
          <br />
        </Form>
      </div>
    </>
  );
};

export default Register;
