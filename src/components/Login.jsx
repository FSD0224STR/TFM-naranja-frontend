import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import { login } from "../apiService/userApi";
import { useNavigate } from "react-router-dom";

// import Captcha from "./Captcha";
import { useAuth } from "../context/LogContext";
import { SocketContext } from "../context/SocketContext";
import Breadcrumb from "./BreadCrumb";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [isHuman, setIsHuman] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login: loginContext, setIsAdmin, userData, getDataUser } = useAuth();

  const {
    socket,
    joinPrivateRoom,
    adminJoinRandomRoom,
    setMessagesList,
    setIsUserConnect,
  } = useContext(SocketContext);

  const handleLogin = async () => {
    const response = await login(email, password);
    if (response.error) {
      if (response.error === "Unauthorized")
        setError("Usuario o contraseña incorrecta");
      message.error("Usuario o contraseña incorrecta");
    } else {
      const { token } = response;
      localStorage.setItem("token", token);
      loginContext(token);
      setError("");
      setMessagesList([]);

      await getDataUser(email);

      setTimeout(() => {
        if (userData.isAdmin) {
          adminJoinRandomRoom(userData.firstname);
          socket.current.emit("adminConnect", userData.firstname);
        } else {
          joinPrivateRoom();
          setIsUserConnect(true);
        }
        setIsAdmin(userData.isAdmin);
        navigate("/");
      }, 1000);
    }
  };

  // Función para manejar el cambio del estado del CAPTCHA (comentado)
  // const handleCaptchaChange = (value) => {
  //   setIsHuman(value);
  // };

  return (
    <>
      <Breadcrumb title="login" />

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <h1>Login</h1>
        <br />
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
        {error && <div className="error">{error}</div>}
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
        {error && <div className="error">{error}</div>}
        {/* <Form.Item>
        <Captcha onChange={handleCaptchaChange} />
      </Form.Item> */}
        <div className="forget-link">
          <Link to="/forgot-password" className="forget-password">
            Forgot password?
          </Link>
        </div>
        <Button
          color="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={handleLogin}
        >
          Log in
        </Button>{" "}
        <Link className="register" to="/register">
          <Button color="white">register now!</Button>
        </Link>
      </Form>
    </>
  );
};

export default Login;
