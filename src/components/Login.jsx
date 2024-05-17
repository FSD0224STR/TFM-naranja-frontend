import React, { useState } from "react";
import "./Login.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { login } from "../apiService/userApi";
import { useNavigate } from "react-router-dom";
import Captcha from "./Captcha";
import { useAuth } from "../context/LogContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHuman, setIsHuman] = useState(false);
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleLogin = async () => {
    console.log("email: ", email);
    console.log("password: ", password);
    if (!isHuman) {
      console.error("Por favor, complete el CAPTCHA");
      return;
    }
    const response = await login(email, password);
    if (response.error) {
      console.error("Error al iniciar sesión:", response.error);
    } else {
      console.log("Inicio de sesión exitoso:", response.data);
      const token = response.data;
      console.log("token-front: ", token);
      localStorage.setItem("token", token);
      loginContext(token);
      navigate("/home");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCaptchaChange = (value) => {
    setIsHuman(value);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
        <Captcha onChange={handleCaptchaChange} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={handleLogin}
        >
          Log in
        </Button>
        Or{" "}
        <a className="register-form-button" href="">
          register now!
        </a>
      </Form.Item>

      <Form.Item>
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
    </Form>
  );
};

export default Login;
