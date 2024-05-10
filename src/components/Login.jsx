import React, { useState } from "react";
import "./Login.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "../apiService/userApi";
import { useNavigate } from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};

const handleLogin = async (email, password) => {
  //const navigate = useNavigate();
  console.log("email: ", email);
  console.log("password: ", password);
  const response = await login(email, password);
  if (response.error) {
    console.error("Error al iniciar sesión:", response.error);
  } else {
    console.log("Inicio de sesion exitoso:", response.data);
    const token = response.data;
    console.log("token-front: ", token);
    localStorage.setItem("token", token);
    navigate("/profile");
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          className="input-login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          className="input-login"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={() => handleLogin(email, password)}
        >
          Log in
        </Button>
        Or{" "}
        <a className="register-form-button" href="">
          register now!
        </a>
      </Form.Item>

      <Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked" noStyle>
    <Checkbox>Remember me</Checkbox>
  </Form.Item> */}

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
    </Form>
  );
};
export default Login;
